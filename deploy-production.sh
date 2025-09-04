#!/bin/bash

#########################################################################
# Spurring Production Deployment Script
# Automated deployment for Next.js app with PostgreSQL and SSL
# Author: Spurring Team
# Version: 2.0
# Compatible with: Ubuntu 20.04/22.04, Debian 11+
#########################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/jabinweb/spurring.git"
APP_DIR="/opt/spurring"
DOMAIN=""
EMAIL=""
DB_PASSWORD=""
NEXTAUTH_SECRET=""

# Helper functions
print_header() {
    echo -e "\n${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Get user inputs
get_configuration() {
    print_header "CONFIGURATION SETUP"
    
    echo -e "${CYAN}Please provide the following information:${NC}\n"
    
    while [[ -z "$DOMAIN" ]]; do
        read -p "Domain name (e.g., example.com): " DOMAIN
        if [[ -z "$DOMAIN" ]]; then
            print_warning "Domain is required!"
        fi
    done
    
    while [[ -z "$EMAIL" ]]; do
        read -p "Email for SSL certificate: " EMAIL
        if [[ -z "$EMAIL" ]]; then
            print_warning "Email is required for SSL!"
        fi
    done
    
    while [[ -z "$DB_PASSWORD" ]]; do
        read -s -p "Database password: " DB_PASSWORD
        echo
        if [[ -z "$DB_PASSWORD" ]]; then
            print_warning "Database password is required!"
        fi
    done
    
    while [[ -z "$NEXTAUTH_SECRET" ]]; do
        read -s -p "NextAuth secret (or press Enter to generate): " NEXTAUTH_SECRET
        echo
        if [[ -z "$NEXTAUTH_SECRET" ]]; then
            NEXTAUTH_SECRET=$(openssl rand -base64 32)
            print_info "Generated NextAuth secret automatically"
        fi
    done
    
    print_success "Configuration collected successfully!"
}

# Update system
update_system() {
    print_header "SYSTEM UPDATE"
    
    print_info "Updating package lists..."
    apt update -q
    
    print_info "Upgrading system packages..."
    apt upgrade -y -q
    
    print_info "Installing essential packages..."
    apt install -y curl wget git ufw htop nano openssl
    
    print_success "System updated successfully!"
}

# Install Docker
install_docker() {
    print_header "DOCKER INSTALLATION"
    
    if command -v docker &> /dev/null; then
        print_info "Docker is already installed"
        docker --version
    else
        print_info "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        rm get-docker.sh
        
        print_info "Adding current user to docker group..."
        usermod -aG docker $USER
        
        print_success "Docker installed successfully!"
    fi
    
    # Install Docker Compose
    if command -v docker-compose &> /dev/null; then
        print_info "Docker Compose is already installed"
        docker-compose --version
    else
        print_info "Installing Docker Compose..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
        ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
        
        print_success "Docker Compose installed successfully!"
    fi
    
    print_info "Starting Docker service..."
    systemctl enable docker
    systemctl start docker
    
    print_success "Docker setup completed!"
}

# Configure firewall
setup_firewall() {
    print_header "FIREWALL CONFIGURATION"
    
    print_info "Configuring UFW firewall..."
    
    # Reset UFW to default
    ufw --force reset
    
    # Set default policies
    ufw default deny incoming
    ufw default allow outgoing
    
    # Allow essential ports
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Enable firewall
    ufw --force enable
    
    print_success "Firewall configured successfully!"
    ufw status
}

# Clone repository
clone_repository() {
    print_header "REPOSITORY SETUP"
    
    print_info "Creating application directory..."
    mkdir -p "$APP_DIR"
    cd "$APP_DIR"
    
    if [[ -d ".git" ]]; then
        print_info "Repository exists, pulling latest changes..."
        git pull origin main
    else
        print_info "Cloning repository..."
        git clone "$REPO_URL" .
    fi
    
    print_success "Repository setup completed!"
}

# Create environment file
create_environment() {
    print_header "ENVIRONMENT CONFIGURATION"
    
    print_info "Creating .env file..."
    
    cat > "$APP_DIR/.env" << EOF
# Database Configuration
DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@spurring-db:5432/spurring
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_DB=spurring
POSTGRES_USER=postgres

# NextAuth Configuration
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=https://${DOMAIN}

# Application Configuration
NODE_ENV=production
PORT=3000
EOF
    
    # Secure the environment file
    chmod 600 "$APP_DIR/.env"
    
    print_success "Environment file created successfully!"
}

# Create Docker Compose configuration
create_docker_compose() {
    print_header "DOCKER COMPOSE SETUP"
    
    print_info "Creating docker-compose.yml..."
    
    cat > "$APP_DIR/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  app:
    build: .
    container_name: spurring-app
    ports:
      - "8081:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
    depends_on:
      - db
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - spurring-network

  db:
    image: postgres:15-alpine
    container_name: spurring-db
    environment:
      - POSTGRES_DB=spurring
      - POSTGRES_USER=postgres
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - spurring-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d spurring"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:

networks:
  spurring-network:
    driver: bridge
EOF
    
    print_success "Docker Compose configuration created!"
}

# Build and deploy application
deploy_application() {
    print_header "APPLICATION DEPLOYMENT"
    
    cd "$APP_DIR"
    
    print_info "Building and starting containers..."
    docker-compose down --remove-orphans 2>/dev/null || true
    docker-compose build --no-cache
    docker-compose up -d
    
    print_info "Waiting for services to be ready..."
    sleep 30
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        print_success "Application deployed successfully!"
        docker-compose ps
    else
        print_error "Deployment failed! Check logs:"
        docker-compose logs
        exit 1
    fi
}

# Install and configure Nginx
install_nginx() {
    print_header "NGINX INSTALLATION"
    
    print_info "Installing Nginx..."
    apt update -q
    apt install -y nginx
    
    print_info "Creating Nginx configuration..."
    
    # Stop any conflicting services temporarily
    systemctl stop nginx 2>/dev/null || true
    
    # Check for port conflicts and resolve them
    if lsof -i :80 | grep -q docker-proxy; then
        print_warning "Port 80 is occupied by Docker. Finding alternative solution..."
        # We'll configure Nginx to work around this
    fi
    
    cat > "/etc/nginx/sites-available/$DOMAIN" << EOF
# HTTP server block - handles redirects and ACME challenges
server {
    listen 8080;  # Use alternative port initially
    server_name $DOMAIN www.$DOMAIN;
    
    # Handle Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # Redirect all other HTTP traffic to HTTPS
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS server block - main application
server {
    listen 8443 ssl http2;  # Use alternative port initially
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration (will be updated by Certbot)
    # ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Proxy configuration
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
        proxy_cache_bypass \$http_upgrade;
        proxy_redirect off;
        proxy_read_timeout 86400;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF
    
    # Create web root for ACME challenges
    mkdir -p /var/www/html
    
    # Enable the site
    ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/"
    rm -f /etc/nginx/sites-enabled/default
    
    # Test configuration
    nginx -t
    
    # Start Nginx
    systemctl enable nginx
    systemctl start nginx
    
    print_success "Nginx installed and configured!"
}

# Install SSL certificate
install_ssl() {
    print_header "SSL CERTIFICATE INSTALLATION"
    
    print_info "Installing Certbot..."
    apt update -q
    apt install -y snapd
    snap install core
    snap refresh core
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
    
    # Install Nginx plugin
    apt install -y python3-certbot-nginx
    
    print_info "Obtaining SSL certificate for $DOMAIN..."
    
    # Try to get certificate using standalone mode first (more reliable)
    systemctl stop nginx
    
    if certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive; then
        print_success "SSL certificate obtained successfully!"
        
        # Update Nginx configuration with SSL
        cat > "/etc/nginx/sites-available/$DOMAIN" << EOF
# HTTP server block - redirects to HTTPS
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Handle Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # Redirect all other HTTP traffic to HTTPS
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS server block - main application
server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Proxy configuration
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
        proxy_cache_bypass \$http_upgrade;
        proxy_redirect off;
        proxy_read_timeout 86400;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF
        
        # Test and restart Nginx
        nginx -t
        systemctl start nginx
        
        # Set up auto-renewal
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
        
        print_success "SSL configuration completed!"
    else
        print_error "Failed to obtain SSL certificate"
        print_warning "You may need to configure DNS first and retry"
        systemctl start nginx
    fi
}

# Create management scripts
create_management_scripts() {
    print_header "MANAGEMENT SCRIPTS CREATION"
    
    print_info "Creating management scripts..."
    
    # Main management script
    cat > "$APP_DIR/manage.sh" << 'EOF'
#!/bin/bash

# Spurring Application Management Script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

APP_DIR="/opt/spurring"

print_usage() {
    echo "Usage: $0 {start|stop|restart|status|logs|update|backup|restore}"
    echo ""
    echo "Commands:"
    echo "  start    - Start all services"
    echo "  stop     - Stop all services"
    echo "  restart  - Restart all services"
    echo "  status   - Show service status"
    echo "  logs     - Show application logs"
    echo "  update   - Update application from repository"
    echo "  backup   - Create database backup"
    echo "  restore  - Restore database from backup"
}

start_services() {
    echo -e "${BLUE}Starting services...${NC}"
    cd "$APP_DIR"
    docker-compose up -d
    echo -e "${GREEN}Services started successfully!${NC}"
}

stop_services() {
    echo -e "${BLUE}Stopping services...${NC}"
    cd "$APP_DIR"
    docker-compose down
    echo -e "${GREEN}Services stopped successfully!${NC}"
}

restart_services() {
    echo -e "${BLUE}Restarting services...${NC}"
    cd "$APP_DIR"
    docker-compose restart
    echo -e "${GREEN}Services restarted successfully!${NC}"
}

show_status() {
    echo -e "${BLUE}Service Status:${NC}"
    cd "$APP_DIR"
    docker-compose ps
    echo ""
    echo -e "${BLUE}System Resources:${NC}"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
}

show_logs() {
    echo -e "${BLUE}Application Logs:${NC}"
    cd "$APP_DIR"
    docker-compose logs -f --tail=50
}

update_application() {
    echo -e "${BLUE}Updating application...${NC}"
    cd "$APP_DIR"
    
    # Backup database before update
    backup_database
    
    # Pull latest code
    git pull origin main
    
    # Rebuild and restart
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    
    echo -e "${GREEN}Application updated successfully!${NC}"
}

backup_database() {
    echo -e "${BLUE}Creating database backup...${NC}"
    cd "$APP_DIR"
    
    BACKUP_DIR="$APP_DIR/backups"
    mkdir -p "$BACKUP_DIR"
    
    BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"
    
    docker-compose exec -T db pg_dump -U postgres spurring > "$BACKUP_FILE"
    
    echo -e "${GREEN}Database backup created: $BACKUP_FILE${NC}"
    
    # Keep only last 10 backups
    ls -t "$BACKUP_DIR"/*.sql | tail -n +11 | xargs -r rm
}

restore_database() {
    if [[ -z "$2" ]]; then
        echo -e "${RED}Please specify backup file to restore${NC}"
        echo "Usage: $0 restore <backup_file>"
        ls -la "$APP_DIR/backups/"
        exit 1
    fi
    
    BACKUP_FILE="$2"
    
    if [[ ! -f "$BACKUP_FILE" ]]; then
        echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Warning: This will replace the current database!${NC}"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Restoring database from $BACKUP_FILE...${NC}"
        cd "$APP_DIR"
        
        docker-compose exec -T db psql -U postgres -d spurring < "$BACKUP_FILE"
        
        echo -e "${GREEN}Database restored successfully!${NC}"
    else
        echo -e "${YELLOW}Restore cancelled${NC}"
    fi
}

case "$1" in
    start)
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        restart_services
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    update)
        update_application
        ;;
    backup)
        backup_database
        ;;
    restore)
        restore_database "$@"
        ;;
    *)
        print_usage
        exit 1
        ;;
esac
EOF
    
    chmod +x "$APP_DIR/manage.sh"
    ln -sf "$APP_DIR/manage.sh" /usr/local/bin/spurring
    
    print_success "Management scripts created!"
    print_info "You can now use 'spurring' command to manage your application"
}

# Final verification
verify_deployment() {
    print_header "DEPLOYMENT VERIFICATION"
    
    print_info "Checking services..."
    
    cd "$APP_DIR"
    
    # Check containers
    if docker-compose ps | grep -q "Up"; then
        print_success "Docker containers are running"
    else
        print_error "Some containers are not running"
        docker-compose ps
    fi
    
    # Check application response
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 | grep -q "200"; then
        print_success "Application is responding"
    else
        print_warning "Application may not be fully ready yet"
    fi
    
    # Check Nginx
    if systemctl is-active --quiet nginx; then
        print_success "Nginx is running"
    else
        print_warning "Nginx is not running"
    fi
    
    # Check SSL certificate
    if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
        print_success "SSL certificate is installed"
    else
        print_warning "SSL certificate not found"
    fi
    
    print_info "Deployment verification completed!"
}

# Display final information
show_final_info() {
    print_header "DEPLOYMENT COMPLETED"
    
    echo -e "${GREEN}🎉 Spurring application has been deployed successfully!${NC}\n"
    
    echo -e "${CYAN}Access Information:${NC}"
    echo -e "  🌐 Website: https://$DOMAIN"
    echo -e "  🌐 Alternative: https://www.$DOMAIN"
    echo -e "  📧 SSL Email: $EMAIL"
    echo ""
    
    echo -e "${CYAN}Server Information:${NC}"
    echo -e "  📁 Application Directory: $APP_DIR"
    echo -e "  🐳 Docker Containers: spurring-app, spurring-db"
    echo -e "  🔒 SSL Certificate: Auto-renewal enabled"
    echo ""
    
    echo -e "${CYAN}Management Commands:${NC}"
    echo -e "  spurring status   - Check service status"
    echo -e "  spurring logs     - View application logs"
    echo -e "  spurring restart  - Restart services"
    echo -e "  spurring update   - Update application"
    echo -e "  spurring backup   - Backup database"
    echo ""
    
    echo -e "${CYAN}Important Files:${NC}"
    echo -e "  📄 Environment: $APP_DIR/.env"
    echo -e "  🐳 Docker Compose: $APP_DIR/docker-compose.yml"
    echo -e "  🔧 Management Script: $APP_DIR/manage.sh"
    echo ""
    
    echo -e "${YELLOW}Next Steps:${NC}"
    echo -e "  1. Verify your website is accessible at https://$DOMAIN"
    echo -e "  2. Configure your domain's DNS A records to point to this server"
    echo -e "  3. Test all application features"
    echo -e "  4. Set up monitoring and backups as needed"
    echo ""
    
    print_success "Deployment completed successfully! 🚀"
}

# Main execution
main() {
    print_header "SPURRING PRODUCTION DEPLOYMENT"
    echo -e "${CYAN}Welcome to the Spurring automated deployment script!${NC}"
    echo -e "${CYAN}This script will deploy your Next.js application with PostgreSQL and SSL.${NC}\n"
    
    check_root
    get_configuration
    update_system
    install_docker
    setup_firewall
    clone_repository
    create_environment
    create_docker_compose
    deploy_application
    install_nginx
    install_ssl
    create_management_scripts
    verify_deployment
    show_final_info
}

# Error handling
trap 'print_error "Script failed at line $LINENO. Check the error above."' ERR

# Run main function
main "$@"

#!/bin/bash

# Spurring VPS Deployment Script
# Run this script on your VPS after cloning the repository

set -e  # Exit on any error

echo "🚀 Starting Spurring deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_warning "This script is running as root. Consider creating a non-root user for better security."
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the spurring project directory."
    exit 1
fi

# Step 1: Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Step 2: Install Docker if not present
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    print_status "Docker is already installed"
fi

# Step 3: Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_status "Docker Compose is already installed"
fi

# Step 4: Create production environment file if it doesn't exist
if [ ! -f ".env.prod" ]; then
    print_status "Creating production environment file..."
    cp .env.prod.example .env.prod
    
    print_warning "⚠️  IMPORTANT: Please edit .env.prod with your production values:"
    print_warning "   - DATABASE_URL: Your production database connection string"
    print_warning "   - NEXTAUTH_URL: Your domain or VPS IP"
    print_warning "   - NEXTAUTH_SECRET: A secure random string"
    print_warning "   - ADMIN_SECRET: A secure admin password"
    
    echo ""
    read -p "Do you want to edit .env.prod now? (y/n): " edit_env
    if [[ $edit_env =~ ^[Yy]$ ]]; then
        nano .env.prod
    fi
else
    print_status "Production environment file already exists"
fi

# Step 5: Build and start the application
print_status "Building Docker images..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod build

print_status "Starting application containers..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Step 6: Wait for containers to be ready
print_status "Waiting for containers to start..."
sleep 10

# Step 7: Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db push

# Step 8: Install and configure Nginx
if ! command -v nginx &> /dev/null; then
    print_status "Installing Nginx..."
    sudo apt install nginx -y
    
    # Create basic Nginx configuration
    read -p "Enter your domain name (or press Enter to use IP): " domain_name
    if [ -z "$domain_name" ]; then
        domain_name=$(curl -s ifconfig.me)
        print_warning "Using IP address: $domain_name"
    fi
    
    print_status "Creating Nginx configuration for $domain_name..."
    sudo tee /etc/nginx/sites-available/spurring > /dev/null <<EOF
server {
    listen 80;
    server_name $domain_name;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/spurring /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test and restart Nginx
    sudo nginx -t && sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    print_status "Nginx configured successfully"
else
    print_status "Nginx is already installed"
fi

# Step 9: Configure firewall
if command -v ufw &> /dev/null; then
    print_status "Configuring firewall..."
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw --force enable
fi

# Step 10: Create update script
print_status "Creating update script..."
tee update.sh > /dev/null <<'EOF'
#!/bin/bash
echo "Updating Spurring application..."

# Pull latest changes
git pull origin main

# Rebuild and restart containers
docker-compose -f docker-compose.prod.yml --env-file .env.prod down
docker-compose -f docker-compose.prod.yml --env-file .env.prod build --no-cache
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db push

echo "Update completed successfully!"
EOF

chmod +x update.sh

# Step 11: Create backup script
print_status "Creating backup script..."
sudo mkdir -p /opt/backups

tee backup.sh > /dev/null <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Only backup if using local PostgreSQL
if docker-compose -f docker-compose.prod.yml ps | grep -q "db"; then
    echo "Creating database backup..."
    docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U postgres spurring > $BACKUP_DIR/spurring_backup_$DATE.sql
    
    # Keep only last 7 days of backups
    find $BACKUP_DIR -name "spurring_backup_*.sql" -mtime +7 -delete
    
    echo "Backup completed: spurring_backup_$DATE.sql"
else
    echo "Using external database - no local backup needed"
fi
EOF

chmod +x backup.sh

# Step 12: Final checks
print_status "Running final checks..."

# Check if containers are running
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    print_status "✅ Containers are running successfully"
else
    print_error "❌ Some containers are not running. Check logs with: docker-compose -f docker-compose.prod.yml logs"
fi

# Check if application is accessible
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Application is accessible on port 3000"
else
    print_warning "⚠️  Application might not be fully ready yet. Check logs: docker-compose -f docker-compose.prod.yml logs app"
fi

# Display final information
echo ""
echo "🎉 Deployment completed!"
echo ""
echo "📝 Next steps:"
echo "1. Your application should be accessible at:"
if [ ! -z "$domain_name" ]; then
    echo "   - http://$domain_name"
fi
echo "   - http://$(curl -s ifconfig.me)"
echo ""
echo "2. Admin panel: http://your-domain/admin"
echo ""
echo "3. To set up SSL certificate (recommended):"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d your-domain.com"
echo ""
echo "4. Useful commands:"
echo "   - View logs: docker-compose -f docker-compose.prod.yml logs -f app"
echo "   - Update app: ./update.sh"
echo "   - Backup data: ./backup.sh"
echo "   - Restart app: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "🔧 Configuration files:"
echo "   - Edit environment: nano .env.prod"
echo "   - Nginx config: /etc/nginx/sites-available/spurring"
echo ""
print_status "Happy deploying! 🚀"

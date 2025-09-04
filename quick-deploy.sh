#!/bin/bash

#########################################################################
# Spurring Quick Deployment Script
# Simple one-command deployment for VPS
# Usage: ./quick-deploy.sh your-domain.com your-email@example.com
#########################################################################

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check arguments
if [[ $# -lt 2 ]]; then
    echo -e "${RED}Usage: $0 <domain> <email>${NC}"
    echo -e "${YELLOW}Example: $0 spurringventures.com admin@spurringventures.com${NC}"
    exit 1
fi

DOMAIN="$1"
EMAIL="$2"
APP_DIR="/opt/spurring"
DB_PASSWORD=$(openssl rand -base64 16)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo -e "${BLUE}🚀 Starting Spurring deployment for $DOMAIN${NC}\n"

# Update system and install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
apt update -q && apt upgrade -y -q
apt install -y curl wget git ufw htop nano openssl snapd

# Install Docker
echo -e "${BLUE}🐳 Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $USER
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

systemctl enable docker && systemctl start docker

# Configure firewall
echo -e "${BLUE}🔥 Configuring firewall...${NC}"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Clone repository
echo -e "${BLUE}📁 Setting up application...${NC}"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [[ -d ".git" ]]; then
    git pull origin main
else
    git clone https://github.com/jabinweb/spurring.git .
fi

# Create environment
cat > .env << EOF
DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@spurring-db:5432/spurring
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_DB=spurring
POSTGRES_USER=postgres
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXTAUTH_URL=https://${DOMAIN}
NODE_ENV=production
PORT=3000
EOF

chmod 600 .env

# Create Docker Compose
cat > docker-compose.yml << 'EOF'
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
    networks:
      - spurring-network

  db:
    image: postgres:15-alpine
    container_name: spurring-db
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - spurring-network

volumes:
  postgres_data:

networks:
  spurring-network:
    driver: bridge
EOF

# Deploy application
echo -e "${BLUE}🚀 Deploying application...${NC}"
docker-compose down --remove-orphans 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

# Install and configure Nginx
echo -e "${BLUE}🌐 Setting up web server...${NC}"
apt install -y nginx python3-certbot-nginx

# Stop conflicting services
systemctl stop nginx 2>/dev/null || true

# Handle port conflicts (stop Coolify if present)
if lsof -i :80 | grep -q docker-proxy; then
    echo -e "${YELLOW}⚠️  Stopping conflicting services on port 80...${NC}"
    docker stop coolify-proxy 2>/dev/null || true
fi

# Create Nginx config
cat > "/etc/nginx/sites-available/$DOMAIN" << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://\$server_name\$request_uri; }
}
server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

mkdir -p /var/www/html
ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/"
rm -f /etc/nginx/sites-enabled/default

# Install SSL
echo -e "${BLUE}🔒 Installing SSL certificate...${NC}"
snap install core && snap refresh core
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# Get certificate
if certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive; then
    # Update Nginx with SSL
    cat > "/etc/nginx/sites-available/$DOMAIN" << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$server_name\$request_uri;
}
server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    echo -e "${GREEN}✅ SSL certificate installed successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  SSL installation failed. You can retry manually later.${NC}"
fi

nginx -t && systemctl start nginx

# Create management script
cat > manage.sh << 'EOF'
#!/bin/bash
cd /opt/spurring
case "$1" in
    start) docker-compose up -d ;;
    stop) docker-compose down ;;
    restart) docker-compose restart ;;
    logs) docker-compose logs -f ;;
    status) docker-compose ps ;;
    update) git pull && docker-compose build --no-cache && docker-compose up -d ;;
    *) echo "Usage: $0 {start|stop|restart|logs|status|update}" ;;
esac
EOF

chmod +x manage.sh
ln -sf "$APP_DIR/manage.sh" /usr/local/bin/spurring

# Display results
echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}\n"
echo -e "${BLUE}Your website is available at:${NC}"
echo -e "  🌐 https://$DOMAIN"
echo -e "  🌐 https://www.$DOMAIN"
echo -e "\n${BLUE}Management commands:${NC}"
echo -e "  spurring status   - Check status"
echo -e "  spurring logs     - View logs"
echo -e "  spurring restart  - Restart services"
echo -e "  spurring update   - Update application"
echo -e "\n${BLUE}Files created:${NC}"
echo -e "  📁 Application: $APP_DIR"
echo -e "  🔑 Environment: $APP_DIR/.env"
echo -e "  🐳 Docker: $APP_DIR/docker-compose.yml"

echo -e "\n${YELLOW}Important:${NC}"
echo -e "  • Make sure $DOMAIN DNS points to this server"
echo -e "  • Database password: $DB_PASSWORD"
echo -e "  • Keep this information secure!"

echo -e "\n${GREEN}✅ Spurring is now live at https://$DOMAIN${NC}"

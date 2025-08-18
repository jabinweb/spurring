#!/bin/bash

# Hostinger VPS Quick Deploy Script for Spurring Application
# This script is optimized for Hostinger VPS environment

echo "🚀 Hostinger VPS - Spurring Quick Deploy"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on Ubuntu
if [ ! -f /etc/lsb-release ]; then
    print_error "This script is designed for Ubuntu. Please use Ubuntu 22.04 LTS on your Hostinger VPS."
    exit 1
fi

# Get VPS IP
VPS_IP=$(curl -s ifconfig.me)
print_status "Detected VPS IP: $VPS_IP"

# Update system
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    print_warning "Please logout and login again after this script completes to use Docker without sudo"
else
    print_status "Docker already installed"
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_status "Docker Compose already installed"
fi

# Install other essentials
print_status "Installing essential packages..."
sudo apt install -y git curl nginx ufw

# Configure firewall for Hostinger
print_status "Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Create production environment file
print_status "Setting up environment configuration..."
if [ ! -f ".env.prod" ]; then
    cat > .env.prod << EOF
# Production Environment for Hostinger VPS
DATABASE_URL="postgresql://spurring_owner:npg_jez7fh9oJNLF@ep-hidden-cell-a1z21cwm-pooler.ap-southeast-1.aws.neon.tech/spurring?sslmode=require"
NEXTAUTH_URL="http://$VPS_IP"
NEXTAUTH_SECRET="6/xe1BMGrkmatfEOCLhNqLbmSSXqrYXiYarWlI9Y15g="
ADMIN_SECRET="admin123!@#"
NODE_ENV="production"
EOF
    
    print_warning "Created .env.prod with default values."
    print_warning "You may want to update ADMIN_SECRET for better security."
fi

# Build and start application
print_status "Building and starting application..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod build
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Wait for containers to start
print_status "Waiting for application to start..."
sleep 15

# Run database migrations
print_status "Setting up database..."
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db push

# Configure Nginx
print_status "Configuring Nginx reverse proxy..."
sudo tee /etc/nginx/sites-available/spurring > /dev/null <<EOF
server {
    listen 80;
    server_name $VPS_IP;

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

# Enable site and restart Nginx
sudo ln -sf /etc/nginx/sites-available/spurring /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Create useful scripts
print_status "Creating management scripts..."

# Update script
cat > update.sh << 'EOF'
#!/bin/bash
echo "🔄 Updating Spurring application..."
git pull origin main
docker-compose -f docker-compose.prod.yml --env-file .env.prod down
docker-compose -f docker-compose.prod.yml --env-file .env.prod build --no-cache
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
sleep 10
docker-compose -f docker-compose.prod.yml exec -T app npx prisma db push
echo "✅ Update completed!"
EOF

# Monitor script
cat > monitor.sh << 'EOF'
#!/bin/bash
echo "📊 Spurring Application Status - $(date)"
echo "========================================="

echo "🖥️  System Resources:"
echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')%"
echo "Memory: $(free | awk 'NR==2{printf "%.1f%%", $3*100/$2 }')"
echo "Disk: $(df -h / | awk 'NR==2{print $5}')"

echo ""
echo "🐳 Docker Containers:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🌐 Application Health:"
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application is running"
else
    echo "❌ Application is not responding"
fi

echo ""
echo "📋 Recent Logs (last 10 lines):"
docker-compose -f docker-compose.prod.yml logs --tail=10 app
EOF

# Backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="$HOME/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

echo "💾 Creating backup: $DATE"

# Backup application files
tar -czf $BACKUP_DIR/spurring_$DATE.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    .

# Backup environment
cp .env.prod $BACKUP_DIR/env_$DATE

# Keep only last 5 backups
ls -t $BACKUP_DIR/spurring_*.tar.gz | tail -n +6 | xargs -r rm

echo "✅ Backup completed: $BACKUP_DIR/spurring_$DATE.tar.gz"
EOF

chmod +x update.sh monitor.sh backup.sh

# Set up automatic daily monitoring
(crontab -l 2>/dev/null; echo "0 8 * * * $PWD/monitor.sh >> /var/log/spurring-monitor.log") | crontab -

# Final checks
print_status "Running final checks..."
sleep 5

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    APPLICATION_STATUS="✅ Running"
else
    APPLICATION_STATUS="❌ Not responding"
fi

if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    CONTAINER_STATUS="✅ Running"
else
    CONTAINER_STATUS="❌ Issues detected"
fi

# Display results
echo ""
echo "🎉 Hostinger VPS Deployment Complete!"
echo "====================================="
echo ""
echo "📍 Application Details:"
echo "   URL: http://$VPS_IP"
echo "   Admin: http://$VPS_IP/admin"
echo "   Status: $APPLICATION_STATUS"
echo "   Containers: $CONTAINER_STATUS"
echo ""
echo "🔧 Management Commands:"
echo "   Monitor: ./monitor.sh"
echo "   Update: ./update.sh"
echo "   Backup: ./backup.sh"
echo "   Logs: docker-compose -f docker-compose.prod.yml logs -f app"
echo ""
echo "📝 Next Steps:"
echo "1. Visit http://$VPS_IP to see your application"
echo "2. Visit http://$VPS_IP/admin to access admin panel"
echo "3. Update ADMIN_SECRET in .env.prod for security"
echo "4. Consider setting up a domain name and SSL certificate"
echo ""
echo "🔒 Security Notes:"
echo "   - Change the admin password after first login"
echo "   - Update ADMIN_SECRET in .env.prod"
echo "   - Consider setting up SSL with Let's Encrypt"
echo ""
print_status "Happy deploying! 🚀"

# Show status
./monitor.sh

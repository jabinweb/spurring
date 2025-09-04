# Spurring VPS Deployment Guide

Complete guide for deploying Spurring Next.js application on any VPS with Docker, PostgreSQL, and SSL.

## 🚀 Quick Start (Recommended)

For a one-command deployment:

```bash
# Download and run the quick deployment script
curl -O https://raw.githubusercontent.com/jabinweb/spurring/main/quick-deploy.sh
chmod +x quick-deploy.sh
sudo ./quick-deploy.sh your-domain.com your-email@example.com
```

**Example:**
```bash
sudo ./quick-deploy.sh spurringventures.com admin@spurringventures.com
```

## 📋 Prerequisites

### VPS Requirements
- **OS**: Ubuntu 20.04/22.04 or Debian 11+
- **RAM**: Minimum 1GB (Recommended 2GB+)
- **Storage**: Minimum 10GB free space
- **Access**: Root or sudo access

### Domain Requirements
- Domain name pointing to your VPS IP
- DNS A records configured:
  ```
  Type: A Record, Name: @, Value: YOUR_VPS_IP
  Type: A Record, Name: www, Value: YOUR_VPS_IP
  ```

## 🛠️ Installation Methods

### Method 1: Quick Deploy (Automated)

**Single command deployment:**

```bash
# Download script
wget https://raw.githubusercontent.com/jabinweb/spurring/main/quick-deploy.sh

# Make executable
chmod +x quick-deploy.sh

# Run deployment
sudo ./quick-deploy.sh your-domain.com your-email@example.com
```

**What it does:**
- ✅ Installs Docker and Docker Compose
- ✅ Configures firewall (UFW)
- ✅ Clones repository
- ✅ Sets up environment variables
- ✅ Builds and deploys containers
- ✅ Installs Nginx with SSL
- ✅ Creates management scripts

### Method 2: Full Production Deploy (Advanced)

**Complete production setup with all features:**

```bash
# Download full deployment script
wget https://raw.githubusercontent.com/jabinweb/spurring/main/deploy-production.sh

# Make executable
chmod +x deploy-production.sh

# Run interactive deployment
sudo ./deploy-production.sh
```

**Additional features:**
- 🔧 Interactive configuration
- 📊 Advanced monitoring setup
- 🔄 Automated backups
- 🛡️ Enhanced security settings
- 📝 Comprehensive logging

### Method 3: Manual Deployment

**Step-by-step manual deployment:**

#### Step 1: System Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y curl wget git ufw htop nano
```

#### Step 2: Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Start Docker
sudo systemctl enable docker
sudo systemctl start docker
```

#### Step 3: Configure Firewall
```bash
# Setup UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

#### Step 4: Clone Repository
```bash
# Create application directory
sudo mkdir -p /opt/spurring
cd /opt/spurring

# Clone repository
sudo git clone https://github.com/jabinweb/spurring.git .
```

#### Step 5: Environment Configuration
```bash
# Create .env file
sudo nano .env
```

**Add the following content:**
```env
DATABASE_URL=postgresql://postgres:YOUR_DB_PASSWORD@spurring-db:5432/spurring
POSTGRES_PASSWORD=YOUR_DB_PASSWORD
POSTGRES_DB=spurring
POSTGRES_USER=postgres
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
PORT=3000
```

#### Step 6: Docker Compose Setup
```bash
# Create docker-compose.yml
sudo nano docker-compose.yml
```

**Add the configuration:**
```yaml
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
```

#### Step 7: Deploy Application
```bash
# Build and start containers
sudo docker-compose build --no-cache
sudo docker-compose up -d

# Check status
sudo docker-compose ps
```

#### Step 8: Install Nginx and SSL
```bash
# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y snapd
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/your-domain.com
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## 🎛️ Management Commands

After deployment, use these commands to manage your application:

### Built-in Management
```bash
# Quick status check
spurring status

# View logs
spurring logs

# Restart services
spurring restart

# Update application
spurring update

# Start services
spurring start

# Stop services
spurring stop
```

### Docker Commands
```bash
# View container status
docker-compose ps

# View logs
docker-compose logs -f

# Restart specific service
docker-compose restart app
docker-compose restart db

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Management
```bash
# Backup database
docker-compose exec db pg_dump -U postgres spurring > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres -d spurring < backup.sql

# Access database shell
docker-compose exec db psql -U postgres -d spurring
```

## 🔧 Configuration Options

### Environment Variables

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `NEXTAUTH_URL` - Your domain URL

**Optional variables:**
- `NODE_ENV` - Environment (production/development)
- `PORT` - Application port (default: 3000)

### Port Configuration

**Default ports:**
- Application: 8081 (external) → 3000 (internal)
- Database: 5432 (internal only)
- Nginx: 80 (HTTP) → 443 (HTTPS)

### SSL Configuration

**Automatic renewal:**
```bash
# Test renewal
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew
```

## 📊 Monitoring and Logs

### Application Logs
```bash
# Real-time logs
docker-compose logs -f app

# Database logs
docker-compose logs -f db

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### System Monitoring
```bash
# Resource usage
docker stats

# Disk usage
df -h

# Memory usage
free -h

# Process monitoring
htop
```

## 🛡️ Security Best Practices

### Firewall Rules
```bash
# Check firewall status
sudo ufw status

# Allow specific ports only
sudo ufw allow from YOUR_IP to any port 22
sudo ufw deny 22  # Block SSH from everywhere else
```

### SSL Security
- Automatic certificate renewal enabled
- Strong cipher suites configured
- HSTS headers enabled
- Secure protocols only (TLS 1.2/1.3)

### Database Security
- Database not exposed externally
- Strong randomly generated passwords
- Network isolation with Docker networks

## 🔄 Updates and Maintenance

### Application Updates
```bash
# Simple update
spurring update

# Manual update
cd /opt/spurring
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### System Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

### Backup Strategy
```bash
# Create backup script
sudo nano /opt/spurring/backup.sh
```

**Backup script content:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/spurring/backups"
mkdir -p $BACKUP_DIR

# Database backup
docker-compose exec -T db pg_dump -U postgres spurring > "$BACKUP_DIR/db_$DATE.sql"

# Application backup
tar -czf "$BACKUP_DIR/app_$DATE.tar.gz" -C /opt/spurring --exclude=backups .

# Keep only last 10 backups
ls -t $BACKUP_DIR/*.sql | tail -n +11 | xargs -r rm
ls -t $BACKUP_DIR/*.tar.gz | tail -n +11 | xargs -r rm

echo "Backup completed: $DATE"
```

```bash
# Make executable and schedule
chmod +x /opt/spurring/backup.sh
(crontab -l; echo "0 2 * * * /opt/spurring/backup.sh") | crontab -
```

## 🚨 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443

# Stop conflicting services
sudo systemctl stop apache2  # if Apache is running
docker stop coolify-proxy    # if Coolify is installed
```

**SSL certificate issues:**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal

# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

**Container issues:**
```bash
# Check container logs
docker-compose logs app
docker-compose logs db

# Restart containers
docker-compose restart

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Database connection issues:**
```bash
# Check database status
docker-compose exec db pg_isready -U postgres

# Reset database
docker-compose down
docker volume rm spurring_postgres_data
docker-compose up -d
```

### Performance Optimization

**Docker optimization:**
```bash
# Clean up unused resources
docker system prune -af

# Optimize images
docker-compose build --no-cache --compress
```

**Nginx optimization:**
```nginx
# Add to Nginx config
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

# Enable caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 📞 Support

### Log Files
- Application logs: `docker-compose logs app`
- Database logs: `docker-compose logs db`
- Nginx logs: `/var/log/nginx/`
- SSL logs: `/var/log/letsencrypt/`

### Configuration Files
- Environment: `/opt/spurring/.env`
- Docker Compose: `/opt/spurring/docker-compose.yml`
- Nginx: `/etc/nginx/sites-available/your-domain.com`
- SSL: `/etc/letsencrypt/live/your-domain.com/`

### Health Checks
```bash
# Application health
curl -I https://your-domain.com

# Database health
docker-compose exec db pg_isready -U postgres

# SSL health
curl -I https://your-domain.com
openssl s_client -connect your-domain.com:443 < /dev/null
```

---

## 🎉 Success!

After following this guide, you should have:
- ✅ Spurring application running on Docker
- ✅ PostgreSQL database with persistent storage
- ✅ Nginx reverse proxy with SSL
- ✅ Automatic HTTPS redirects
- ✅ Management scripts for easy maintenance
- ✅ Backup and monitoring setup

Your website should be live at `https://your-domain.com`! 🚀

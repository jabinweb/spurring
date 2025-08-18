# Hostinger VPS Deployment Guide

## Hostinger VPS Setup for Spurring Application

### Prerequisites

**Recommended Hostinger VPS Plan:**
- **VPS 1**: €3.99/month - 1 vCPU, 4GB RAM, 20GB SSD (Recommended)
- **VPS 2**: €8.99/month - 2 vCPU, 8GB RAM, 40GB SSD (For high traffic)
- **OS**: Ubuntu 22.04 LTS

### Step 1: Initial VPS Setup

1. **Access your Hostinger VPS:**
   - Log into your Hostinger account
   - Go to VPS section
   - Note down your VPS IP address
   - Use the provided root password or SSH key

2. **Connect to your VPS:**
   ```bash
   ssh root@your-hostinger-vps-ip
   ```

3. **Update the system:**
   ```bash
   apt update && apt upgrade -y
   ```

4. **Create a non-root user (recommended):**
   ```bash
   adduser spurring
   usermod -aG sudo spurring
   su - spurring
   ```

### Step 2: Install Required Software

```bash
# Install Git
sudo apt install git curl -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again to apply Docker group changes
exit
ssh spurring@your-hostinger-vps-ip
```

### Step 3: Deploy Your Application

```bash
# Clone your repository
git clone https://github.com/jabinweb/spurring.git
cd spurring

# Make deploy script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Step 4: Configure Environment Variables

When prompted by the deploy script, update your `.env.prod` file:

```bash
nano .env.prod
```

**Use these values for Hostinger:**
```env
# Your Neon database URL (from your .env.docker file)
DATABASE_URL="postgresql://spurring_owner:npg_jez7fh9oJNLF@ep-hidden-cell-a1z21cwm-pooler.ap-southeast-1.aws.neon.tech/spurring?sslmode=require"

# Your VPS IP or domain
NEXTAUTH_URL="http://your-hostinger-vps-ip:3000"

# Your existing auth secret
NEXTAUTH_SECRET="6/xe1BMGrkmatfEOCLhNqLbmSSXqrYXiYarWlI9Y15g="

# Create a secure admin secret
ADMIN_SECRET="your-secure-admin-password-here"

# Node environment
NODE_ENV="production"
```

### Step 5: Configure Domain (Optional)

If you have a domain name:

1. **Point your domain to Hostinger VPS:**
   - In your domain registrar's DNS settings, add:
     ```
     A Record: @ → your-hostinger-vps-ip
     A Record: www → your-hostinger-vps-ip
     ```

2. **Update environment file:**
   ```bash
   nano .env.prod
   ```
   Change:
   ```env
   NEXTAUTH_URL="https://yourdomain.com"
   ```

3. **Install SSL certificate:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

### Step 6: Configure Hostinger Firewall

In Hostinger control panel:
1. Go to VPS → Firewall
2. Add these rules:
   - **SSH**: Port 22, Source: Your IP
   - **HTTP**: Port 80, Source: Anywhere
   - **HTTPS**: Port 443, Source: Anywhere

Or via command line:
```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Step 7: Verify Deployment

```bash
# Check if containers are running
docker-compose -f docker-compose.prod.yml ps

# Check application logs
docker-compose -f docker-compose.prod.yml logs app

# Test the application
curl http://localhost:3000
```

### Step 8: Access Your Application

- **Via IP**: `http://your-hostinger-vps-ip`
- **Via Domain**: `https://yourdomain.com` (if configured)
- **Admin Panel**: `http://your-hostinger-vps-ip/admin`

## Hostinger-Specific Optimizations

### Memory Optimization (for VPS 1 - 4GB RAM)

1. **Optimize Docker containers:**
   ```bash
   # Edit docker-compose.prod.yml
   nano docker-compose.prod.yml
   ```
   
   Add memory limits:
   ```yaml
   services:
     app:
       # ... existing config
       deploy:
         resources:
           limits:
             memory: 2G
           reservations:
             memory: 1G
   ```

2. **Configure swap file:**
   ```bash
   # Create 2GB swap file
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   
   # Make it permanent
   echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
   ```

### Performance Optimization

1. **Enable Nginx compression:**
   ```bash
   sudo nano /etc/nginx/sites-available/spurring
   ```
   
   Add compression settings:
   ```nginx
   server {
       # ... existing config
       
       # Compression
       gzip on;
       gzip_vary on;
       gzip_min_length 1024;
       gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
       
       # Caching
       location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

2. **Optimize PostgreSQL connection pooling** (already configured in your Neon URL)

### Monitoring Setup for Hostinger

1. **Create monitoring script:**
   ```bash
   nano monitor.sh
   ```
   
   ```bash
   #!/bin/bash
   # Simple monitoring script for Hostinger VPS
   
   echo "=== System Status $(date) ==="
   
   # CPU and Memory usage
   echo "CPU Usage:"
   top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4"%"}'
   
   echo "Memory Usage:"
   free -h | awk 'NR==2{print $3"/"$2" ("$3/$2*100.0"%)"}'
   
   # Disk usage
   echo "Disk Usage:"
   df -h / | awk 'NR==2{print $3"/"$2" ("$5")"}'
   
   # Docker containers status
   echo "Docker Containers:"
   docker-compose -f docker-compose.prod.yml ps
   
   # Application health check
   echo "Application Health:"
   if curl -f http://localhost:3000 > /dev/null 2>&1; then
       echo "✅ Application is responding"
   else
       echo "❌ Application is not responding"
   fi
   ```
   
   ```bash
   chmod +x monitor.sh
   
   # Add to crontab for daily monitoring
   (crontab -l 2>/dev/null; echo "0 8 * * * /home/spurring/spurring/monitor.sh >> /var/log/spurring-monitor.log") | crontab -
   ```

### Backup Strategy for Hostinger

Since you're using Neon (external database), you don't need local database backups, but here's a complete backup script:

```bash
nano backup.sh
```

```bash
#!/bin/bash
# Backup script for Hostinger VPS

BACKUP_DIR="/home/spurring/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application files
echo "Backing up application files..."
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    /home/spurring/spurring/

# Backup environment files
cp .env.prod $BACKUP_DIR/env_backup_$DATE

# Backup Nginx configuration
sudo cp /etc/nginx/sites-available/spurring $BACKUP_DIR/nginx_backup_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*backup_*" -mtime +7 -delete

echo "Backup completed: $DATE"
```

## Troubleshooting Hostinger-Specific Issues

### Issue 1: Docker permission denied
```bash
# If you get permission denied errors
sudo usermod -aG docker $USER
newgrp docker
```

### Issue 2: Out of memory
```bash
# Check memory usage
free -h

# Restart application with memory cleanup
docker-compose -f docker-compose.prod.yml down
docker system prune -f
docker-compose -f docker-compose.prod.yml up -d
```

### Issue 3: Nginx not starting
```bash
# Check if Apache is running (common on Hostinger)
sudo systemctl status apache2

# Stop Apache if running
sudo systemctl stop apache2
sudo systemctl disable apache2

# Start Nginx
sudo systemctl start nginx
```

### Issue 4: Port 80/443 already in use
```bash
# Check what's using the ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Kill processes if needed
sudo systemctl stop apache2
sudo systemctl start nginx
```

## One-Command Hostinger Deployment

For quick deployment on Hostinger VPS:

```bash
curl -fsSL https://raw.githubusercontent.com/jabinweb/spurring/main/deploy.sh | bash
```

## Support and Maintenance

### Daily maintenance commands:
```bash
# Check application status
./monitor.sh

# View logs
docker-compose -f docker-compose.prod.yml logs --tail=50 app

# Restart if needed
docker-compose -f docker-compose.prod.yml restart app
```

### Weekly maintenance:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Update application
./update.sh

# Run backup
./backup.sh
```

This guide is specifically optimized for Hostinger VPS and takes into account their typical configurations and limitations. Your application should run smoothly on their VPS 1 plan with 4GB RAM.

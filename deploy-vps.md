# VPS Deployment Guide

## Option 1: Direct Docker Deployment

### Prerequisites on VPS:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 1. Clone your repository on VPS:
```bash
git clone https://github.com/jabinweb/spurring.git
cd spurring
```

### 2. Set up environment variables:
```bash
# Create .env file
nano .env
```

Add your environment variables:
```env
DATABASE_URL="postgres://postgres:2hNsawtjLQGWpqxZPx6MevSKxmaMwDv1X6lIYdLjOEBHuawIHlBt1yxKkHhfS6c1@nw0g000gok0kgcgc8ok04sc8:5432/postgres"
NEXTAUTH_SECRET="6/xe1BMGrkmatfEOCLhNqLbmSSXqrYXiYarWlI9Y15g="
NEXTAUTH_URL="https://spurringventures.com"
# Add other environment variables
```

### 3. Build and run on alternative port (avoiding Coolify's port 80):
```bash
# Build the image
docker build -t spurring-app .

# Run the container on port 8080
docker run -d \
  --name spurring-app \
  -p 8080:3000 \
  --env-file .env \
  spurring-app
```

### 4. Set up on alternative port (since Coolify uses port 80):
```bash
# Run on port 8080 instead
docker run -d \
  --name spurring-app \
  -p 8080:3000 \
  --env-file .env \
  spurring-app
```

#### Option A: Access directly via port 8080
Your app will be accessible at: `http://your-vps-ip:8080`

#### Option B: Use Nginx on different port (8081):
```bash
# Install Nginx (if not already installed by Coolify)
sudo apt update
sudo apt install nginx

# Create Nginx config for port 8081
sudo nano /etc/nginx/sites-available/spurring-direct
```

Nginx configuration for port 8081:
```nginx
server {
    listen 8081;
    server_name your-vps-ip;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/spurring-direct /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Now accessible at: `http://your-vps-ip:8081`

### 5. Set up SSL with Let's Encrypt:
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Option 2: Docker Compose Deployment

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:3000"  # Use port 8080 since Coolify uses 80
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=spurring
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "8081:80"  # Use port 8081 for Nginx
      - "8443:443"  # Use port 8443 for HTTPS
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

Deploy with:
```bash
docker-compose up -d
```

## Option 3: PM2 Deployment (Non-Docker)

### 1. Install Node.js and PM2:
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

### 2. Clone and build:
```bash
git clone https://github.com/jabinweb/spurring.git
cd spurring
npm install --legacy-peer-deps
npx prisma generate
npm run build
```

### 3. Create PM2 ecosystem file:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'spurring-app',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/spurring',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'your_database_url',
      NEXTAUTH_SECRET: 'your_secret',
      NEXTAUTH_URL: 'https://yourdomain.com'
    },
    restart_delay: 4000,
    max_memory_restart: '200M'
  }]
}
```

### 4. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Option 4: GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        script: |
          cd /path/to/spurring
          git pull origin main
          docker build -t spurring-app .
          docker stop spurring-app || true
          docker rm spurring-app || true
          docker run -d --name spurring-app -p 3000:3000 --env-file .env spurring-app
```

## Recommended: Option 1 with Docker

For your use case, I recommend **Option 1 (Direct Docker)** because:
- ✅ You already have a working Dockerfile
- ✅ Isolated environment
- ✅ Easy to manage and update
- ✅ Consistent with your current setup

## Quick Start Commands for VPS (avoiding Coolify ports):

```bash
# 1. Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh

# 2. Clone your repo
git clone https://github.com/jabinweb/spurring.git && cd spurring

# 3. Create environment file
echo "DATABASE_URL=your_db_url" > .env
echo "NEXTAUTH_SECRET=your_secret" >> .env

# 4. Build and run on port 8080
docker build -t spurring-app .
docker run -d --name spurring-app -p 8080:3000 --env-file .env spurring-app

# 5. Access your app at: http://your-vps-ip:8080
```

## Alternative: Use different domain/subdomain

If you have a domain, you can also set up a subdomain:
- Coolify app: `yourdomain.com` (port 80)
- Direct deployment: `app.yourdomain.com` (port 8080)

```bash
# Configure subdomain to point to port 8080
# This way both can coexist on the same VPS
```

Would you like me to help you with any specific deployment option or create additional configuration files?

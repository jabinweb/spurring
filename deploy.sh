#!/bin/bash

# Spurring VPS Deployment Script
# This script automates the deployment process for the Spurring application on VPS

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="spurring-app"
REPO_URL="https://github.com/jabinweb/spurring.git"
APP_DIR="/opt/spurring"
DOCKER_PORT="8080"
CONTAINER_PORT="3000"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_warning "This script should not be run as root for security reasons."
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to install Docker if not present
install_docker() {
    if ! command -v docker &> /dev/null; then
        print_status "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        sudo usermod -aG docker $USER
        print_success "Docker installed successfully"
        print_warning "Please log out and log back in for Docker permissions to take effect"
        rm get-docker.sh
    else
        print_success "Docker is already installed"
    fi
}

# Function to install Docker Compose if not present
install_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_status "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        print_success "Docker Compose installed successfully"
    else
        print_success "Docker Compose is already installed"
    fi
}

# Function to stop and remove existing container
cleanup_existing() {
    print_status "Cleaning up existing deployment..."
    
    # Stop container if running
    if docker ps -q -f name=$APP_NAME | grep -q .; then
        print_status "Stopping existing container..."
        docker stop $APP_NAME
    fi
    
    # Remove container if exists
    if docker ps -a -q -f name=$APP_NAME | grep -q .; then
        print_status "Removing existing container..."
        docker rm $APP_NAME
    fi
    
    # Remove image if exists
    if docker images -q $APP_NAME | grep -q .; then
        print_status "Removing existing image..."
        docker rmi $APP_NAME
    fi
}

# Function to clone or update repository
setup_repository() {
    print_status "Setting up repository..."
    
    if [ -d "$APP_DIR" ]; then
        print_status "Repository exists, updating..."
        cd $APP_DIR
        git pull origin main
    else
        print_status "Cloning repository..."
        sudo mkdir -p $APP_DIR
        sudo chown $USER:$USER $APP_DIR
        git clone $REPO_URL $APP_DIR
        cd $APP_DIR
    fi
    
    print_success "Repository ready"
}

# Function to setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f "$APP_DIR/.env" ]; then
        print_warning ".env file not found. Creating template..."
        cat > $APP_DIR/.env << 'EOF'
DATABASE_URL="postgres://postgres:2hNsawtjLQGWpqxZPx6MevSKxmaMwDv1X6lIYdLjOEBHuawIHlBt1yxKkHhfS6c1@nw0g000gok0kgcgc8ok04sc8:5432/postgres"
NEXTAUTH_SECRET="6/xe1BMGrkmatfEOCLhNqLbmSSXqrYXiYarWlI9Y15g="
NEXTAUTH_URL="https://spurringventures.com"
NODE_ENV="production"
PORT="3000"
EOF
        print_warning "Please edit $APP_DIR/.env with your actual environment variables"
        read -p "Press Enter to continue after editing the .env file..."
    else
        print_success "Environment file found"
    fi
}

# Function to build and deploy
build_and_deploy() {
    print_status "Building Docker image..."
    cd $APP_DIR
    
    # Build the image
    docker build -t $APP_NAME .
    
    print_status "Starting container..."
    
    # Run the container
    docker run -d \
        --name $APP_NAME \
        -p $DOCKER_PORT:$CONTAINER_PORT \
        --env-file .env \
        --restart unless-stopped \
        $APP_NAME
    
    print_success "Container started successfully"
}

# Function to check deployment status
check_deployment() {
    print_status "Checking deployment status..."
    
    # Wait a moment for container to start
    sleep 5
    
    if docker ps | grep -q $APP_NAME; then
        print_success "Container is running"
        
        # Get container IP and port
        CONTAINER_ID=$(docker ps -q -f name=$APP_NAME)
        print_status "Container ID: $CONTAINER_ID"
        
        # Check if port is accessible
        if curl -f http://localhost:$DOCKER_PORT > /dev/null 2>&1; then
            print_success "Application is accessible on port $DOCKER_PORT"
        else
            print_warning "Application may still be starting up..."
        fi
        
        # Show logs
        print_status "Recent logs:"
        docker logs --tail 20 $APP_NAME
        
    else
        print_error "Container failed to start"
        print_status "Container logs:"
        docker logs $APP_NAME
        exit 1
    fi
}

# Function to setup firewall (optional)
setup_firewall() {
    if command -v ufw &> /dev/null; then
        print_status "Configuring firewall..."
        sudo ufw allow $DOCKER_PORT/tcp
        print_success "Firewall configured to allow port $DOCKER_PORT"
    fi
}

# Function to show deployment info
show_deployment_info() {
    print_success "Deployment completed successfully!"
    echo
    echo "=== Deployment Information ==="
    echo "Application Name: $APP_NAME"
    echo "Port: $DOCKER_PORT"
    echo "Directory: $APP_DIR"
    echo
    echo "=== Access URLs ==="
    
    # Get server IP
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_SERVER_IP")
    echo "HTTP: http://$SERVER_IP:$DOCKER_PORT"
    echo "Local: http://localhost:$DOCKER_PORT"
    echo
    echo "=== Useful Commands ==="
    echo "View logs: docker logs $APP_NAME"
    echo "Stop app: docker stop $APP_NAME"
    echo "Start app: docker start $APP_NAME"
    echo "Restart app: docker restart $APP_NAME"
    echo "Remove app: docker stop $APP_NAME && docker rm $APP_NAME"
    echo
    echo "=== Update Application ==="
    echo "To update: cd $APP_DIR && git pull && docker build -t $APP_NAME . && docker stop $APP_NAME && docker rm $APP_NAME && ./deploy.sh"
}

# Main deployment function
main() {
    print_status "Starting Spurring VPS Deployment..."
    echo
    
    # Check if running as root
    check_root
    
    # Install dependencies
    install_docker
    install_docker_compose
    
    # Cleanup existing deployment
    cleanup_existing
    
    # Setup repository
    setup_repository
    
    # Setup environment
    setup_environment
    
    # Build and deploy
    build_and_deploy
    
    # Check deployment
    check_deployment
    
    # Setup firewall
    setup_firewall
    
    # Show deployment info
    show_deployment_info
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Spurring VPS Deployment Script"
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --logs         Show application logs"
        echo "  --status       Show deployment status"
        echo "  --stop         Stop the application"
        echo "  --start        Start the application"
        echo "  --restart      Restart the application"
        echo "  --update       Update and redeploy"
        echo ""
        exit 0
        ;;
    --logs)
        docker logs -f $APP_NAME
        exit 0
        ;;
    --status)
        if docker ps | grep -q $APP_NAME; then
            print_success "Application is running"
            docker ps | grep $APP_NAME
        else
            print_error "Application is not running"
        fi
        exit 0
        ;;
    --stop)
        print_status "Stopping application..."
        docker stop $APP_NAME
        print_success "Application stopped"
        exit 0
        ;;
    --start)
        print_status "Starting application..."
        docker start $APP_NAME
        print_success "Application started"
        exit 0
        ;;
    --restart)
        print_status "Restarting application..."
        docker restart $APP_NAME
        print_success "Application restarted"
        exit 0
        ;;
    --update)
        print_status "Updating application..."
        cd $APP_DIR
        git pull origin main
        cleanup_existing
        build_and_deploy
        check_deployment
        print_success "Application updated"
        exit 0
        ;;
    "")
        # No arguments, run main deployment
        main
        ;;
    *)
        print_error "Unknown option: $1"
        echo "Use --help for usage information"
        exit 1
        ;;
esac

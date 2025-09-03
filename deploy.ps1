# Spurring VPS Deployment Script (PowerShell Version)
# This script automates the deployment process for the Spurring application on Windows/VPS

param(
    [string]$Action = "deploy",
    [switch]$Help
)

# Configuration
$APP_NAME = "spurring-app"
$REPO_URL = "https://github.com/jabinweb/spurring.git"
$APP_DIR = "C:\spurring"
$DOCKER_PORT = "8080"
$CONTAINER_PORT = "3000"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Function to check if Docker is installed
function Test-Docker {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to install Docker Desktop (manual step)
function Install-Docker {
    if (-not (Test-Docker)) {
        Write-Warning "Docker is not installed!"
        Write-Status "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
        Write-Status "After installation, restart this script."
        Read-Host "Press Enter to exit"
        exit 1
    }
    else {
        Write-Success "Docker is already installed"
    }
}

# Function to cleanup existing deployment
function Remove-ExistingDeployment {
    Write-Status "Cleaning up existing deployment..."
    
    try {
        # Stop container if running
        $runningContainer = docker ps -q -f name=$APP_NAME
        if ($runningContainer) {
            Write-Status "Stopping existing container..."
            docker stop $APP_NAME
        }
        
        # Remove container if exists
        $existingContainer = docker ps -a -q -f name=$APP_NAME
        if ($existingContainer) {
            Write-Status "Removing existing container..."
            docker rm $APP_NAME
        }
        
        # Remove image if exists
        $existingImage = docker images -q $APP_NAME
        if ($existingImage) {
            Write-Status "Removing existing image..."
            docker rmi $APP_NAME
        }
    }
    catch {
        Write-Warning "Some cleanup operations failed, continuing..."
    }
}

# Function to setup repository
function Set-Repository {
    Write-Status "Setting up repository..."
    
    if (Test-Path $APP_DIR) {
        Write-Status "Repository exists, updating..."
        Set-Location $APP_DIR
        git pull origin main
    }
    else {
        Write-Status "Cloning repository..."
        git clone $REPO_URL $APP_DIR
        Set-Location $APP_DIR
    }
    
    Write-Success "Repository ready"
}

# Function to setup environment variables
function Set-Environment {
    Write-Status "Setting up environment variables..."
    
    $envFile = Join-Path $APP_DIR ".env"
    
    if (-not (Test-Path $envFile)) {
        Write-Warning ".env file not found. Creating template..."
        
        $envContent = @"
DATABASE_URL="postgres://postgres:2hNsawtjLQGWpqxZPx6MevSKxmaMwDv1X6lIYdLjOEBHuawIHlBt1yxKkHhfS6c1@nw0g000gok0kgcgc8ok04sc8:5432/postgres"
NEXTAUTH_SECRET="6/xe1BMGrkmatfEOCLhNqLbmSSXqrYXiYarWlI9Y15g="
NEXTAUTH_URL="https://spurringventures.com"
NODE_ENV="production"
PORT="3000"
"@
        
        $envContent | Out-File -FilePath $envFile -Encoding UTF8
        Write-Warning "Please edit $envFile with your actual environment variables"
        Read-Host "Press Enter to continue after editing the .env file"
    }
    else {
        Write-Success "Environment file found"
    }
}

# Function to build and deploy
function Start-Deployment {
    Write-Status "Building Docker image..."
    Set-Location $APP_DIR
    
    # Build the image
    docker build -t $APP_NAME .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Docker build failed"
        exit 1
    }
    
    Write-Status "Starting container..."
    
    # Run the container
    docker run -d `
        --name $APP_NAME `
        -p "${DOCKER_PORT}:${CONTAINER_PORT}" `
        --env-file .env `
        --restart unless-stopped `
        $APP_NAME
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Container start failed"
        exit 1
    }
    
    Write-Success "Container started successfully"
}

# Function to check deployment status
function Test-Deployment {
    Write-Status "Checking deployment status..."
    
    # Wait a moment for container to start
    Start-Sleep -Seconds 5
    
    $runningContainer = docker ps -q -f name=$APP_NAME
    if ($runningContainer) {
        Write-Success "Container is running"
        
        # Show container info
        Write-Status "Container ID: $runningContainer"
        
        # Check if port is accessible
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$DOCKER_PORT" -UseBasicParsing -TimeoutSec 10
            Write-Success "Application is accessible on port $DOCKER_PORT"
        }
        catch {
            Write-Warning "Application may still be starting up..."
        }
        
        # Show logs
        Write-Status "Recent logs:"
        docker logs --tail 20 $APP_NAME
    }
    else {
        Write-Error "Container failed to start"
        Write-Status "Container logs:"
        docker logs $APP_NAME
        exit 1
    }
}

# Function to show deployment info
function Show-DeploymentInfo {
    Write-Success "Deployment completed successfully!"
    Write-Host ""
    Write-Host "=== Deployment Information ===" -ForegroundColor Cyan
    Write-Host "Application Name: $APP_NAME"
    Write-Host "Port: $DOCKER_PORT"
    Write-Host "Directory: $APP_DIR"
    Write-Host ""
    Write-Host "=== Access URLs ===" -ForegroundColor Cyan
    Write-Host "Local: http://localhost:$DOCKER_PORT"
    Write-Host ""
    Write-Host "=== Useful Commands ===" -ForegroundColor Cyan
    Write-Host "View logs: docker logs $APP_NAME"
    Write-Host "Stop app: docker stop $APP_NAME"
    Write-Host "Start app: docker start $APP_NAME"
    Write-Host "Restart app: docker restart $APP_NAME"
    Write-Host "Remove app: docker stop $APP_NAME; docker rm $APP_NAME"
    Write-Host ""
    Write-Host "=== PowerShell Management ===" -ForegroundColor Cyan
    Write-Host "Show status: .\deploy.ps1 -Action status"
    Write-Host "View logs: .\deploy.ps1 -Action logs"
    Write-Host "Stop app: .\deploy.ps1 -Action stop"
    Write-Host "Start app: .\deploy.ps1 -Action start"
    Write-Host "Restart app: .\deploy.ps1 -Action restart"
    Write-Host "Update app: .\deploy.ps1 -Action update"
}

# Function to show help
function Show-Help {
    Write-Host "Spurring VPS Deployment Script (PowerShell)" -ForegroundColor Cyan
    Write-Host "Usage: .\deploy.ps1 [-Action <action>] [-Help]" -ForegroundColor White
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor Yellow
    Write-Host "  deploy    - Full deployment (default)"
    Write-Host "  status    - Show deployment status"
    Write-Host "  logs      - Show application logs"
    Write-Host "  stop      - Stop the application"
    Write-Host "  start     - Start the application"
    Write-Host "  restart   - Restart the application"
    Write-Host "  update    - Update and redeploy"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\deploy.ps1                    # Deploy application"
    Write-Host "  .\deploy.ps1 -Action status     # Check status"
    Write-Host "  .\deploy.ps1 -Action logs       # View logs"
    Write-Host "  .\deploy.ps1 -Help              # Show this help"
}

# Main script logic
if ($Help) {
    Show-Help
    exit 0
}

switch ($Action.ToLower()) {
    "deploy" {
        Write-Status "Starting Spurring VPS Deployment..."
        Install-Docker
        Remove-ExistingDeployment
        Set-Repository
        Set-Environment
        Start-Deployment
        Test-Deployment
        Show-DeploymentInfo
    }
    "status" {
        $runningContainer = docker ps -q -f name=$APP_NAME
        if ($runningContainer) {
            Write-Success "Application is running"
            docker ps | Select-String $APP_NAME
        }
        else {
            Write-Error "Application is not running"
        }
    }
    "logs" {
        docker logs -f $APP_NAME
    }
    "stop" {
        Write-Status "Stopping application..."
        docker stop $APP_NAME
        Write-Success "Application stopped"
    }
    "start" {
        Write-Status "Starting application..."
        docker start $APP_NAME
        Write-Success "Application started"
    }
    "restart" {
        Write-Status "Restarting application..."
        docker restart $APP_NAME
        Write-Success "Application restarted"
    }
    "update" {
        Write-Status "Updating application..."
        Set-Location $APP_DIR
        git pull origin main
        Remove-ExistingDeployment
        Start-Deployment
        Test-Deployment
        Write-Success "Application updated"
    }
    default {
        Write-Error "Unknown action: $Action"
        Write-Host "Use -Help for usage information"
        exit 1
    }
}

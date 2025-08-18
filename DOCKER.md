# Docker Deployment Guide

## Prerequisites

- Docker and Docker Compose installed on your system
- Basic understanding of environment variables

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spurring
   ```

2. **Build and start the development environment**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations**
   ```bash
   docker-compose exec app npx prisma db push
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Database: localhost:5432

## Production Deployment

1. **Create production environment file**
   ```bash
   cp .env.prod.example .env.prod
   ```

2. **Edit the production environment variables**
   ```bash
   nano .env.prod
   ```
   Update the following variables:
   - `DATABASE_URL`: Your production PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production domain URL
   - `NEXTAUTH_SECRET`: A secure random string (use: `openssl rand -base64 32`)
   - `ADMIN_SECRET`: A secure random string for admin access

3. **Deploy with production configuration**
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose -f docker-compose.prod.yml exec app npx prisma db push
   ```

## Useful Commands

### View logs
```bash
# View application logs
docker-compose logs app

# View database logs
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f app
```

### Database operations
```bash
# Access the database directly
docker-compose exec db psql -U postgres -d spurring

# Run Prisma commands
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma db push
docker-compose exec app npx prisma generate
```

### Container management
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v

# Rebuild containers
docker-compose up --build

# View running containers
docker-compose ps
```

## Environment Variables

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Base URL of your application
- `NEXTAUTH_SECRET`: Secret for NextAuth.js session encryption
- `ADMIN_SECRET`: Secret for admin authentication

### Optional Variables
- `NODE_ENV`: Set to 'production' for production builds
- `SMTP_*`: Email configuration (can be set through admin panel)

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :3000
   
   # Change the port in docker-compose.yml
   ports:
     - "3001:3000"  # Change 3000 to available port
   ```

2. **Database connection issues**
   ```bash
   # Check if database container is running
   docker-compose ps
   
   # Check database logs
   docker-compose logs db
   ```

3. **Build failures**
   ```bash
   # Clean build with no cache
   docker-compose build --no-cache
   
   # Remove all containers and rebuild
   docker-compose down
   docker system prune -a
   docker-compose up --build
   ```

## Security Notes

- Always use strong, unique passwords for production
- Keep your `.env.prod` file secure and never commit it to version control
- Regularly update your Docker images and dependencies
- Use HTTPS in production environments
- Consider using Docker secrets for sensitive data in production

## Backup and Recovery

### Database Backup
```bash
# Create backup
docker-compose exec db pg_dump -U postgres spurring > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres spurring < backup.sql
```

### Volume Backup
```bash
# Create volume backup
docker run --rm -v spurring_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restore volume backup
docker run --rm -v spurring_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_backup.tar.gz -C /data
```

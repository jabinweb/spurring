FROM node:18-alpine

WORKDIR /app

# Install git (needed for cloning)
RUN apk add --no-cache git

# Clone the repository
RUN git clone https://github.com/jabinweb/spurring.git .

# Install dependencies with clean npm cache
RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies and git to reduce image size
RUN rm -rf .git node_modules/.cache

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application with proper database initialization
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]

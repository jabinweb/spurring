FROM node:18-alpine

# Install git
RUN apk add --no-cache git

WORKDIR /app

# Clone the repository
RUN git clone https://github.com/jabinweb/spurring.git .

# Install dependencies
RUN npm install --legacy-peer-deps

# Generate Prisma client and build
RUN npx prisma generate && npm run build

# Start the application
CMD ["sh", "-c", "npx prisma db push && npm start"]

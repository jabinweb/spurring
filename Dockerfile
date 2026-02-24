FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "npx prisma db push && npm start"]
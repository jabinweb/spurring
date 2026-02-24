FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npx prisma generate
RUN npm run build

CMD ["sh", "-c", "until pg_isready -h db -U postgres; do sleep 2; done && npx prisma db push && npm start"]
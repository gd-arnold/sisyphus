FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./
RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]

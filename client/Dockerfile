# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json /
RUN npm ci --only=production

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

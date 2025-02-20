# Build the React frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend ./
RUN npm install && npm run build

# Build the Express backend
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend ./
RUN npm install

# Final container setup
FROM nginx:latest
COPY --from=frontend /app/frontend/build /usr/share/nginx/html
COPY --from=backend /app/backend /app/backend
COPY nginx.conf /etc/nginx/nginx.conf

# Expose required ports
EXPOSE 80
EXPOSE 443

# Start backend and nginx
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]

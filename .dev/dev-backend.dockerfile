FROM node:19-alpine3.15
RUN mkdir -p /app
COPY ./.dev/dev-backend-entry.sh /tmp/dev-backend-entry.sh
RUN chmod +x /tmp/dev-backend-entry.sh
WORKDIR /app

EXPOSE 3000

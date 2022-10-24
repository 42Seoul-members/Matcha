FROM node:19-alpine3.15
RUN mkdir -p /app
COPY ./.dev/dev-frontend-entry.sh /tmp/dev-frontend-entry.sh
RUN chmod +x /tmp/dev-frontend-entry.sh
WORKDIR /app

EXPOSE 3000

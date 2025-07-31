FROM node:20-alpine

RUN apk add --no-cache curl bash

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared \
  && chmod +x /usr/local/bin/cloudflared

RUN chmod +x /app/entryPoint.sh

EXPOSE 4000

ENTRYPOINT ["/bin/bash", "/app/entryPoint.sh"]


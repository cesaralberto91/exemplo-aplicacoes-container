# stage 1
FROM node:20.9.0-slim as node

USER node
WORKDIR /usr/app

COPY --chown=node:node  .  .
RUN npm install
RUN npm run build --prod


# stage 2
FROM nginx:1.25.3-alpine3.18-slim

ENV TZ=America/Sao_Paulo
RUN apk add --update --no-cache tzdata
COPY --from=node /usr/app/www /var/www/app.dev
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

FROM node:6-alpine
MAINTAINER Jeff YU, jeff@jamma.cn
RUN apk update && apk add --no-cache zip && rm -rf /var/cache/apk/*
ENV NODE_ENV production
RUN mkdir -p /app
WORKDIR /app
CMD jmsh -v
RUN npm install jm-shell -g &&  npm cache clean
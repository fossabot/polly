FROM node:15.9.0-alpine3.10

RUN apk update

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY bot.ts ./

RUN yarn

CMD ["yarn", "start"]
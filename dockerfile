FROM node:15.9.0-alpine3.10

RUN apk update

WORKDIR /usr/app

COPY . ./

RUN yarn

CMD ["yarn", "start"]
FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

ENTRYPOINT npm i && npm start
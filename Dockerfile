FROM node:20.19-slim

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --production

COPY ./src ./src
COPY ./.env ./.env

CMD [ "node", "src/index.js" ]
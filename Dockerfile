FROM node:22-alpine AS back

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY src/ ./

EXPOSE "${API_PORT}"

CMD ["node", "src/index.js"]

FROM node:22-alpine AS client

WORKDIR /web

COPY client/package.json client/yarn.lock ./

RUN yarn install

COPY client/src/ ./src/
COPY client/public/ ./public/

RUN yarn build

EXPOSE "3000"

CMD ["yarn", "start"]

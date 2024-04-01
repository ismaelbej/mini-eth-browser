FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY src/ ./

EXPOSE "${API_PORT}"

CMD ["node", "src/index.js"]

FROM node:22-alpine AS back

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src/ ./

EXPOSE "${API_PORT}"

CMD ["node", "src/index.js"]

FROM node:22-alpine AS client

WORKDIR /web

COPY client/package.json client/package-lock.json ./

RUN npm ci

COPY client/src/ ./src/
COPY client/public/ ./public/

RUN npm run build

EXPOSE "3000"

CMD ["npm", "start"]

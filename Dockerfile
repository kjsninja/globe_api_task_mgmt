FROM node:22 AS base
WORKDIR /app
COPY . /app

FROM base AS prod
ENV NODE_ENV=production

FROM base AS test
COPY .env.test ./app/.env
ENV NODE_ENV=development
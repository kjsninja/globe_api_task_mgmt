FROM node:22 AS base
WORKDIR /app
COPY . /app

FROM base AS prod
ENV NODE_ENV=production

FROM base AS test
ENV NODE_ENV=development

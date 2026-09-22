# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install


FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_AD_SCRIPT_URLS
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_AD_SCRIPT_URLS=$NEXT_PUBLIC_AD_SCRIPT_URLS

RUN --mount=type=secret,id=tmdb_api_key \
  TMDB_API_KEY="$(cat /run/secrets/tmdb_api_key)" npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
  PORT=3000 \
  HOSTNAME="0.0.0.0"

RUN apk add --no-cache libc6-compat \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

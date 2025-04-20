FROM node:23-alpine AS builder

WORKDIR /usr/src/app


COPY . . 

RUN npm ci

ENV VITE_URL=http://localhost:8080/api
ENV VITE_WS_URL=ws://localhost:8080/api

RUN npm run build


FROM nginx:1.27.5-alpine-slim


COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
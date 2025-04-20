FROM node:23-alpine AS builder

WORKDIR /usr/src/app

ENV VITE_BACKEND_URL=http://localhost:8080/api

COPY . . 

RUN npm ci

# RUN with --target tester to run tests during build
FROM builder AS tester
RUN npm test


FROM builder AS production
RUN npm run build


FROM nginx:1.27.5-alpine-slim


COPY --from=production /usr/src/app/dist /usr/share/nginx/html

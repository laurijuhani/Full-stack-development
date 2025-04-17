FROM node:23-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --legacy-peer-deps --omit=dev

USER node

CMD [ "npm", "start" ]
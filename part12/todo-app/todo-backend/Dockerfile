FROM node:23-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

EXPOSE 3000

CMD [ "npm", "start" ]
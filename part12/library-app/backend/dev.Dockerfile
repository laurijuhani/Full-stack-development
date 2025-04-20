FROM node:23-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

CMD ["npm", "run", "dev", "--", "--host"]
FROM node:14-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN cd react-client && npm install && npm run build

EXPOSE 3000

CMD NODE_ENV=docker node server.js
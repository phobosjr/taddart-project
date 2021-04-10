FROM node:10

WORKDIR /app

ADD . /app/

RUN npm i -g npm
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 1337

CMD ["npm", "start"]

FROM node:14.16.1

WORKDIR /app
ADD . /app/
RUN npm i -g npm
RUN npm install --legacy-peer-deps
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]

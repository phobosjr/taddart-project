FROM node:10

WORKDIR /app
ADD . /app/
ARG BACKEND_URL
RUN npm i -g npm
RUN npm install
RUN NUXT_ENV_BACKEND_URL=${BACKEND_URL} npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]

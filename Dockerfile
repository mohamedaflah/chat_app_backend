FROM node:latest

WORKDIR /app

COPY ./ package*.json

COPY . .

RUN npm i

EXPOSE 4041

CMD npm run dev
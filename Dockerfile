FROM node:16-alpine as base

WORKDIR /app

COPY . .

RUN npm install --silent
RUN npm install react-scripts --location=global --silent

EXPOSE 3000

CMD ["npm", "start"]

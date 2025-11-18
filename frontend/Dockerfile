FROM node:20-slim AS base

RUN npm install -g npm@11.6.2

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

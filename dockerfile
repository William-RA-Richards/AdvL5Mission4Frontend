FROM node:23-alpine as build
WORKDIR /app
COPY package*.json ./

RUN npm install --silent
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev"]

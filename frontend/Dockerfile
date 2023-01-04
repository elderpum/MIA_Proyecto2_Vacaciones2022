FROM node:16
WORKDIR /src/index
COPY package.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "start"]
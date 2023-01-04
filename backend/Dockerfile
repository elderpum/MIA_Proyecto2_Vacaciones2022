FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install
EXPOSE 3200
COPY . .
CMD ["npm", "run", "start"]
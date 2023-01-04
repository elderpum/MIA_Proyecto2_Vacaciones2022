require("dotenv").config();
const fs = require("fs");
const path = require("path");

// First we need to clear all data in json files
// Clean users.json
fs.writeFileSync(
  path.resolve(__dirname, "../backend/database/users.json"),
  '{"users":[]}',
  "utf-8"
);
fs.writeFileSync(
  path.resolve(__dirname, "../backend/database/vuelos.json"),
  '{"vuelos":[]}',
  "utf-8"
);
fs.writeFileSync(
  path.resolve(__dirname, "../backend/database/autos.json"),
  '{"autos":[]}',
  "utf-8"
);

const Server = require("./models/server");

const server = new Server();

server.listen();

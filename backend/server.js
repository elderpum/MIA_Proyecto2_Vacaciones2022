require('dotenv').config()

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const database = JSON.parse(fs.readFileSync('db.json', 'utf-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

// Running server on port 3000
// Server use db.json routes like /users or /products for example
server.use(router)
server.listen(process.env.PORT ?? 3000, () =>{
    console.log('JSON Server is Running')
})
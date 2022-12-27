require('dotenv').config()

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const { json } = require('express')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const database = JSON.parse(fs.readFileSync('db.json', 'utf-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults())

// Check if the user exist in db
function isAunthenticated({username, email, password}) {
    return database.usuarios.findIndex(user => user.username === username && user.email === email && user.password === password) != -1
}

// Register New User
server.post('/api/usuarios', (req, res) => {
    console.log("Endpoint para registrar usuarios invocado; request body:")
    console.log(req.body)
    // Obtain data from post request
    const {id, name, username, correo, password, confirmPass, tipoUser} = req.body

    // Obtain base64 profile photo for s3 bucket
    const picture = req.files.fotoPerfil
    
    if (isAunthenticated({username, email, password}) == True) {
        return res.status(401).json({
            msg: 'Email/Username and Password already exist. Try again.'
        })
    }

    if (password != confirmPass) {
        return res.status(400).json({
            msg: 'Both password and confirmPass are not the same, try again.'
        })
    }

    // Time to upload file to s3 bucket with name username/profile.png
    const extension = picture.name.substring(picture.name.lastIndexOf('.'))
    const nombreArchivo = `${username.replace(/[^\w\s]/gi, '')}/profile${extension}`

    fs.readFile("db.json", (err, data) => {
        if (err) {
            return res.status(401).json({
                msg: err
            })
        }

        // Get current users data
        var data = JSON.parse(data.toString())

        // Get the id of last user
        var last_item_id = data.usuarios[data.usuarios.length-1].id

        // Add new user
        data.usuarios.push({
            "id": id,
            "name": name,
            "username": username,
            "fotoPerfil": nombreArchivo,
            "correo": correo,
            "password": password,
            "confirmPass": confirmPass,
            "tipoUser": tipoUser
        })
        var writeData = fs.writeFile("db.json", JSON.stringify(data), (err, result) => {
            if (err) {
                return res.status(401).json({
                    msg: err
                })
            }
        })
    })

})

// Running server on port 3000
// Server use db.json routes like /users or /products for example
server.use(router)
server.listen(process.env.PORT ?? 5000, () =>{
    console.log('JSON Server is Running')
})
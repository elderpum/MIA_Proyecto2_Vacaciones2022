require('dotenv').config();
const fs = require('fs')
const path = require('path')
const { response, request } = require('express')
const {uploadFile} = require('../helpers/awss3')

const createUser = async (req = request, res = response) => {
    const file = fs.readFileSync(path.resolve(__dirname, "../database/users.json"), 'utf-8');
    let jsonUsers = JSON.parse(file)
    const puerto = process.env.PORT
    console.log(puerto)
    
    // Get text params in request body
    const {id, name, username, email, password, confirmPass, tipoUser} = req.body

    // Now we need to get base64 image in order to upload to s3 bucket
    const picture = req.files.profilePhoto

    // Check if password and confirmPass aren't same
    if (password != confirmPass) {
        return res.status(400).json({
            msg: 'Both password and repeatedPassword are not the same, try again.'
        })
    }

    // Time to upload file to s3 bucket with name username/profile.png
    const extension = picture.name.substring(picture.name.lastIndexOf('.'))
    const nombreArchivo = `${username.replace(/[^\w\s]/gi, '')}/profile${extension}`


    // We need to open users.json and insert data in
    try {
        const {url: urlPerfil, nombre} = await uploadFile(nombreArchivo, picture.data)
        var newUser = {
            id: id,
            name: name,
            username: username,
            profilePhoto: urlPerfil,
            email: email,
            password: password,
            confirmPass: confirmPass,
            tipoUser: tipoUser
        }

        // Now we gotta push new user into json file
        jsonUsers.users.push(newUser)

        // Write new user in json file without losing any other data
        const new_json_users = JSON.stringify(jsonUsers)
        fs.writeFileSync(path.resolve(__dirname, "../database/users.json"), new_json_users, 'utf-8')

        return res.status(201).json({ 
            msg: 'Usuario creado con exito.',
            datos: newUser
        });

    } catch (error) {
        console.error(error.message || JSON.stringify(error));
        return res.status(401).json({
            msg: 'No se pudo guardar el nuevo usuario.',
            err: error.message || JSON.stringify(error)
        })
    }
}

module.exports = {
    createUser
}

const fs = require('fs')
const path = require('path')
const { response, request, json } = require('express')

// We need to create a function to get all values from a specific user using only his id
function getUser(idUsuario) {
    // Read users.json
    // If everything is ok this'll return True, if not return False
    const fileUsers = fs.readFileSync(path.resolve(__dirname, "../database/users.json"), 'utf-8')
    let jsonUsers = JSON.parse(fileUsers)
    return jsonUsers.users.id === idUsuario !==-1
}

const createAuto = async(req = request, res = response) => {
    // Read autos.json
    const fileAutos = fs.readFileSync(path.resolve(__dirname, "../database/autos.json"), 'utf-8')
    let jsonAutos = JSON.parse(fileAutos)

    // Obtain values from form-data
    const { idAuto, nombreAgencia, marca, modelo, precioAuto, ciudadOrigen, idUsuario } = req.body
    const rentaAprobada = "No"

    try {
        // Now we need to upload this information into users.json and viajes.json
        var newAuto = {
            idAuto: idAuto,
            nombreAgencia: nombreAgencia,
            marca: marca,
            modelo: modelo,
            precioAuto: precioAuto,
            ciudadOrigen: ciudadOrigen,
            rentaAprobada: rentaAprobada,
            idUsuario: idUsuario
        }

        if (getUser(idUsuario)) {
            // Now we register the same info in viajes.json
            jsonAutos.autos.push(newAuto)
            const new_json_autos = JSON.stringify(jsonAutos)
            fs.writeFileSync(path.resolve(__dirname, "../database/autos.json"), new_json_autos, 'utf-8')

            return res.status(201).json({ 
                msg: 'Automóvil creado con exito.',
                datos: newAuto
            });
        }
    } catch (error) {
        console.error(error.message || JSON.stringify(error));
        return res.status(401).json({
            msg: 'No se pudo guardar el nuevo viaje.',
            err: error.message || JSON.stringify(error)
        })
    }
}

const validateAuto = async(req = request, res = response) => {
    const { idAuto, idUsuario } = req.body
    // Read viajes.json
    const fileAutos = fs.readFileSync(path.resolve(__dirname, "../database/autos.json"), 'utf-8')
    let jsonAutos = JSON.parse(fileAutos)

    // Now we gonna bring all the data using this filter
    const result = jsonAutos.autos.filter(auto => auto.idUsuario === idUsuario && auto.idAuto === idAuto)
    console.log(result)
    const nombreAgencia = result[0].nombreAgencia
    const marca = result[0].marca
    const modelo = result[0].modelo
    const precioAuto = result[0].precioAuto
    const ciudadOrigen = result[0].ciudadOrigen
    // Here we gonna change the value to Yes in order to aprove the flying
    const rentaAprobada = "Si"

    try {
        var updateAuto = {
            idAuto: idAuto,
            nombreAgencia: nombreAgencia,
            marca: marca,
            modelo: modelo,
            precioAuto: precioAuto,
            ciudadOrigen: ciudadOrigen,
            rentaAprobada: rentaAprobada,
            idUsuario: idUsuario
        }

        jsonAutos.autos.splice(result, 1)
        jsonAutos.autos.push(updateAuto)
        const new_json_autos = JSON.stringify(jsonAutos)
        fs.writeFileSync(path.resolve(__dirname, "../database/autos.json"), new_json_autos, 'utf-8')
        return res.status(201).json({ 
            msg: 'Automóvil aprobado con exito.',
            datos: updateAuto
        });

    } catch (error) {
        console.error(error.message || JSON.stringify(error));
        return res.status(401).json({
            msg: 'No se pudo guardar el nuevo viaje.',
            err: error.message || JSON.stringify(error)
        })
    }
}

module.exports = {
    createAuto,
    validateAuto
}
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

const createViaje = async(req = request, res = response) => {
    // Read users.json
    const fileUsers = fs.readFileSync(path.resolve(__dirname, "../database/users.json"), 'utf-8')
    let jsonUsers = JSON.parse(fileUsers)

    // Read viajes.json
    const fileViajes = fs.readFileSync(path.resolve(__dirname, "../database/viajes.json"), 'utf-8')
    let jsonViajes = JSON.parse(fileViajes)

    // Obtain values from form-data
    const { idViaje, nombreAgencia, ciudadOrigen, ciudadDestino, diasVuelo, precioVuelo, idUsuario } = req.body
    const vueloAprobado = "No"

    try {
        // Now we need to upload this information into users.json and viajes.json
        var newViaje = {
            idViaje: idViaje,
            nombreAgencia: nombreAgencia,
            ciudadOrigen: ciudadOrigen,
            ciudadDestino: ciudadDestino,
            diasVuelo: diasVuelo,
            precioVuelo: precioVuelo,
            vueloAprobado: vueloAprobado,
            idUsuario: idUsuario
        }

        if (getUser(idUsuario)) {
            // Now we register the same info in viajes.json
            jsonViajes.viajes.push(newViaje)
            const new_json_viajes = JSON.stringify(jsonViajes)
            fs.writeFileSync(path.resolve(__dirname, "../database/viajes.json"), new_json_viajes, 'utf-8')

            return res.status(201).json({ 
                msg: 'Viaje creado con exito.',
                datos: newViaje
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


const validateViaje = async(req = request, res = response) => {
    const { idViaje, idUsuario } = req.body
    // Read viajes.json
    const fileViajes = fs.readFileSync(path.resolve(__dirname, "../database/viajes.json"), 'utf-8')
    let jsonViajes = JSON.parse(fileViajes)

    // Now we gonna bring all the data using this filter
    const result = jsonViajes.viajes.filter(viaje => viaje.idUsuario === idUsuario && viaje.idViaje === idViaje)
    console.log(result)
    const nombreAgencia = result[0].nombreAgencia
    const ciudadOrigen = result[0].ciudadOrigen
    const ciudadDestino = result[0].ciudadDestino
    const diasVuelo = result[0].diasVuelo
    const precioVuelo = result[0].precioVuelo
    // Here we gonna change the value to Yes in order to aprove the flying
    const vueloAprobado = "Si"

    try {
        var updateViaje = {
            idViaje: idViaje,
            nombreAgencia: nombreAgencia,
            ciudadOrigen: ciudadOrigen,
            ciudadDestino: ciudadDestino,
            diasVuelo: diasVuelo,
            precioVuelo: precioVuelo,
            vueloAprobado: vueloAprobado,
            idUsuario: idUsuario
        }

        jsonViajes.viajes.splice(result, 1)
        jsonViajes.viajes.push(updateViaje)
        const new_json_viajes = JSON.stringify(jsonViajes)
        fs.writeFileSync(path.resolve(__dirname, "../database/viajes.json"), new_json_viajes, 'utf-8')
        return res.status(201).json({ 
            msg: 'Viaje aprobado con exito.',
            datos: updateViaje
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
    createViaje,
    validateViaje
}
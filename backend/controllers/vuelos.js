const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { response, request} = require("express");

// We need to create a function to get all values from a specific user using only his id
function getUser(idUsuario) {
  // Read users.json
  // If everything is ok this'll return True, if not return False
  const fileUsers = fs.readFileSync(
    path.resolve(__dirname, "../database/users.json"),
    "utf-8"
  );
  let jsonUsers = JSON.parse(fileUsers);
  return (jsonUsers.users.id === idUsuario) !== -1;
}

const createVuelo = async (req = request, res = response) => {
  // Read viajes.json
  const fileVuelos = fs.readFileSync(
    path.resolve(__dirname, "../database/vuelos.json"),
    "utf-8"
  );
  let jsonVuelos = JSON.parse(fileVuelos);

  // Obtain values from form-data
  const {
    nombreAgencia,
    ciudadOrigen,
    ciudadDestino,
    diasVuelo,
    precioVuelo,
    idUsuario,
  } = req.body;
  const vueloAprobado = "Pendiente";

  try {
    // Now we need to upload this information into users.json and viajes.json
    var newVuelo = {
      idVuelo: uuidv4(),
      nombreAgencia: nombreAgencia,
      ciudadOrigen: ciudadOrigen,
      ciudadDestino: ciudadDestino,
      diasVuelo: diasVuelo,
      precioVuelo: precioVuelo,
      idUsuario: idUsuario,
      vueloAprobado: vueloAprobado,
    };

    if (getUser(idUsuario)) {
      // Now we register the same info in viajes.json
      jsonVuelos.vuelos.push(newVuelo);
      const new_json_vuelos = JSON.stringify(jsonVuelos);
      fs.writeFileSync(
        path.resolve(__dirname, "../database/vuelos.json"),
        new_json_vuelos,
        "utf-8"
      );

      return res.status(201).json({
        msg: "Vuelo creado con exito.",
        datos: newVuelo,
      });
    }
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo guardar el nuevo vuelo.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const validateVuelo = async (req = request, res = response) => {
  const { idVuelo, idUsuario, vueloAprobado } = req.body;
  // Read viajes.json
  const fileVuelo = fs.readFileSync(
    path.resolve(__dirname, "../database/vuelos.json"),
    "utf-8"
  );
  let jsonVuelos = JSON.parse(fileVuelo);

  // Now we gonna bring all the data using this filter
  const result = jsonVuelos.vuelos.filter(
    (vuelo) => vuelo.idUsuario === idUsuario && vuelo.idVuelo === idVuelo
  );
  console.log(result);
  const nombreAgencia = result[0].nombreAgencia;
  const ciudadOrigen = result[0].ciudadOrigen;
  const ciudadDestino = result[0].ciudadDestino;
  const diasVuelo = result[0].diasVuelo;
  const precioVuelo = result[0].precioVuelo;

  try {
    var updateVuelo = {
      idVuelo: idVuelo,
      nombreAgencia: nombreAgencia,
      ciudadOrigen: ciudadOrigen,
      ciudadDestino: ciudadDestino,
      diasVuelo: diasVuelo,
      precioVuelo: precioVuelo,
      vueloAprobado: vueloAprobado,
      idUsuario: idUsuario,
    };

    jsonVuelos.vuelos.splice(result, 1);
    jsonVuelos.vuelos.push(updateVuelo);
    const new_json_vuelos = JSON.stringify(jsonVuelos);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/vuelos.json"),
      new_json_vuelos,
      "utf-8"
    );
    return res.status(201).json({
      msg: "Vuelo aprobado/rechazado con exito.",
      datos: updateVuelo,
    });
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo guardar el nuevo vuelo.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const deleteVuelo = async (req = request, res = response) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "../database/vuelos.json"),
    "utf-8"
  );
  let jsonVuelos = JSON.parse(file);

  // We need to delete users, only using his id
  const {idVuelo} = req.body;

  try {
    // Obtain all user's data
    const result = jsonVuelos.vuelos.filter((vuelo) => vuelo.idVuelo === idVuelo);
    // Now we gonna delete this user and rewrite json file
    jsonVuelos.vuelos.pop(result);
    const new_json_vuelos = JSON.stringify(jsonVuelos);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/vuelos.json"),
      new_json_vuelos,
      "utf-8"
    );
    return res.status(201).json({
      msg: "Vuelo eliminado con éxito.",
      datos: result[0],
    });
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo eliminar el vuelo.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const getVuelos = async (req = request, res = response) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "../database/vuelos.json"),
    "utf-8"
  );
  let jsonVuelos = JSON.parse(file);

  try {
    return res.status(201).json({
      data: jsonVuelos.vuelos
    });
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No hay vuelos",
      err: error.message || JSON.stringify(error),
    });
  }
};

module.exports = {
  createVuelo,
  validateVuelo,
  deleteVuelo,
  getVuelos
};

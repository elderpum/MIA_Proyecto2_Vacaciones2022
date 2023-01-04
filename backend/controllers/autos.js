const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { response, request, json } = require("express");

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

const createAuto = async (req = request, res = response) => {
  // Read autos.json
  const fileAutos = fs.readFileSync(
    path.resolve(__dirname, "../database/autos.json"),
    "utf-8"
  );
  let jsonAutos = JSON.parse(fileAutos);

  // Obtain values from form-data
  const { nombreAgencia, marca, modelo, precioAuto, ciudadOrigen, idUsuario } =
    req.body;
  const rentaAprobada = "Pendiente";

  try {
    // Now we need to upload this information into users.json and viajes.json
    var newAuto = {
      idAuto: uuidv4(),
      nombreAgencia: nombreAgencia,
      marca: marca,
      modelo: modelo,
      precioAuto: precioAuto,
      ciudadOrigen: ciudadOrigen,
      idUsuario: idUsuario,
      rentaAprobada: rentaAprobada,
    };

    if (getUser(idUsuario)) {
      // Now we register the same info in viajes.json
      jsonAutos.autos.push(newAuto);
      const new_json_autos = JSON.stringify(jsonAutos);
      fs.writeFileSync(
        path.resolve(__dirname, "../database/autos.json"),
        new_json_autos,
        "utf-8"
      );

      return res.status(201).json({
        msg: "Automóvil creado con exito.",
        datos: newAuto,
      });
    }
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo guardar el nuevo automóvil.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const validateAuto = async (req = request, res = response) => {
  const { idAuto, idUsuario, rentaAprobada } = req.body;
  // Read viajes.json
  const fileAutos = fs.readFileSync(
    path.resolve(__dirname, "../database/autos.json"),
    "utf-8"
  );
  let jsonAutos = JSON.parse(fileAutos);

  // Now we gonna bring all the data using this filter
  const result = jsonAutos.autos.filter(
    (auto) => auto.idUsuario === idUsuario && auto.idAuto === idAuto
  );

  const nombreAgencia = result[0].nombreAgencia;
  const marca = result[0].marca;
  const modelo = result[0].modelo;
  const precioAuto = result[0].precioAuto;
  const ciudadOrigen = result[0].ciudadOrigen;

  try {
    var updateAuto = {
      idAuto: idAuto,
      nombreAgencia: nombreAgencia,
      marca: marca,
      modelo: modelo,
      precioAuto: precioAuto,
      ciudadOrigen: ciudadOrigen,
      rentaAprobada: rentaAprobada,
      idUsuario: idUsuario,
    };

    jsonAutos.autos.splice(result, 1);
    jsonAutos.autos.push(updateAuto);
    const new_json_autos = JSON.stringify(jsonAutos);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/autos.json"),
      new_json_autos,
      "utf-8"
    );
    return res.status(201).json({
      msg: "Automóvil aprobado/rechazado con exito.",
      datos: updateAuto,
    });
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo modificar el automóvil.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const deleteAuto = async (req = reques, res = response) => {
  // Read viajes.json
  const fileAutos = fs.readFileSync(
    path.resolve(__dirname, "../database/autos.json"),
    "utf-8"
  );
  let jsonAutos = JSON.parse(fileAutos);

  const { idAuto } = req.body;

  try {
    const result = jsonAutos.autos.filter((auto) => auto.idAuto === idAuto);
    jsonAutos.autos.pop(result);
    const new_json_autos = JSON.stringify(jsonAutos);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/autos.json"),
      new_json_autos,
      "utf-8"
    );
    return res.status(201).json({
      msg: "Auto eliminado con éxito.",
      datos: result[0],
    });
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo eliminar el auto.",
      err: error.message || JSON.stringify(error),
    });
  }
};

const getAutos = async(req = request, res = response) => {
  const fileAutos = fs.readFileSync(
    path.resolve(__dirname, "../database/autos.json"),
    "utf-8"
  );
  let jsonAutos = JSON.parse(fileAutos);

  try {
    return res.status(201).json({
      data: jsonAutos.autos,
    })
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No hay autos",
      err: error.message || JSON.stringify(error),
    });
  }
}

module.exports = {
  createAuto,
  validateAuto,
  deleteAuto,
  getAutos
};

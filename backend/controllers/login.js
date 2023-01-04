require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {
  CognitoUser,
  AuthenticationDetails,
} = require("amazon-cognito-identity-js");
const { response, request } = require("express");

// We need to create a function to get all values from a specific user using his username and his password
function getUser(username, password) {
  // Read users.json
  // If everything is ok this'll return True, if not return False
  const fileUsers = fs.readFileSync(
    path.resolve(__dirname, "../database/users.json"),
    "utf-8"
  );
  let jsonUsers = JSON.parse(fileUsers);
  return (
    jsonUsers.users.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  // First we need to manage if the user is admin or not
  const useradmin = process.env.USERNAME;
  const passadmin = process.env.PASSWORD;

  if (username == useradmin && password == passadmin) {
    console.log(
      "Se esta logueando el usuario administrador que esta en el env"
    );
    return res.status(201).json({
      msg: "Login del admin completado.",
    });
  }

  // If this true, user exist in users.json and execute login correctly
  try {
    if (getUser(username, password)) {
      return res.status(201).json({
        msg: "Usuario logueado con exito.",
      });
    }
  } catch (error) {
    console.error(error.message || JSON.stringify(error));
    return res.status(401).json({
      msg: "No se pudo guardar el nuevo usuario.",
      err: error.message || JSON.stringify(error),
    });
  }
};

module.exports = {
  login,
};

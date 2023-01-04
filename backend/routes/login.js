const { Router } = require("express");
const { check, param } = require("express-validator");

const { login } = require("../controllers/login");

const validateAtributes = require("../middlewares/validate-attributes");

const router = Router();

router.post(
  "/",
  [
    check("username", "Se necesita el nombre de usuario").notEmpty(),
    check("password", "Se necesita la contraseña del usuario").notEmpty(),
    validateAtributes,
  ],
  login
);

module.exports = router;

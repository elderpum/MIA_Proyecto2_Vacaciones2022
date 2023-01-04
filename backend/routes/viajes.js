const { Router } = require("express");
const { check, param } = require("express-validator");

const { createViaje, validateViaje, deleteViaje } = require("../controllers/viajes");

const validateAtributes = require("../middlewares/validate-attributes");

const router = Router();

router.post(
  "/",
  [
    check("nombreAgencia", "Se necesita el nombre de la agencia").notEmpty(),
    check("ciudadOrigen", "Se necesita la ciudad de origen").notEmpty(),
    check("ciudadDestino", "Se necesita la ciudad de destino").notEmpty(),
    check("diasVuelo", "Se necesita el dia del vuelo").notEmpty(),
    check("precioVuelo", "Se necesita el precio del vuelo").notEmpty(),
    validateAtributes,
  ],
  createViaje
);

router.put(
  "/confirm/",
  [
    check("idViaje", "idViaje is mandatory.").not().isEmpty(),
    check("idUsuario", "idUsuario is mandatory.").not().isEmpty(),
    validateAtributes,
  ],
  validateViaje
);

router.delete(
  "/",
  [
    check("idViaje", "Se necesita el id del viaje asociado").not().isEmpty(),
    validateAtributes,
  ],
  deleteUser
);

module.exports = router;

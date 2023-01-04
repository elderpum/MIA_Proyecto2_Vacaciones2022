const { Router } = require("express");
const { check, param } = require("express-validator");

const { createVuelo, validateVuelo, deleteVuelo, getVuelos } = require("../controllers/vuelos");

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
  createVuelo
);

router.put(
  "/confirm/",
  [
    check("idVuelo", "idViaje is mandatory.").not().isEmpty(),
    check("idUsuario", "idUsuario is mandatory.").not().isEmpty(),
    check("vueloAprobado", "vueloAprobado is mandatory.").not().isEmpty(),
    validateAtributes,
  ],
  validateVuelo
);

router.delete(
  "/",
  [
    check("idVuelo", "Se necesita el id del vuelo asociado").not().isEmpty(),
    validateAtributes,
  ],
  deleteVuelo
);

router.get("/", getVuelos);

module.exports = router;

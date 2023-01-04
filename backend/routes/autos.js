const { Router } = require("express");
const { check, param } = require("express-validator");

const { createAuto, validateAuto, deleteAuto, getAutos } = require("../controllers/autos");

const validateAtributes = require("../middlewares/validate-attributes");

const router = Router();

router.post(
  "/",
  [
    check("nombreAgencia", "Se necesita el nombre de la agencia").notEmpty(),
    check("marca", "Se necesita la marca del automóvil").notEmpty(),
    check("modelo", "Se necesita el modelo del automóvil").notEmpty(),
    check("precioAuto", "Se necesita el precio del automóvil").notEmpty(),
    check(
      "ciudadOrigen",
      "Se necesita la ciudad de origen del automóvil"
    ).notEmpty(),
    validateAtributes,
  ],
  createAuto
);

router.put(
  "/confirm/",
  [
    check("idAuto", "idAuto is mandatory.").not().isEmpty(),
    check("idUsuario", "idUsuario is mandatory.").not().isEmpty(),
    check("rentaAprobada", "rentaAprobada is mandatory.").not().isEmpty(),
    validateAtributes,
  ],
  validateAuto
);

router.delete(
  "/",
  [
    check("idAuto", "Se necesita el id del auto asociado").not().isEmpty(),
    validateAtributes,
  ],
  deleteAuto
);

router.get("/", getAutos);

module.exports = router;

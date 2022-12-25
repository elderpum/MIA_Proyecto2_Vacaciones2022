

const validateJWT = require('./validate-jwt');
const validateAtributes = require('./validate-attributes');
const validateRoles = require('./validate-roles');


module.exports = {
    validateAtributes,
    ...validateJWT,
    ...validateRoles
}



const { Router } = require('express')
const { check } = require('express-validator');



const { login, googleSignIn } = require('../controllers/auth');
const validateAtributes = require('../middlewares/validate-attributes');

const router = Router();

router.post('/login', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateAtributes
],
login);

router.post('/google', [
    check('id_token', 'id_token is mandatory').not().isEmpty(),
    validateAtributes
],
googleSignIn);

module.exports = router; 
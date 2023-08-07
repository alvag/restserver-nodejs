const { Router } = require( 'express' );
const router = Router();
const loginController = require( '../controllers/login.controller' );
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

router.post(
    '/login',
    [
        check('password', 'El password es obligatorio'),
        check('email', 'El correo es obligarorio').isEmail(),
        validateFields,
    ],
    loginController.login
);
router.post( '/login/google', loginController.google );

module.exports = router;

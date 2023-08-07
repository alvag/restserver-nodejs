const { Router } = require( 'express' );
const router = Router();
const userController = require( '../controllers/user.controller' );
const auth = require( '../middlewares/auth' );
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
    isValidRole,
    emailExists,
    idExists,
} = require('../helpers/db-validators.helper');

router.get('/usuario', [auth.isAuth], userController.get);
router.get(
    '/usuario/:id',
    [
        auth.isAuth,
        check('id', 'No es un ID válido').isMongoId(),
        validateFields,
    ],
    userController.get
);
router.get('/verificar/:id', userController.verificar);
router.post(
    '/usuario',
    [
        auth.isAuth,
        auth.isAdmin,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check(
            'password',
            'El password debe de ser mas de 6 caracteres'
        ).isLength({ min: 6 }),
        check('email', 'El correo no es válido').isEmail(),
        check('role').custom(isValidRole),
        check('email').custom(emailExists),
        validateFields,
    ],
    userController.create
);
router.put(
    '/usuario/:id',
    [
        auth.isAuth,
        auth.isAdmin,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(idExists),
        validateFields,
    ],
    userController.update
);
router.delete(
    '/usuario/:id',
    [
        auth.isAuth,
        auth.isAdmin,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(idExists),
        validateFields,
    ],
    userController.del
);

module.exports = router;

const { Router } = require( 'express' );
const router = Router();
const loginController = require( '../controllers/login.controller' );

router.post('/login', loginController.login);
router.post( '/login/google', loginController.google );

module.exports = router;

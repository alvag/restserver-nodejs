const { Router } = require( 'express' );
const router = Router();
const userController = require( '../controllers/user.controller' );
const auth = require( '../middlewares/auth' );

router.get( '/usuario', auth.isAuth, userController.get );
router.get( '/usuario/:id', auth.isAuth, userController.get );
router.get( '/verificar/:id', userController.verificar );
router.post( '/usuario', [ auth.isAuth, auth.isAdmin ], userController.create );
router.put( '/usuario/:id', [ auth.isAuth, auth.isAdmin ], userController.update );
router.delete( '/usuario/:id', [ auth.isAuth, auth.isAdmin ], userController.del );

module.exports = router;

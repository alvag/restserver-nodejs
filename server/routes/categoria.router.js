const { Router } = require( 'express' );
const router = Router();
const auth = require( '../middlewares/auth' );
const categoriaController = require( '../controllers/categoria.controller' );

router.get( '/categoria/:id?', auth.isAuth, categoriaController.get );
router.post( '/categoria/', auth.isAuth, categoriaController.create );
router.put( '/categoria/:id', auth.isAuth, categoriaController.update );
router.delete( '/categoria/:id', [ auth.isAuth, auth.isAdmin ], categoriaController.del );

module.exports = router;

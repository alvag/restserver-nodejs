const { Router } = require( 'express' );
const router = Router();
const auth = require('../middlewares/auth');
const productoController = require('../controllers/producto.controller');

router.get('/producto/:id?', auth.isAuth, productoController.get);
router.get('/producto/buscar/:q?', auth.isAuth, productoController.search);
router.post('/producto/', auth.isAuth, productoController.create);
router.put('/producto/:id', auth.isAuth, productoController.update);
router.delete('/producto/:id', [auth.isAuth, auth.isAdmin], productoController.del);

module.exports = router;

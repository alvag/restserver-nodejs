const { Router } = require( 'express' );
const router = Router();


router.use(require('./user.router'));
router.use(require('./login.router'));
router.use(require('./categoria.router'));
router.use(require('./producto.router'));
router.use(require('./upload.router'));
router.use(require('./img.router'));

module.exports = router;

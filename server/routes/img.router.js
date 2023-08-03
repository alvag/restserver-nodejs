const { Router } = require( 'express' );
const router = Router();
const imgCtrl = require('../controllers/img.controller');
const auth = require('../middlewares/auth');

router.get('/img/:tipo/:fileName', auth.checkTokenImg, imgCtrl.get);

module.exports = router;

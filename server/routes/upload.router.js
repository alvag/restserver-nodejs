const { Router } = require( 'express' );
const router = Router();
const auth = require('../middlewares/auth');



const uploadController = require('../controllers/upload.controller');

router.put('/upload/:tipo/:id', auth.isAuth, uploadController.upload);

module.exports = router;

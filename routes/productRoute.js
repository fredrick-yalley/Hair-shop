const router = require('express').Router();
const uploadCont = require('../Controllers/productController');
const viewsController = require('../Controllers/viewsController');

const storage = require('../lib/multer');



// router.post('/uploadVideo', storage.single('file'), uploadCont.uploadVideo);
router.post('/createProduct', storage.single('file'), uploadCont.createProduct);

module.exports = router;

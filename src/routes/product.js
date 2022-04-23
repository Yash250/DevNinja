const { Router } = require('express');
const { createProduct, getProduct, getProductDetail, uploadProductImage } = require('../controllers/product');
const { paramsValidator } = require('../middleware/paramsValidator');
const { uploadFile } = require('../middleware/upload');
const { verifyRole } = require('../middleware/verifyRole');
const { verifyUser } = require('../middleware/verifyUser');
const { getProducts } = require('./validation');
const router = Router();

router.route('/create').post(verifyUser, createProduct);
router.route('/').get(paramsValidator(getProducts, true, true) ,getProduct);
router.route('/:id').get(getProductDetail);
router.route('/upload').post(verifyRole, uploadFile.single("file") , uploadProductImage);

module.exports = router;

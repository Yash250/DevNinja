const { Router } = require('express');
const { createProduct, getProduct, getProductDetail, uploadProductImage, updateProduct, deleteProduct } = require('../controllers/product');
const { paramsValidator } = require('../middleware/paramsValidator');
const { uploadFile } = require('../middleware/upload');
const { verifyRole } = require('../middleware/verifyRole');
const { verifyUser } = require('../middleware/verifyUser');
const { getProducts, updateProducts } = require('./validation');
const router = Router();

router.route('/create').post(verifyRole, createProduct);
router.route('/').get(paramsValidator(getProducts, true, true) ,getProduct);
router.route('/:id').put(verifyRole, paramsValidator(updateProducts, null, true) , updateProduct);
router.route('/:id').delete(verifyRole , deleteProduct);
router.route('/:id').get(getProductDetail);
router.route('/upload').post(verifyRole, uploadFile.single("file") , uploadProductImage);

module.exports = router;

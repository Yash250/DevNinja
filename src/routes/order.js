const { Router } = require('express');
const { createOrder, getOrder, getProductDetail, uploadProductImage, updateProduct, deleteProduct } = require('../controllers/order');
const { paramsValidator } = require('../middleware/paramsValidator');
const { uploadFile } = require('../middleware/upload');
const { verifyRole } = require('../middleware/verifyRole');
const { verifyUser } = require('../middleware/verifyUser');
const { getProducts, updateProducts } = require('./validation');
const router = Router();

router.route('/create').post(verifyRole, createOrder);
router.route('/').post(verifyUser,getOrder);
router.route('/:id').put(verifyRole, paramsValidator(updateProducts, null, true), updateProduct);
router.route('/:id').delete(verifyRole, deleteProduct);
// router.route('/:id').get(getProductDetail);
router.route('/upload').post(verifyRole, uploadFile.single("file"), uploadProductImage);

module.exports = router;

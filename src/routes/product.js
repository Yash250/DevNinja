const { Router } = require('express');
const { createProduct, getProduct, getProductDetail } = require('../controllers/product');
const { paramsValidator } = require('../middleware/paramsValidator');
const { verifyUser } = require('../middleware/verifyUser');
const { getProducts } = require('./validation');
const router = Router();

router.route('/create').post(verifyUser, createProduct);
router.route('/').get(paramsValidator(getProducts, true, true) ,getProduct);
router.route('/:id').get(getProductDetail);



module.exports = router;

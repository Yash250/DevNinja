const { Router } = require('express');
const { createProduct, getProduct } = require('../controllers/product');
const { paramsValidator } = require('../middleware/paramsValidator');
const { getProducts } = require('./validation');
const router = Router();

router.route('/create').post(createProduct);
router.route('/').get(paramsValidator(getProducts, true) ,getProduct);


module.exports = router;

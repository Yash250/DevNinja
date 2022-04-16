const { Router } = require('express');
const { createProduct, getProduct } = require('../controllers/product');
const { paramsValidator } = require('../middleware/paramsValidator');
const { verifyUser } = require('../middleware/verifyUser');
const { getProducts } = require('./validation');
const router = Router();

router.route('/create').post(verifyUser, createProduct);
router.route('/').get(paramsValidator(getProducts, true, true) ,getProduct);


module.exports = router;

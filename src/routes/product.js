const { Router } = require('express');
const { createProduct, getProduct } = require('../controllers/product');
const router = Router();

router.route('/create').post(createProduct);
router.route('/').get(getProduct);


module.exports = router;

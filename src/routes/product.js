const { Router } = require('express');
const { createProduct, findAllProducts, findProductById, updateProductById, deleteProductById } = require('../controllers/product.controller');
const router = Router();

router.route('/').get(findAllProducts).post(createProduct);
router
  .route('/:id')
  .get(findProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

module.exports = router;

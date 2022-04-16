const { Router } = require('express');
const { registerUser, loginUser, addToCart } = require('../controllers/users');
const { paramsValidator } = require('../middleware/paramsValidator');
const { verifyUser } = require('../middleware/verifyUser');
const { createUser, loginUsers, cartUser } = require('./validation');
const router = Router();

router.route('/create').post(paramsValidator(createUser) , registerUser);
router.route('/login').post(paramsValidator(loginUsers) , loginUser);
router.route('/add-to-cart').post( verifyUser,paramsValidator(cartUser) , addToCart);


module.exports = router;

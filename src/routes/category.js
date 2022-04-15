const { Router } = require('express');
const { createCategory, getCategory } = require('../controllers/category');
const { paramsValidator } = require('../middleware/paramsValidator');
const { createUser, loginUsers } = require('./validation');
const router = Router();

router.route('/create').post(createCategory);
router.route('/').get(getCategory);
// router.route('/login').post(paramsValidator(loginUsers) , loginUser);


module.exports = router;

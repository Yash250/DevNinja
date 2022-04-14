const { Router } = require('express');
const { registerUser, loginUser } = require('../controllers/users');
const { paramsValidator } = require('../middleware/paramsValidator');
const { createUser, loginUsers } = require('./validation');
const router = Router();

router.route('/create').post(paramsValidator(createUser) , registerUser);
router.route('/login').post(paramsValidator(loginUsers) , loginUser);


module.exports = router;

const { Router } = require('express');
const { createBanners, getBanners } = require('../controllers/banner');
const router = Router();

router.route('/create').post(createBanners);
router.route('/').get(getBanners);


module.exports = router;

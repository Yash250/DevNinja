const { Router } = require('express');
const { createBanners, getBanners, deleteBanners } = require('../controllers/banner');
const { verifyRole } = require('../middleware/verifyRole');
const router = Router();

router.route('/create').post(verifyRole, createBanners);
router.route('/').get(getBanners);
router.route('/:id').delete(verifyRole, deleteBanners);



module.exports = router;

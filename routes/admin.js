const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getProduct);
router.get('/add-product', adminController.getAddProduct);
router.get('/edit-product/:productID', adminController.getEditProduct);
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
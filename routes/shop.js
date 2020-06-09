const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);
router.get('/details/:productID', shopController.getDetailProduct);
router.get('/cart',shopController.getProductCart);
router.get('/orders', shopController.getOrderItems);

router.post('/add-cart/:productID', shopController.postCart);
router.post('/delete-cart-product/:productID', shopController.postDeleteCartItem);
router.post('/create-order', shopController.postOrder);

module.exports = router;
const express = require('express');
const auth = require('../middleware/auth');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);
router.get('/details/:productID', shopController.getDetailProduct);
router.get('/cart', auth.isAuthenticated ,shopController.getProductCart);
router.get('/orders', auth.isAuthenticated, shopController.getOrderItems);

router.post('/add-cart/:productID', auth.isAuthenticated, shopController.postCart);
router.post('/delete-cart-product/:productID', auth.isAuthenticated, shopController.postDeleteCartItem);
router.post('/create-order', auth.isAuthenticated, shopController.postOrder);

module.exports = router;
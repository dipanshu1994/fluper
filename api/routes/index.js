const express = require('express');
const router = express.Router();
const Product = require('../service/product');
const User = require('../service/user');
const Auth = require('../middleware/auth');

router.post('/authenticate-user', User.authenticateUser);
router.get('/show-products',Auth.checkAuth, Product.showProducts);
router.post('/product/insert-product',Product.insertProduct);
router.post('/product/liked-unliked-product',Auth.checkAuth,User.likedAndUnlikedProduct);
router.get('/user/liked-wishlist-product',Auth.checkAuth,User.likedWishListProduct);


module.exports = router;

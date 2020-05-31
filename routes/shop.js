const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('user/products.ejs', {pageTitle: "Home"});
});

module.exports = router;
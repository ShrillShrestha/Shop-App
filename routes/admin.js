const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('admin/products.ejs', {pageTitle: 'Products'});
});

module.exports = router;
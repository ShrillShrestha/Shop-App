const Product = require('../models/product');

exports.getProducts =(req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('products', {
            pageTitle: 'Products',
            prods:products,
            path: '/',
            admin: false
        });
    });
}
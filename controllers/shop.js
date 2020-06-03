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

exports.getDetailProduct = (req, res, next)=>{
    Product.findById(req.params.productID, (prod)=>{
        if(prod){
            console.log(prod);
            res.render('shop/product-detail', {pageTitle: prod.title, product: prod, admin: false})
        }else{
            res.redirect('/');
        }
    })
}
const Product = require('../models/product');

exports.getProducts =(req, res, next)=>{
    Product.findAll()
    .then((products)=>{
        res.render('products', {
            pageTitle: 'Products',
            prods:products,
            path: '/',
            admin: false
        });
    })
    .catch((err)=>{
        console.log(err);
    });
}

exports.getDetailProduct = (req, res, next)=>{
    Product.findByPk(req.params.productID)
    .then((prod)=>{
        if(prod){
            console.log(prod);
            res.render('shop/product-detail', {pageTitle: prod.title, product: prod, admin: false})
        }else{
            res.redirect('/');
        }
    })
    .catch((err)=>{
        console.log(err);
    });
}
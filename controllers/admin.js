const Product = require('../models/product');

exports.getProduct = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products', {pageTitle: "Products-Admin", prods: products});
    })
}

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/add-product', {pageTitle: "Add Product"});
}

exports.postAddProduct = (req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, price, description);
    product.save(()=>{
        res.redirect('/');
    });
}
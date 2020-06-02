const Product = require('../models/product');

exports.getProduct = (req, res, next)=>{
    Product.fetchAll((products)=>{
        res.render('products', {
            pageTitle: "Products-Admin",
            prods: products,
            path: '/admin',
            admin: req.query.admin
            });
    })
}

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/add-product', {
        pageTitle: "Add Product", 
        editing: false,
        admin: req.query.admin
    });
}

exports.postAddProduct = (req, res, next)=>{
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(id, title, imageUrl, price, description);
    product.save(()=>{ 
        res.redirect('/');
    });
}

exports.getEditProduct = (req, res, next) =>{
    const productID = req.params.productID;
    Product.findById(productID, (prod)=>{
        if(!prod){
            res.redirect('/');
        }else{
        res.render('admin/add-product', {
            pageTitle: 'Edit Product', 
            editing: true, 
            product: prod,
            admin: req.query.admin
        });
        }
    });
}
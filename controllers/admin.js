const Product = require('../models/product');

exports.getProduct = (req, res, next)=>{
    Product.findAll()
    .then((products)=>{
        res.render('products', {
            pageTitle: "Products-Admin",
            prods: products,
            path: '/admin',
            admin: req.query.admin
            });
    })
    .catch((err)=>{
        console.log(err);
    });
}

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/add-product', {
        pageTitle: "Add Product", 
        editing: false,
        admin: req.query.admin
    });
}

exports.postAddProduct = (req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then((result)=>{
        res.redirect('/admin?admin=true');
    }).catch((err)=>{
        console.log(err);
    });
}

exports.getEditProduct = (req, res, next) =>{
    const productID = req.params.productID;
    Product.findByPk(productID)
    .then((prod)=>{
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
    })
    .catch((err)=>{
        console.log(err)
    });
}
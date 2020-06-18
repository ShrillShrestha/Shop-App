const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts =(req, res, next)=>{
    Product.find()
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
};

exports.getDetailProduct = (req, res, next)=>{
    Product.findById(req.params.productID)
    .then((prod)=>{
        if(prod){
            res.render('shop/product-detail', {
                pageTitle: prod.title,
                product: prod,
                admin: false
            });
        }else{
            res.redirect('/');
        }
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.getProductCart = (req, res, next)=>{
    req.user.
    populate('cart.items.productId')
    .execPopulate()
    .then((usr)=>{
        prods = usr.cart.items;
        const prodList = prods.filter(p=>{
            return p.productId != null;
        });
        return req.user.updateCart(prodList);
    })
    .then((user)=>{
        products = user.cart.items;
        res.render('shop/cart',{
            pageTitle: 'Cart',
            prods: products,
            admin: false
        });
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.postCart = (req, res, next)=>{
    Product.findById(req.params.productID)
    .then(product=>{
        return req.user.addToCart(product);
    })
    .then(result=>{
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.postDeleteCartItem = (req, res, next) =>{
    req.user.removeCartItem(req.params.productID)
    .then((result)=>{
        res.redirect('/cart');
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.getOrderItems = (req, res, next) => {
    Order.find({"user.userId" : req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        admin:false
      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user.
    populate('cart.items.productId')
    .execPopulate()
    .then((user)=>{
        const prods = user.cart.items.map(i=>{
            return {quantity: i.quantity, product: {...i.productId._doc}};
        });
        const order = new Order({
            user:{
                name: req.user.name,
                userId: req.user
            },
            products: prods
        });
        return order.save();
    })
    .then(order=>{
        return req.user.clearCart();
    })
    .then(result=>{
        res.redirect('/orders');
    })
    .catch((err)=>{
        console.log(err);
    });
};
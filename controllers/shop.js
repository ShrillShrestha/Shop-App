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
};

exports.getDetailProduct = (req, res, next)=>{
    Product.findByPk(req.params.productID)
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
    req.user.getCart()
    .then((cart)=>{
        return cart.getProducts();
    })
    .then((products)=>{
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
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then((cart)=>{
        fetchedCart = cart;
        return cart.getProducts({where: {id : req.params.productID}});
    })
    .then(products=>{
        let product;
        if(products.length > 0){
            product = products[0];
        }
        if(product){
            newQuantity = product.cartItem.quantity + 1;
            return product;
        }

        return Product.findByPk(req.params.productID);
    })
    .then((product)=>{
        return fetchedCart.addProduct(product, {
            through : {quantity : newQuantity}
        });
    })
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{

    });
};

exports.postDeleteCartItem = (req, res, next) =>{
    req.user.getCart()
    .then((cart)=>{
        return cart.getProducts({
            where : { id : req.params.productID }
        });
    })
    .then((products)=>{
        const product = products[0];
        return product.cartItem.destroy(); //remove the product and the cart association from in-between table
    })
    .then((result)=>{
        res.redirect('/cart');
    })
    .catch((err)=>{
        console.log(err);
    });
};

exports.getOrderItems = (req, res, next) => { //This method is simlar to getCart with a different implementation
    req.user
    .getOrders({include: Product})
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
    let fetchedCart;
    req.user.getCart()
    .then((cart)=>{
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then((products)=>{
        return req.user.createOrder()
        .then((order)=>{
            return order.addProducts(products.map((product)=>{
                    product.orderItem = { quantity : product.cartItem.quantity};
                    return product;
                })
            );
        })
        .catch((err)=>{
            console.log(err);
        });
    })
    .then((result)=>{
        return fetchedCart.setProducts(null);
    })
    .then((result)=>{
        console.log("Posted!!!!---------------------------------------");
        res.redirect('/orders');
    })
    .catch((err)=>{
        console.log(err);
    });
};
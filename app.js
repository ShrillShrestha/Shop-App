const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

//router route modules
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');
const errorRoute = require('./controllers/error');

//import database configuration
const sequelize = require('./utils/datatbase');

//import database modules
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then((user)=>{
        req.user = user;
        next();
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.use('/admin', adminRoute);
app.use('/', shopRoute);

app.get('*', errorRoute.get404);

//define relations between-(For practice, there are redundent lines of code)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through : CartItem });
Product.belongsToMany(Cart, { through: CartItem});

Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

//sync to database
sequelize.sync()
.then(result =>{
    return User.findByPk(1)
})
.then((user)=>{
    if(!user){
        return User.create({name: 'Shrill', email: 'test@gmail.com'});
    }
    return user;
})
.then((user)=>{
    return user.createCart();  
})
.then((cart)=>{
    app.listen(3000, ()=>{
        console.log("Running in 3000!");
    });
})
.catch(err=>{
    console.log(err)
});


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-3spkw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const sessionStore = new MongoDBStore({
    uri: url,
    collection: 'sessions'
})

//router route modules
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');
const errorRoute = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findOne(req.session.user._id)
    .then((user)=>{
        req.user = user;
        next();
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.use('/admin', adminRoute);
app.use('/', authRoute);
app.use('/', shopRoute);

app.get('*', errorRoute.get404);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(connect =>{
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
})

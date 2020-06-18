const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

//router route modules
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');
const errorRoute = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next)=>{
    User.find()
    .then(users=>{
        req.user = users[0];
        next();
    })
    .catch(err=>{
        console.log(err);
    })
});

app.use('/admin', adminRoute);
app.use('/', shopRoute);

app.get('*', errorRoute.get404);

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-3spkw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(connect =>{
    return User.find();
})
.then(result=>{
    if(result.length === 0){
        const user = new User({
            name: "Test",
            email: "test@test.com",
            cart:{
                items:[]
            }
        });
        return user.save();
    }
})
.then(usr=>{
    app.listen(3000);
})
.catch(err =>{
    console.log(err);
})

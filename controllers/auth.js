const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) =>{
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/',
        admin: false,
        isAuth: req.session.isLoggedin
    })
}

exports.postLogin = (req, res, next) => {
    let userIn;
    User.findOne({email: req.body.email})
    .then((user)=>{
        userIn = user;
        return bcrypt.compare(req.body.password, user.password)
    })
    .then(doMatch=>{
        if(doMatch){
            req.session.user = userIn;
            req.session.isLoggedin = true;
            return res.redirect('/');
        }else{
            console.log("Error in login");
            return res.redirect('/');
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

exports.getRegister = (req, res, next) =>{
    res.render('auth/register', {
        pageTitle: 'Register',
        path: '/',
        admin: false,
        isAuth: req.session.isLoggedin
    })
}

exports.postRegister = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user){
            console.log("Already used email")
            return res.redirect('/')
        }
        bcrypt.hash(req.body.password, 12)
        .then(hash=>{
            return User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                cart:{items: []}
            });
        })
        .then(usr => {
            return res.redirect('/login');
        })
        .catch(err=>{
            console.log(err);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
}
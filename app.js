//import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//router modules
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

//create server app
const app = express();

//use middleware body-parser to parse incoming request body
app.use(bodyParser.urlencoded({extended: false}));

//set view engine and template location directory
app.set("view engine", "ejs");
app.set("views", "views");

//set static file location to public folder
app.use(express.static(path.join(__dirname, "public")));

app.use('/admin', adminRoute);
app.use('/', shopRoute);

app.use((req, res, next)=>{
    res.render('404.ejs', {pageTitle: 'Error!'});
});

//server listening on port 3000
app.listen(3000, ()=>{
    console.log("Running in 3000");
})


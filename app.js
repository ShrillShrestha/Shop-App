//import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

//router modules
const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');
const errorRoute = require('./controllers/error');

//import database configuration
const sequelize = require('./utils/datatbase');

//create server app
const app = express();

//use middleware body-parser to parse incoming request body
app.use(bodyParser.urlencoded({extended: false}));

//set view engine and template location directory
app.set("view engine", "ejs");
app.set("views", "views");

//set static file location to public folder
app.use(express.static(path.join(__dirname, "public")));

//routing function
app.use('/admin', adminRoute);
app.use('/', shopRoute);

//route to 404 error page
app.get('*', errorRoute.get404);

//sync to database
sequelize.sync()
.then(result =>{
    app.listen(3000, ()=>{
        console.log("Running in 3000!");
    })
})
.catch(err=>{
    console.log(err)
});
//server listening on port 3000


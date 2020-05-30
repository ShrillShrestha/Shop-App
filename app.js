//import modules
const express = require('express');
const bodyParser = require('body-parser');

//create server app
const app = express();

//use middleware body-parser to parse incoming request body
app.use(bodyParser.urlencoded({extended: false}));

//set view engine and template location directory
app.set("view engine", "ejs");
app.set("views", "views");

//server listening on port 3000
app.listen(3000, ()=>{
    console.log("Running in 3000");
})


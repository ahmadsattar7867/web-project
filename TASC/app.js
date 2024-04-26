const express = require("express");
const path = require("path");
const fs = require('fs'); 
const signinRoute = require("./Express/Controller/signin");
const indexRoute = require("./Express/Routes/index");
const signupRoute = require("./Express/Controller/signup");


const app = express();
const hostname = '127.0.0.1';
const port = 3000;


//defining routes
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/index', indexRoute);



// to serve main css file
app.use(express.static(path.join(__dirname, '', '')));
//to serve the signin css file
app.use(express.static(path.join(__dirname, 'Express', 'views')));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const authRoutes = require('./Express/Routes/authRoutes');
const utilityRoutes = require('./Express/Routes/utilityRoutes');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

//Middleware
app.use(express.json());

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Express', 'views'));



const dbURI = 'mongodb+srv://f219284:ahmad7867@cluster0.ajlxhg3.mongodb.net/node-auth';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



// to serve main css file
app.use(express.static(path.join(__dirname, '', '')));
//to serve the signin css file
app.use(express.static(path.join(__dirname, 'Express', 'views')));
// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'Express', 'public')));


// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//defining routess
// app.get('*', checkUser);
app.use(authRoutes);
app.use(utilityRoutes);




app.listen(port, hostname, () => {
    console.log(`HTTP server running at http://${hostname}:${port}/`);
  });

  
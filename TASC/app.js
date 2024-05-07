const express = require("express");
const path = require("path");
const fs = require('fs');
const mongoose = require('mongoose');
const authRoutes = require('./Express/Routes/authRoutes');
const exp = require("constants");


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


//defining routes
app.use(authRoutes);


// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const nodemailer = require('nodemailer');
const User = require('../Models/user');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


module.exports.forgotPass =  async  (req, res) => {
  // Retrieve the email from the request body
  const email = req.body.email;
  console.log(email); // Just for testing, remove this later

  
// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'f219284@cfd.nu.edu.pk', // Update with your Gmail email
      pass: 'ahmee.com7867777' // Update with your Gmail password
  }
});

// Define the email options
const mailOptions = {
  from: 'f219284@cfd.nu.edu.pk', // Update with your Gmail email
  to: email, // Send email to the provided email address
  subject: 'Password Reset Request',
  text: 'Your new password is now "123456. Please login again with the new password to continue' // Add your reset password link or instructions
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error'); // Handle error appropriately
  } else {
      console.log('Email sent: ' + info.response);
      res.render('signin'); // Render the signin page after sending email
  }
});
};



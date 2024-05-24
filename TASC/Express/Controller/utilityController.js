const nodemailer = require('nodemailer');
const User = require('../Models/user');


const express = require('express');
const bodyParser = require('body-parser');
const { checkUser } = require('../middleware/authMiddleware');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Export your Express app for use in other files if needed
module.exports.alerts = (req, res) => {
  res.render('alerts');
};

module.exports.user = (req, res) => {
  res.render('user');
};




module.exports.forgotPass = async (req, res) => {
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
    text: 'Your password was successfully reset to "123456". Please login again with the new password to continue' // Add your reset password link or instructions
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



// Function to fetch emails from the database
async function fetchEmailsFromDatabase() {
  try {
    const users = await User.find({}, 'email'); // Assuming you have an 'email' field in your User model
    const emails = users.map(user => user.email);
    return emails;
  } catch (error) {
    console.error('Error fetching emails from database:', error);
    throw error; // Propagate the error
  }
}



module.exports.sendalert = async (req, res) => {
  try {
    const messageContent = req.body.message;

    // Fetch emails from the database
    const emails = await fetchEmailsFromDatabase();

    // Send emails using Nodemailer
    const transporter = nodemailer.createTransport({
      // Your email configuration here (SMTP or other)
      service: 'gmail',
      auth: {
        user: 'f219284@cfd.nu.edu.pk', // Update with your Gmail email
        pass: 'ahmee.com7867777' // Update with your Gmail password
      }
    });

    const mailOptions = {
      from: 'f219284@cfd.nu.edu.pk',
      to: emails,
      subject: 'Alert from TASC Force',
      text: messageContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.render('alerts', { message: 'Error occurred, alert not sent.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.render('alerts', { message: 'Alert sent successfully.' });
      }
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.render('alerts', { message: 'Error occurred, alert not sent.' });
  }
};



// Function to remove user data from the database
module.exports.removeUser = async (req, res) => {
  try {
    // Retrieve the email from the request body
    const email = req.body.email;

    // Remove user data from the database
    const result = await User.deleteOne({ email: email });
    const users = await fetchEmailsFromDatabase(); // Implement fetchUsersFromDatabase function to fetch users
    console.log(email)
    // Check if user data is removed successfully
    if (result.deletedCount > 0) {
      res.render('user', { users });
    } else {
      res.render('user', { users });
    }
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).send('Internal Server Error'); // Handle error appropriately
  }
};

module.exports.user = async (req, res) => {
  try {
    // Fetch users from the database
    const users = await fetchEmailsFromDatabase(); // Implement fetchUsersFromDatabase function to fetch users
    res.render('user', { users });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.share = async (req, res) => {

  res.render('files');
}


const multer = require("multer")
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose")
require("dotenv").config()
const upload = multer({ dest: "uploads" })
const bcrypt = require("bcrypt")
const File = require("../Models/File.js")
const { handleDownload } = require('../middleware/filesMiddleWare');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  }
});

// Controller for handling file uploads
module.exports.upload = upload.single('file'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // File data
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname
    };

    // Process other form data (e.g., password)
    const { password } = req.body;
    if (password !== null && password !== "") {
      // Hash password using bcrypt
      fileData.password = await bcrypt.hash(password, 10);
    }

    // Save file data to database or perform further processing
    // For example, save the fileData to a MongoDB collection using Mongoose
    const file = await File.create(fileData);

    // Sending a plain text response indicating success
    res.send('File uploaded successfully');

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// app.get('/file/:id',handleDownload );
// app.post('/file/:id',handleDownload );

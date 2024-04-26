const express = require("express")
const fs  = require("fs");
const path = require("path");
const router = express.Router();


router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, '..','views', 'signin.html'), (err, html) => {
        if (err) {
            res.statusCode = 500;
            res.end("<h1>signin Server Error</h1>");
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        }
    });
})

module.exports = router;
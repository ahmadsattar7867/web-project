const express = require("express");
const path = require("path");
const fs = require('fs');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    // Serve HTML file
    fs.readFile(path.join(__dirname, '..', 'index.html'), (err, html) => {
        if (err) {
            res.statusCode = 500;
            res.end("<h1>Internal Server Error</h1>");
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        }
    });
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

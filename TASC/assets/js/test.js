const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;
const home = fs.readFileSync('../../index.html')

const server = http.createServer((req, res)=>{
    console.log(req.url);
    url = req.url;

    if(url == '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(home);
    } else {
        // Serve static files (CSS, images)
        fs.readFile(path.join(__dirname, '..', '..', url), (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end("<h1>404 not found</h1>");
            } else {
                const contentType = getContentType(url);
                res.setHeader('Content-Type', contentType);
                res.end(data);
            }   
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getContentType(url) {
    const ext = path.extname(url);
    switch (ext) {
        case '.css':
            return 'text/css';
        case '.jpg':
            return 'image/jpg';
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        // Add more cases for other file types if necessary
        default:
            return 'text/plain';
    }
}


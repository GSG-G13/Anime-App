const fs = require("fs")

const readFile = (filePath, req, res) => {
    fs.readFile(filePath, (err, file) => {
        if (err) {
            res.writeHead(500);
            res.end("server error");
        } else {
            res.writeHead(200);
            res.end(file);
        }
    });
}

module.exports = readFile
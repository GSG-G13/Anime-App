const fs = require("fs");
const path = require("path");
const posts = require("../post.json");

const router = (req, res) => {
  const url = req.url;

  if (url === "/") {
    const filePath = path.join(__dirname, "../../public", "index.html");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500);
        res.end("server error");
      } else {
        res.writeHead(200);
        res.end(file);
      }
    });
  } else if (url === "/css/style.css") {
    const filePath = path.join(__dirname, "../../public", "css", "style.css");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500);
        res.end("server error");
      } else {
        res.writeHead(200);
        res.end(file);
      }
    });
  } else if (url === "/js/index.js") {
    const filePath = path.join(__dirname, "../../public", "js", "index.js");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500);
        res.end("server error");
      } else {
        res.writeHead(200);
        res.end(file);
      }
    });
  } else if (url === "/js/request.js") {
    const filePath = path.join(__dirname, "../../public", "js", "request.js");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500);
        res.end("server error");
      } else {
        res.writeHead(200);
        res.end(file);
      }
    });
  } else if (url.includes("/search")) {
    const searchQuery = url.split("?q=");

    const filteredPosts = posts.filter((post) => {
      return post.toLowerCase().startsWith(searchQuery[1].toLowerCase());
    });

    console.log(filteredPosts);
    res.writeHead(200);
    res.end(JSON.stringify(filteredPosts));
  }
};

module.exports = { router };

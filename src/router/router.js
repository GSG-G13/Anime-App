const fs = require("fs");
const path = require("path");
const posts = require("../post.json");
const querystring = require("querystring");
const httpreqsts = require("../httpsreq");
const readFile = require("./readfile");

const router = (req, res) => {
  const url = req.url;
  if (url === "/") {
    const filePath = path.join(__dirname, "../../public", "index.html");
    readFile(filePath, req, res)
  }
  else if (url === "/css/style.css") {
    const filePath = path.join(__dirname, "../../public", "css", "style.css");
    readFile(filePath, req, res)
  }
  else if (url === "/js/index.js") {
    const filePath = path.join(__dirname, "../../public", "js", "index.js");
    readFile(filePath, req, res)
  }
  else if (url === "/js/request.js") {
    const filePath = path.join(__dirname, "../../public", "js", "request.js");
    readFile(filePath, req, res)
  }
  else if (url.includes("/search")) {
    const searchQuery = url.split("?q=");
    const filteredPosts = posts.filter((post) => {
      return post.toLowerCase().startsWith(searchQuery[1].toLowerCase());
    });
    res.writeHead(200);
    res.end(JSON.stringify(filteredPosts));
  }
  else if (url.includes("/result")) {
    let searchInput = url.split("?q=")[1];
    if (searchInput.includes("%20")) {
      searchInput = querystring.unescape(searchInput);
    };
    httpreqsts(searchInput, req, res);
  }
  else if (url == "/img/404.jpg") {
    const filePath = path.join(__dirname, "..", "..", "public", "img", "404.jpg");
    fs.readFile(filePath, (err, file) => {
      if (err) {
        res.writeHead(500);
        res.end("server error");
      } else {
        res.writeHead(200, "ok", { "Content-Type": "image/jpg" });
        res.end(file);
      }
    });
  }
  else {
    res.writeHead(404);
    res.end("Anime not found");
  }
};

module.exports = { router };

const fs = require("fs");
const path = require("path");
const posts = require("../post.json");
const sendReq = require("../requestApi")
const https = require("https")
const querystring = require("querystring")
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
    res.writeHead(200);
    res.end(JSON.stringify(filteredPosts));
  } else if (url.includes("/result")) {
    let searchInput = url.split("?q=")[1]
    if (searchInput.includes("%20")) {

      searchInput = querystring.unescape(searchInput)
    }
    https.get("https://kitsu.io/api/edge/anime?page[limit]=20", (resp) => {
      let oldData = '';
      resp.on('data', (chunk) => {
        oldData += chunk;
      });
      resp.on('end', () => {
        let allData = JSON.parse(oldData)
        let posts = allData.data.filter(e => (e.attributes.canonicalTitle.toLowerCase()).startsWith(searchInput.toLowerCase()))
        if (posts.length == 0) {
          res.writeHead(404);
          res.end("Anime not found");
        } else {
          res.writeHead(200);
          res.end(JSON.stringify(posts));
        }
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);

    });
  } else if (url == "/img/404.jpg") {
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

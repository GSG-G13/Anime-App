const fs = require("fs");
const path = require("path");
const posts = require("../post.json");
const sendReq = require("../requestApi")
const https = require("https")
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
    https.get("https://kitsu.io/api/edge/anime?page[limit]=20", (resp) => {
      let oldData = '';
      resp.on('data', (chunk) => {
        oldData += chunk;
      });
      resp.on('end', () => {
        let allData = JSON.parse(oldData)
        allData.data.forEach(e => {
          console.log(e);
        });
        let posts = allData.data.filter(e => (e.attributes.canonicalTitle.toLowerCase()).includes(searchInput.toLowerCase()))
        console.log(posts);
        res.writeHead(200);
        res.end(JSON.stringify(posts));
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);

    });
  }
};

module.exports = { router };

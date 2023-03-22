const https = require("https")

const httpreqsts = (searchInput,req,res) => {
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
}
module.exports = httpreqsts
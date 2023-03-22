const https = require('https');
const port = 3099

const sendReq = (url) => {

    https.get(url, (resp) => {
        let oldData = '';

        resp.on('data', (chunk) => {
            oldData += chunk;
        });

        resp.on('end', () => {
            let allData = JSON.parse(oldData)
            // console.log(allData);
            return allData
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}


module.exports = sendReq
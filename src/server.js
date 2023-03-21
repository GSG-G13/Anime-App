const http = require('http');
const {router} = require('./router/router')
const port = 4000;
const server = http.createServer(router);
server.listen(port,()=>{
  console.log(`server is running on http://localhost:${port}`);
})
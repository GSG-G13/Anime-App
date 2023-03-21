const fs = require('fs');
const path = require('path');

const router = (req,res)=>{
  const url = req.url;
  if(url === '/'){
    const filePath = path.join(__dirname,'../../public','index.html')
    fs.readFile(filePath,(err,file)=>{
      if(err){
        res.writeHead(500);
        res.end("server error")
      }else{
        res.writeHead(200);
        res.end(file)
      }
    })
  }else if(url === '/css/style.css'){
    const filePath = path.join(__dirname,'../../public','css','style.css')
    fs.readFile(filePath,(err,file)=>{
      if(err){
        res.writeHead(500);
        res.end("server error")
      }else{
        res.writeHead(200);
        res.end(file)
      }
    })
  }else if(url === '/js/index.js'){
    const filePath = path.join(__dirname,'../../public','js','index.js')
    fs.readFile(filePath,(err,file)=>{
      if(err){
        res.writeHead(500);
        res.end("server error")
      }else{
        res.writeHead(200);
        res.end(file)
      }
    })
  }else if(url === '/js/request.js'){
    const filePath = path.join(__dirname,'../../public','js','request.js')
    fs.readFile(filePath,(err,file)=>{
      if(err){
        res.writeHead(500);
        res.end("server error")
      }else{
        res.writeHead(200);
        res.end(file)
      }
    })
  }
  else if(url ==="/search"){
    let allData = ''
    req.on('data',chunck=>{
      allData += chunck
    })

    req.on('end',()=>{
      const filePath = path.join(__dirname,'..','post.json')
      fs.readFile(filePath,(err,data)=>{
        if(err){
          console.log(err);
          return
        }else{
          let myData = JSON.parse(data)
          let newData = myData.filter(e=> e.includes('Cowboy'))
          res.writeHead(200,{Location: '/'}),
          res.end(newData)
        } 
      })
    
    })
  }
}

module.exports = {router}
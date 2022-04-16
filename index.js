const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 8000;

const server = http.createServer((req, res) => {
    let myurl = url.parse(req.url,true);

    let file = "." + myurl.pathname +".html";

    if(file==="./.html"){
        file = "./index.html";
    }

    fs.readFile(file,(err,data)=>{
        console.log(file);

        if(err){
            console.log(err);
        }

        if (data){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    
        else{

            fs.readFile("./404.html",(err,data)=>{
                if(err){
                    console.log(err);
                }
                
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            })
        }
    });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
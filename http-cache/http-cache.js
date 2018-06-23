const http = require('http');
const server = http.createServer((req,res)=>{

})
server.on('request',(req,res)=>{
    res.setHeader('Etag',"16e36-540b1498e39c0")
    res.end();
})

server.listen(3000)
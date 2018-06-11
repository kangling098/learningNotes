const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.end('Hello World');
})

let server = app.listen(3000,_=>{
    let host = server.address().address;
    let port = server.address().port;
})
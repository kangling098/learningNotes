const app = require('express')(); 
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
io.on('connection',function(socekt){
    console.log('a user connected')
})
http.listen(3001,function() { console .log('listen on *：3001'); });
  


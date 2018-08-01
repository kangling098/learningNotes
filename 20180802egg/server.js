const express = require('express');
const PORT = 8000
let app = express();
let list = [
    {
        id:1,
        title:'标题1',
        url:'http://www.baidu.com'
    },
    {
        id:2,
        title:'标题2',
        url:'http://www.baidu.com'
    }
]

app.get('/list',(req,res)=>{
    let {pageNum, pageSize} = req.query;
    let ids = [];
    for(let i = (pageNum-1)*pageSize;i<pageNum*pageSize;i++){
        ids.push(i+1)
    }
    res.json(ids);
})
app.get('/item/:id',(req,res)=>{
    let id = req.params.id;
    res.json({
        id,
        createAt: Date.now(),
        title:`标题${id}`,
        url:`http://localhost:8000/item/${id}`
    });
})


app.listen(PORT);
console.log(`server is running in port: ${PORT}`);
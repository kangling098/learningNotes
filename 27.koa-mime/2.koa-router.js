let Koa = require('koa');
let app = new Koa();
let Router = require('koa-router');

let router1 = new Router();
let router2 = new Router();
// 一级路由
router1.get('/hello',async (ctx,next)=>{
    ctx.body = 'router hello';
   await next();
})
router1.get('/hello',async (ctx,next)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            ctx.body = 'hello2'
            resolve();
        },300)
    })
    
})
app.use(router1.routes())
app.listen(3000);
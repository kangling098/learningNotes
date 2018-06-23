let Koa = require('koa');
let app = new Koa();
let Router = require('./koa-router');

let router1 = new Router()
let router2 = new Router();
// 一级路由
router1.get('/hello',(ctx,next)=>{
    ctx.body = 'router hello';
    next();
})
router1.get('/hello',(ctx,next)=>{
    ctx.body = 'hello2';
})
// 二级路由
router2.get('/hello',(ctx,next)=>{
    ctx.body = 'hello';
})
// router1.use('/home',router2.routes(),router2.allowedMethods)
app.use(router1.routes());
// app.use(router1.allowedMethods());
app.listen(3000)
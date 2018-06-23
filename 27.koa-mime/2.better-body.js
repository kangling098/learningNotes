const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-better-body');
const path = require('path')
let fs = require('fs');
// 把1.0的中间件转化成async + await
let convert = require('koa-convert');
let app = new Koa();
let router = new Router();
// 提交的目录 是哪个位置 ctx.request.fields
app.use(convert(bodyParser({
    uploadDir: path.join(__dirname,'./upload')
})));
router.get('/',(ctx,next)=>{
    ctx.set('Content-Type','text/html');
    ctx.body = fs.createReadStream(path.join(__dirname,'./index.html'));
})

router.post('/upload',(ctx,next)=>{
    ctx.body = ctx.request.fields;
});

app.use(router.routes())
.use(router.allowedMethods);

app.listen(3000);
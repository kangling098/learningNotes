1. egg.js
egg.js

1.1 目录结构
egg-project
├── package.json
├── app.js (app.js 和 agent.js 用于自定义启动时的初始化工作)
├── agent.js (可选)
├── app
|   ├── router.js(用于配置 URL 路由规则)
│   ├── controller(用于解析用户的输入，处理后返回相应的结果)
│   |   └── home.js
│   ├── service (用于编写业务逻辑层，可选)
│   |   └── user.js
│   ├── middleware (用于编写中间件，可选)
│   |   └── response_time.js
│   ├── schedule (用于定时任务，可选)
│   |   └── my_task.js
│   ├── public (用于放置静态资源，可选)
│   |   └── reset.css
│   ├── extend (用于框架的扩展，可选)
│   |   └── application.js app 对象指的是 Koa 的全局应用对象，全局只有一个，在应用启动时被创建。
│       ├── context.js (Context 指的是 Koa 的请求上下文，这是 请求级别 的对象)
│       ├── request.js (Request 对象和 Koa 的 Request 对象相同，是 请求级别 的对象)
│       ├── response.js (Response 对象和 Koa 的 Response 对象相同，是 请求级别 的对象)
│       ├── helper.js (Helper 函数用来提供一些实用的 utility 函数)
│   ├── view (用于放置模板文件)
│   |   └── home.tpl
├── |── model (用于放置领域模型)
│   |   └── home.tpl
│   └── extend (用于框架的扩展)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config(用于编写配置文件)
|   ├── plugin.js(用于配置需要加载的插件)
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test(用于单元测试)
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
1.2 访问
文件	app	ctx	service	config	logger	controller	helper
Controller	this.app	this.ctx	this.service	this.config	this.logger	null	this.app.helper
Service	this.app	this.ctx	this.service	this.config	this.logger	null	this.app.helper
ctx.helper

2. 初始化项目
mkdir egg-news
cd egg-news
npm init -y
cnpm i egg --save
cnpm i egg-bin --save-dev
3. 添加 npm scripts 到 package.json：
"scripts": {
    "dev": "egg-bin dev"
}
4. 跑通路由
├─app
│  │─router.js
│  ├─controller
│  │      news.js
├─config
│      config.default.js
|─package.json
4.1 配置路由
app/router.js

module.exports = app => {
    const { router, controller } = app;
    router.get('/news', controller.news.index);
}
4.2 编写控制器
app\controller\news.js

const { Controller } = require('egg');
class NewsController extends Controller {
    async index() {
        this.ctx.body = 'hello world';
    }
}
module.exports = NewsController;
4.3 编写配置文件
exports.keys = 'zfpx';
5. 静态文件中间件
Egg 内置了 static 插件
static 插件默认映射 /public/ -> app/public/ 目录
把静态资源都放到 app/public 目录即可
bootcss
6. 使用模板引擎
├─app
│  │─router.js
│  ├─controller
│  │      news.js   
│  ├─public
│  │  ├─css
│  │  │      bootstrap.css  
│  │  └─js
│  │          bootstrap.js         
│  └─view
│          news.ejs       
├─config
│   config.default.js
│   plugin.js
6.1 安装依赖的插件
cnpm install egg-view-ejs --save
6.2 启用插件
{ROOT}\config\plugin.js

exports.ejs = {
    enable: true,
    package: 'egg-view-ejs'
}
6.3 配置模板
{ROOT}\config\config.default.js

exports.view = {
    defaultViewEngine: 'ejs',
    mapping: {
        '.ejs': 'ejs'
    }
}
6.4 编写模板
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>新闻</title>
    <link rel="stylesheet" href="/public/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <div class="container" style="margin-top:20px;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="text-center">百度新闻</h2>
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <%list.forEach(item=>{%>
                                <li class="list-group-item">
                                    <a href="<%=item.url%>"><%=item.title%>  发表时间:<%=helper.formatTime(item.time)%></a>        
                                </li>
                            <%})%>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
6.5 编写控制器
const { Controller } = require('egg');
class NewsController extends Controller {
    async index() {
        const list = [
            {
                id:1,
                title: '魅族：高不成、低不就 15系列的求变生存恐怕不易',
                url: 'https://baijia.baidu.com/s?id=1599513253231710086&wfr=pc&fr=idx_lst',
                time:Date.now()
            },
            {
                id:2,
                title: '从应届技术男到百度VP，这是低调到没百科的吴海锋首次受访',
                url: 'https://baijia.baidu.com/s?id=1599508189171446369&wfr=pc&fr=idx_lst',
                time:Date.now()
            }
        ]
        await this.ctx.render('news', { list });
    }
}
module.exports = NewsController;
7. 读取远程接口服务
在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service。

7.1 添加配置
config.default.js

exports.news={
    serverUrl: 'http://localhost:3000',
    pageSize:10
}
7.2 调用后台
const express=require('express');
let app=express();
app.use(express.json());
app.get('/list',(req,res) => {
    let {pageNumber,pageSize}=req.query;
    let data=[];
    for (let i=(pageNumber-1)*pageSize;i<pageNumber*pageSize;i++){
        data.push(i+1);
    }
    res.json({
        code: 0,
        data
    });
});
app.get('/item/:id',(req,res) => {
    let id=req.params.id;
    res.json({code:0,data:{
        id,
        title: `标题${id}`,
        url: `http://localhost:3000/item/${id}`,
        time:Date.now()
    }});
});
app.listen(3000);
7.3 编写Service
const {Service}=require('egg');
class NewsService extends Service {
    async list(pageNumber=1) {
        const {serverUrl,pageSize=10}=this.config.news;
        const {data: {data}}=await this.ctx.curl(`${serverUrl}/list`,{
            method:'GET',
            data: {
                pageNumber,
                pageSize
            },
            dataType:'json'
        });
        return  await Promise.all(data.map(id => {
            const url=`${serverUrl}/item/${id}`;
            return this.ctx.curl(url,{dataType:'json'}).then(res=>res.data.data);
        }));
    }
}
module.exports=NewsService;
7.4 编写控制层
app/controller/news.js

const {Controller}=require('egg');
class NewsController extends Controller{
    async list() {
        const page=this.ctx.query.page||1;
        const list=await this.ctx.service.news.list(page);
        await this.ctx.render('news/list.ejs',{list});
    }
}
module.exports=NewsController;
8. 扩展工具方法
框架提供了一种快速扩展的方式，只需在app/extend目录下提供扩展脚本即可
Helper 函数用来提供一些实用的 utility 函数。
访问方式 通过 ctx.helper 访问到 helper 对象
app\extend\helper.js

const moment=require('moment');
exports.formatTime=time => moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
news.ejs

 <%=helper.formatTime(item.time)%>
9. 中间件
app/middleware/robot.js

module.exports=(options,app) => {
    return async function (ctx,next) {
        const source=ctx.get('user-agent')||'';
        const match=options.ua.some(ua => ua.test(source));
        if (match) {
            ctx.status=403;
            ctx.body = '不允许访问!'
        } else {
            await next();
        }
    }
}
config.default.js

exports.middleware=[
    'robot'
]
exports.robot={
    ua: [
            /Baidu/i,
            /Google/i
    ]
}
10.配置文件
支持按环境变量加载不同的配置文件，如 config.local.js， config.prod.js 等等。 app.config.env

EGG_SERVER_ENV	说明
local	本地开发环境
unittest	单元测试
prod	生产环境
11. 单元测试
测试文件应该放在项目根目录下的test目录下，并以test.js为后缀名，即 {ROOT}/test/*/.test.js。
请注意是放在项目的根目录下，而非app目录下 /test/app/middleware/robot.test.js
const {app,mock,assert}=require('egg-mock/bootstrap');
describe('test/app/middleware/robot.test.js',() => {
  it('should block robot',() => {
      return app.httpRequest()
          .get('/')
          .set('User-Agent','Baidu')
          .expect(200);
  });
});
  "scripts": {
    "dev": "egg-bin dev",
    "test": "egg-bin test",
    "cov": "egg-bin cov"
  }
npm i egg-mock -D
npm test
npm run cov
const {Controller} = require('egg');
 class CustomController extends Controller {
  async index(){
    let {ctx,app,service} = this;
    let query = ctx.query;
    let ret = await service.news.list(query);
    // console.log(ret)
    await ctx.render('news.ejs',{title:'新闻列表',ret: ret});
    // ctx.body = 'asd'
  }
}

module.exports = CustomController;
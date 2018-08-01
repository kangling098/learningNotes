const {Controller} = require('egg');
 class CustomController extends Controller {
  async index(){
    let {ctx,app} = this;
    ctx.body = 'home'
  }
}

module.exports = CustomController;
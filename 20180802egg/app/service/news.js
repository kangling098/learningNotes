const {Service} = require('egg');
class CustomService extends Service {
  async list(data){
    let {app,ctx } = this;
    let ret = await ctx.curl('http://localhost:8000/list',{
      method:'GET',
      data,
      dataType:'json'
    }) 
    
    let promises = ret.data.map(id=>ctx.curl(`http://localhost:8000/item/${id}`,{
      dataType: 'json'
    }))
    console.log(promises)
    //curl返回一个promise,这个promise的resolve结果是一个response对象 {headers,data} data才是响应体
    let list = await Promise.all(promises);
    list = list.map(item => {
      let data = item.data;
      // data.createAt = ctx.helper.format(data.createAt);
      return data;
    });
    return list;
  }
}
module.exports = CustomService;
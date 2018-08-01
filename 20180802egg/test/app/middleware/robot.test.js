const {app, assert} = require('egg-mock/bootstrap');
describe('测试 app\middleware\robot.test.js',function(){
  it('baidu should be forbidden',function(){
    app.httpRequest()
    .get('/news')
    .set('User-Agent','Baidu')
    .expect(403)
  })
})
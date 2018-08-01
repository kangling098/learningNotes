module.exports = (options,app)=>{
  return async function(ctx,next){
    let uas = options.uas;
    console.log('uas',uas);
    let agent = ctx.get('user-agent'); // 客户端传过来的user-agent
    if(uas.some(val=>val.test(agent))){
      ctx.status = 403;
      ctx.body = '不允许访问';
    } else {
      await next();
    }
  }
}
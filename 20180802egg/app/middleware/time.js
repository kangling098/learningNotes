module.exports = (options,app)=>{
  return async function(ctx,next){
    let time = Date.now();
    await next();
    console.log(`请求耗时${Date.now()-time}`)
  }
}
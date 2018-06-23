// 路由类,在属性上挂载路径和处理方法 原型上有一个match方法用来判断当前路径是否与自己的路径匹配
class Layer {
    constructor(path, handler){
        this.path = path;
        this.handler = handler;
    }
    match(p){
        return p === this.path;
    }
}

class Router{
    constructor(){
        // 创建一个数组用来保存路由对象,模拟队列
        this.layers = [];
    }
    // get方法,用来将路由放入队列中
    get(path, handler){
        this.layers.push(new Layer(path,handler));
    }
    compose(ctx,handlers, next){
        async function  dispatch(index){
            if(index === handlers.length) return next();
            let h = handlers[index];
            return await h(ctx,()=>dispatch(index+1));
        }
        return  dispatch(0);
    }
    routes(){
        return async (ctx,next)=>{
            // 获取当前匹配到的路由处理函数
            let handlers = this.layers.filter(layer=>layer.match(ctx.path)).map(layer => layer.handler);
            await this.compose(ctx,handlers,next);
        }
    }
}























module.exports = Router;
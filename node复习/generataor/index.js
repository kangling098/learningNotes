// es6提供的, generator是生成器 -> 生成迭代器

// [Symbol.iterator]后面的函数叫做迭代器函数
// 迭代器函数会返回一个对象 it
let obj = {0:1,1:2,length:2,[Symbol.iterator]:function(){
    let index = 0;
    return {
        next:()=>{
            return {
                value:this[index],
                done: index++ >=this.length
            }
        }
    }
}}

function *ge(num){
    let a = yield ++num
    let b = yield ++num;
    return b
}
function co(fn){ // let it = gen();
    return function(){
        var gen = fn.apply(this,arguments);
        return new Promise((resolve,reject)=>{
            function step(key,arg){
                try{
                    var info = gen[key](arg);
                    var value = info.value;
                }catch(e){
                    reject(e);
                    return ;
                }
                if(info.done){
                    resolve(value);
                }else{
                    return Promise.resolve(value).then(function(value){
                        step('next',value)
                    },err=>{
                        step('throw',err)
                    })
                }
            }
            return step('next')
        })
    }
}


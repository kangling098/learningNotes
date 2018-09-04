// 判断x是普通值还是promise方法
function resolvePromise(promise2, x, resolve, reject){ 
    if(promise2 === x){
        return reject(new TypeError('循环引用'));
    }
    if(x !== null && (typeof x === 'object' || typeof x === 'function')){
        let called; // 设置变量,防止重复调用
        try{ // 防止取then时出现异常  可能有人的promise使用 Object.defineProperty,设置get(){throw Error('xxx')}
            let then = x.then; // 取x的then方法 {then(){}}
            if(typeof then === 'function'){ // 如果then是函数,那么我们就认为他x是promise
                then.call(x,y=>{
                    if(called) return ;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 递归调用
                },r=>{
                    if(called) return ;
                    called = true;
                    reject(r);
                })
            }else{ // then是一个普通对象,直接将xresolve
                resolve(x)
            }
        }catch(e){
            if(called) return ;
            called = true;
            reject(e)
        }
    }else{
        resolve(x) // x就是一个普通值
    }
}


class Promise {
    constructor(executor){
        this.status = 'pending'; // 初始状态 pending 成功态 resolved 失败态 rejected
        this.value = undefined, // 成功值
        this.reason = undefined; // 失败原因
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];
        const resolve = data =>{ // resolve方法
            if(this.status === 'pending'){
                this.status = 'resolved'
                this.value = data;
                this.resolvedCallbacks.forEach(fn=>fn());
            }
        }
        const reject = err => { // reject 方法
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.reason = err;
            }
        }
        try {
            executor(resolve,reject);
        }catch(e){
            reject(e);
        }
        
    }
    then(onFullfilled,onRejected){
        // 
        onFulFilled = typeof onFullfilled === 'function' ? onFullfilled : y=>y; 
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
        let promise2;
        if(this.status === 'resolved'){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x = onFullfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                })
            })
        }
        if(this.status === 'rejected'){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e)
                    }
                })
            })
        }
        if(this.status === 'pending'){
            return new Promise((resolve,reject)=>{
                this.resolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFullfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.rejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            })
        }
        return promise2
    }
    catch(onRejected) {
        return this.then(null,onRejected)
    }
}
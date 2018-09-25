function promisify(fn){
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,(err,data)=>{
                if(err) return reject(err);
                resolve(data);
            })
        })
    }
}
module.exports = promisify;
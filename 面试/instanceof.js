const deepCopy = (obj, hash = new WeakMap) => {
    if(hash.has(obj)) return hash.get(obj)
    if(typeof obj !== 'object' || obj === null) return obj
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    let o = new obj.constructor
    hash.set(obj, o)
    for(let key in obj){
        if(obj.hasOwnProperty(key)) o[key] = deepCopy(obj[key],hash);
    }
    return o
}
// function copy(obj,hash = new WeakMap()){
//     if(hash.has(obj)) return hash.get(obj);
//     if(typeof obj !== 'object' || obj === null) return obj;
//     if(obj instanceof Date) return new Date(obj);
//     if(obj instanceof RegExp) return new RegExp(obj);
//     // 兼容Moments等库
//     if(obj.clone) return obj.clone();
//     let o = new obj.constructor();
//     hash.set(obj,o);
//     for(let key in obj){
//         if(obj.hasOwnProperty(key)) o[key] = copy(obj[key],hash);
//     }
//     return o;
// }
const aa = {}
const cc = {}
cc.aa = aa
aa.cc = cc
const a = {
    a: /asd/,
    b: new Date,
    c(){console.log(333)},
    d:cc,
    e:aa,
}
const c = deepCopy(a)
console.log(c.a)
console.log(c.b)
console.log(c.c)
console.log(c.d)
console.log(c.e)

// console.log(Object.getOwnPropertyNames(a))
console.log({} instanceof Object)

.clearfix{*zoom:1}
.clearfix:before,.clearfix:after{
    display:table;line-height:0;content:""
}
.clearfix:after{clear:both}
// 浅拷贝
// Object.assign
// var nameObj = {name:{company:'xiaoniaoyun'}};
// var ageObj = {age:25};

// let obj = {...nameObj, ...ageObj}
// console.log(obj)

// 深拷贝
// 递归拷贝
// let a = {}
// let obj = Object.assign(a,{b:1},{c:2})
// console.log(a)
// console.log(obj)

const deepClone = (obj, hash = new WeakMap()) =>{
    if(hash.has(obj)) return hash.get(obj)
    if(typeof obj !== 'object' || obj === null) return obj;
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    let o = new obj.constructor;
    hash.set(obj, o)
    for (let key in obj){
        if(obj.hasOwnProperty(key)) o[key] = deepClone(obj[key],hash);
    }
    return o;
}
let o = { a: { a: 1, n(){console.log(1)}, c: new Date() ,d :/\\d/img } }
o.o = o;
let obj = deepClone(o);
o.a.a=3
console.log(o)
console.log(obj)

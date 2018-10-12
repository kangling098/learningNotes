// 与之前的深拷贝类似
const deepCopy = (obj, hash = new WeakMap)=>{
    if(typeof obj !== 'object' || obj === null) return obj;
    if(hash.has(obj)) return hash.get(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    // 兼容Moments等库
    if(obj.clone) return obj.clone();
    const Constructor = obj.constructor;
    let o = new Constructor;
    hash.set(obj,o);
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            o[key] = deepCopy(obj[key],hash);
        } 
    }
    return o;
}
// 使用WeakMap循环遍历
const has_cycle = (obj) => {
    const _has_cycle = (obj, hash = new WeakMap)=>{
        let flag = 0;
        if(hash.has(obj)) return 1;
        if(typeof obj !== 'object' || obj === null) return 0;
        hash.set(obj);
        for(let key in obj){
            if(obj.hasOwnProperty(key)) flag += _has_cycle(obj[key],hash);
        }
        return flag;
    }

    return _has_cycle(obj) ? true : false;
}
const a=1;
const b={};
const c=[];
const d = {
    a:333
};
d.b = d;
console.log(has_cycle(a)) // false
console.log(has_cycle(b)) // false
console.log(has_cycle(c)) // false
console.log(has_cycle(d)) // true
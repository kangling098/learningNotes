// ### 40 2018年9月21日
// 写一个程序`clone`深度拷贝一个javascript对象。 

// 要求：
// 1. 支持对象拷贝
// 2. 支持函数成员拷贝
// 3. 支持数组拷贝
// 4. 支持日期对象拷贝
// 5. 支持Momemnt等地方库对象拷贝

```
function copy(obj,hash = new WeakMap()){
    if(hash.has(obj)) return hash.get(obj);
    if(typeof obj !== 'object' || obj === null) return obj;
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    // 兼容Moments等库
    if(obj.clone) return obj.clone();
    let o = new obj.constructor();
    hash.set(obj,o);
    for(let key in obj){
        if(obj.hasOwnProperty(key)) o[key] = copy(obj[key],hash);
    }
    return o;
}

```
// let obj1 ={
//     a:'b',
//     __proto__:null
// }
// // console.log(Object.setPrototypeOf(obj1,{}))
// // console.log(Object.getPrototypeOf(obj1))

// let obj2 = {
//     age: 9,
//     name:'jw'
//  };
//  let obj = {
//    name:'zfpx',
//    getPName(){ // 可以通过super关键字获取到父属性
//      return super.name
//    },
//    __proto__:obj2
//  }
// console.log (obj.getPName())
let obj = {}
Object.defineProperty(obj,'name',{
    enumerable:true,
    configurable:true,
    value:'zyx',
    writable:true
})
console.log(obj)
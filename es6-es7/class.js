// 在es5中没有类的概念 构造函数
// es6 class
// 如何实现一个类？
// 类的继承 三种属性 公有属性（__proto__)私有属性 静态方法(静态属性)
// function Parent(){
//     // 构造函数中的this 通过new调用的,this指代实例
//     this.name = 'parent';
// }
// Parent.prototype.eat = function(){
//     console.log('eat');
// }
// function Child() {
//     this.age = 9;
//     Parent.call(this);
//   }
//   let child = new Parent()

// 二. 继承公有属性
// X:Child.prototype = Parent.prototype; 这个是兄弟关系,不是父子关系
// Child.prototype.__proto__ = Parent.prototype;
// Object.setPrototypeOf(Child.prototype,Parent.prototype);
// Child.prototype = Object.create(Parent.prototype); 只继承公有
// function create(parentPrototype ,props){
//     function Fn(){}
//     Fn.prototype = parentPrototype;
//     let fn = new Fn()
//     for(let key in props){
//         Object.defineProperty(fn,key,{
//             ...props[key],
//             enumerable: true
//         })
//     }
//     return fn;
// }
// Child.prototype = Object.create(Parent.prototype,{
//     constructor:{
//         value: Child,enumerable:false
//     }
// })
// console.log((new Child).constructor)
let obj = {}
Object.defineProperty(obj,'name',{
    set(val){
        console.log(val)
    },
    get(...args){
        return args
    },
    enumerable:false,
    configurable:true
})
console.log(obj.name)
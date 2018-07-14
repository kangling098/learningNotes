## 6. Object
### 6.1 对象字面量
如果你想在对象里添加跟变量名一样的属性，并且属性的值就是变量的值就可以直接在对象里加上这些属性

~~~javascript
let name = 'bkl',
age = '25',
getAge = function(){
    console.log(this.age);
};
let person = {
    name,
    age,
    getAge
}
person.getAge(); // 25

~~~

### 6.2 Object.is方法
对比两个值是否相等
如果下列任何一项成立，则两个值相同：

- 两个值都是 undefined
- 两个值都是 null
- 两个值都是 true 或者都是 false
- 两个值是由相同个数的字符按照相同的顺序组成的字符串
- 两个值指向同一个对象
- 两个值都是数字并且
- 都是正零 +0
- 都是负零 -0
- 都是 NaN
- 都是除零和 NaN 外的其它同一个数字
这种相等性判断逻辑和传统的 == 运算符所用的不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 为 true 的现象），但 Object.is 不会做这种类型转换。

这与===运算符也不一样。===运算符（和==运算符）将数字值-0和+0视为相等，并认为Number.NaN不等于NaN。

~~~javascript
Object.is(undefined,undefined) // true
Object.is(null,null) // true
Object.is(null,undefined) // false
Object.is(+0,-0) // false
Object.is(+0,+0) // true
Object.is(NaN,NaN) // true
~~~

### 6.3 Object.assign (浅拷贝)

把多个对象的属性复制到一个对象中,第一个参数是复制的对象,从第二个参数开始往后,都是复制的源对象,这个方法属于浅拷贝

~~~javascript
let nameObj = {name:'bkl'};
let ageObj = {age:25};
let obj = {};
Object.assign(obj,nameObj,ageObj);
// 等价于
obj = Object.assign(nameObj,ageObj);
// 等价于 
obj = {...nameObj,ageObj}

// 克隆对象
function clone (obj) {
    return Object.assign({},obj)
}
~~~

### 6.4 Object.setPrototypeOf、Object.setPrototypeOf 和 Object.create
- Object.setPrototypeOf将一个指定的对象的原型（内部__proto__属性的值）设置为另一个对象或者null
当设置为null时,该对象上属于对象的方法全部会失去.
- Object.getPrototypeOf 方法返回指定对象的原型（内部__proto__属性的值）
- Object.create 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    
- 优化点

    **由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。**
~~~javascript
let obj1 = { name: 'bkl' };
let obj2 = { name: 'zyx' };
let obj = {};
Object.setPrototypeOf(obj,obj1);
console.log(obj.name) // 'bkl'
// 等价于
obj = Object.create(obj1) 
console.log(obj.name) // 'bkl'

console.log(Object.getPrototypeOf(obj)) // {name:'bkl'};
Object.setPrototypeOf(obj1,obj2);
console.log(obj1.name) // 'bkl'
console.log(Object.getPrototypeOf(obj1)); // {name:'zyx'};

Object.setPrototypeOf(obj,null);
obj.toString() // 报错

~~~

### 6.5 proto
直接在对象表达式中设置prototype
~~~
let obj1 = {name:'bkl'};
let obj2 = {
    __proto__:obj1
}
console.log(obj2.name); // 'bkl'
console.log(Object.getPrototypeOf(obj2) === obj1) // true
~~~

let obj = {
    name: 'bkl',
    age: '25',
    hobby: 'coding'
}
console.log(Object.keys(obj)) // ['name','age','hobby']
console.log(Object.values(obj)) // ['bkl',25,'coding']

class Person {
    constructor(){
        this.hobbies = [];
    }
    set hobby(hobby){
        this.hobbies.push(hobby);
    }
    get hobby(){
        return this.hobbies;
    }
}
let person = new Person;
person.hobby = 'coding';
person.hobby = 'running';
person.hobby = 'reading'; 
console.log(person.hobby ) // ['coding','runding','reading']
class Person {
    static add(a,b){
        return a+b;
    }
    static name = 'bkl'
}
console.log(Person.add(1+2)) // 3
console.log(Person.name) // 'bkl'
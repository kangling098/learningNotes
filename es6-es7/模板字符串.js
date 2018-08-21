// 模板字符串实现
// let name = 'bkl';
// let age = 26;
// let result = 'My name is ${name}, i am ${age} years old';

// result = result.replace(/\$\{([^\}]*)\}/g,(...args)=>{
//     return eval(args[1]);
// })
// console.log(result)

// 模板标签
// let name = 'bkl';
// let age = 26;
// function tag(strings) {
//     let values = Array.prototype.slice.call(arguments, 1);
//     let result = '';
//     for (let key in values) {
//         result += strings[key] + values[key].toString().toUpperCase();
//     }
//     result += strings[strings.length - 1];
//     return result;
// }
// let result = tag`My name is ${name} . I am ${age} years old`;
// console.log(result);
// let name = 'bkl';
// let age = 26;
// let doSomething = (...args)=>{
//     let [strArr,...identifyArr] = args;
//     console.log(strArr , identifyArr)
//     return strArr.join('')+identifyArr.join(',')
// }
// console.log(doSomething`asd sddddsa asd${name} hahahaha${age}`)

// console.log('adsdsd'.includes('dsd'))
// console.log('adsdsd'.padStart(11,'ccd'))
// let start = '0';
// let result = 'jw'
// let obj = {
//     result: 'jw',
//     fn(){
//         console.log(this.result);// undefined
//     }
// }
// let fn = obj.fn;
// obj.fn();

// ### 5. 2018年8月17日
// 写一个函数，将字符串除了最后的四位，其他都变成#
// ```js
// maskify("4556364607935616") == "############5616"
// maskify(     "64607935616") ==      "#######5616"
// maskify(               "1") ==                "1"
// maskify(                "") ==                 ""

// // "What was the name of your first pet?"
// maskify("Skippy")                                   == "##ippy"
// maskify("Nananananananananananananananana Batman!") == "####################################man!"
// ```
// 写好后请在201808/20180817目录 下面建一个 姓名.md 的文件,请注意代码一定要用反引号包裹一下。

// let maskify = (str)=>typeof str === 'string' ? str.length > 4 ? str.slice(0,-4).replace(/./g,"#")+str.slice(-4) : str :false
let maskify = (str)=>typeof str === 'string' ? [...str].reverse().map(( v ,k ) => k > 3 ? '#' : v).reverse().join('') :false
console.log(maskify("4556364607935616"))
console.log(maskify("64607935616"))
console.log(maskify("1"))
console.log(maskify("12"))
console.log(maskify("123"))
console.log(maskify("1234"))
console.log(maskify("12345"))
console.log(maskify(""))

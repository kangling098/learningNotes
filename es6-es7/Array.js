// 数组常见方法
// map (some,every,filter,forEach) es5
// find findIndex
// reduce 收敛 叠加
// for of

// reduce
// [1,2,3,4,5].reduce((prev,next,index,arr)=>{
//     return prev+next
// })
// const arr = [1,2,3,4,5]
// let bool = arr.includes((...args)=>console.log(args))
// console.log(bool)
// console.log(Array.from({0:1,1:'a',length:2}))
var fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Papaya"];
fruits.copyWithin(3, 0, 2);
console.log(fruits)

// slice splice

arrayObject.splice(index,howmany,item1,.....,itemX)
arrayObject.slice(start,end)
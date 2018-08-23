// ### 11. 2018年8月23日
// 写一个函数reverse反转一个数组A

// 要求：

// 不可以使用Array.reverse
// 请不要创建新数组

// const reverse = arr => {
//     const obj = {length:arr.length}
//     arr.reduce((prev,next,key)=>{
//         prev[arr.length - 1 - key] = next;
//         return prev;
//     },obj)
//     return Array.from(obj)
// }
// console.log(reverse([3,5,'ss','s']))
const reverse = arr => {
    return arr.map((val,key,cArr)=>(cArr[cArr.length-key-1]))
}
console.log(reverse([3,5,'ss','s']))
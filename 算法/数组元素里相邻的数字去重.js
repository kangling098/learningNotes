// // 1.数组元素里相邻的数字去重
// // eg:
// // 	[2,3,3,4,5,7,8,8,9,1,1,2,3] => [2,3,4,5,7,8,9,1,2,3]
// // 	[2,3,2] => [2,3,2]
// const a = [2,3,3,4,5,7,8,8,9,1,1,2,3];
// const b = [2,3,2]
// const distinct = arr => {
//     if(!arr.length) return [];
//     const newArr = [arr[0]];
//     for(let i = 1; i < arr.length; i++){
//         if(arr[i] !== newArr[newArr.length - 1]){
//             newArr.push(arr[i]);
//         }
//     }
//     return newArr
// }
// console.log(distinct(a))
// console.log(distinct(b))

// const distinct2 = arr => {
//     return arr.filter((val,key)=>arr[key+1] !== val)
// }
// console.log(distinct2(a))
// console.log(distinct2(b))

const snakeCase = str => {
    console.log(str.match(/[a-zA-Z]+/ig))
    
}

snakeCase('Foo Bar');

snakeCase('fooBar');

snakeCase('--FOO-BAR--');
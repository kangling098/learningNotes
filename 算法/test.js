// 题目1: 猜数字
// 系统和人玩一个猜数字的游戏，系统提供一个函数gt(number)告诉人number是否大于被猜测的数字。gt函数可以被调用很多次。

// 数字在1000-999,999,999之间
// 人需要写一个函数guess(gt)去告诉系统最后猜测的结果。

// 比如，比如目标数字是9999，可以不停调用gt来接近目标数字:

// gt(10) // false
// gt(100) // false
// gt(1000) // false
// gt(10000) // true
// gt(9999) // false ，找到最终结果

// const arr = [1,3,5,6,7,8,9,11,23,33,42,44,46,54,55,57,77,88]

// const bsearch = (A,target) => {
//     let l = 0
//     let r = A.length - 1 
//     let guess 
//     while(l<=r){
//         guess = Math.floor((l+r)/2);
//         if(A[guess] === target){
//             return guess
//         }else if(A[guess] < target){
//             l = guess + 1
//         }else {
//             r = guess -1
//         }
//     }
//     return -1
// }
// console.log(bsearch(arr,22))
// console.log(bsearch(arr,23))
// console.log(bsearch(arr,33))
const gt = (num)=> num>1000
const guess = (gt) => {
    let l = 1000;
    let r = 999999999;
    let guess;
    let lastTrue
    let lastFalse
    while(l<=r){
        guess = Math.floor((l+r)/2);
        if(gt(guess)){
            lastTrue = guess;
            r = guess - 1;
        }else {
            lastFalse = guess
            l = guess + 1;
        }
    }
    if(lastTrue){
        return lastTrue - 1
    }else {
        if(lastFalse >= 999999999) return 999999999
        return lastFalse + 1
    }
}
console.log(guess(gt))
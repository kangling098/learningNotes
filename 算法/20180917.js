// ### 36 2018年9月17日
// 写一个递归函数`sum_of_zero(S)`，求整数集合S中和为0的子集个数（不包括空集）。 集合S中可以有整数，也可以有负数。 

// ```
// sum_of_zero([1, -2, 2]) // 1
// sum_of_zero([1, -1, 3, -2, 2]) // 4
// sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2]) // 11
// ```

// 提示： 见tips.md

// 解法一
// ```js
// function sum_of_zero_inner(A,len,itemArr,wholeLen,returnArr = []){
//     if(len == wholeLen) return returnArr.push(itemArr);
//     sum_of_zero_inner(A,++len,[...itemArr],wholeLen,returnArr);
//     sum_of_zero_inner(A,len,[...itemArr,A[len]],wholeLen,returnArr);
//     return returnArr;
// }
// function sum_of_zero(A){
//     // 获取全排列 // 整数集合S中和为0的子集个数（不包括空集）
//     return sum_of_zero_inner(A,-1,[],A.length).map(val=>val.length ? val.reduce((current,next)=>current + next) : 0).reduce((current,next)=>next == 0 ? current+1 : current ,0)-1;
// }

// console.log(sum_of_zero([1, -2, 2])) // 4
// console.log(sum_of_zero([1, -1, 3, -2, 2])) // 4
// console.log(sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2])) // 11

// ```

// ### 36 2018年9月17日
// 写一个递归函数`sum_of_zero(S)`，求整数集合S中和为0的子集个数（不包括空集）。 集合S中可以有整数，也可以有负数。 

// ```
// sum_of_zero([1, -2, 2]) // 1
// sum_of_zero([1, -1, 3, -2, 2]) // 4
// sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2]) // 11
// ```
// 这是一个NP完全的问题，没有更好的解决方案，只能穷举。 因为需要去掉空集，所以内部函数_sum_of_zero_r计算完成之后需要减1.
// function sum_of_zero(S) {

//   function _sum_of_zero_r(S, decisions = []) {
//     if (S.length === decisions.length) {
//       const sum = decisions.reduce((a, b, i) => (b ? S[i] : 0) + a)
//       return sum === 0 ? 1 : 0
//     }

//     let s = 0
//     s += _sum_of_zero_r(S, decisions.concat(true))
//     s += _sum_of_zero_r(S, decisions.concat(false))
//     return s
//   }
//   return _sum_of_zero_r(S, []) - 1 
// }




function sum_of_zero(S){
    function _sum_of_zero(S,decisions = []){
        if(S.length === decisions.length){
            return decisions.reduce((a,b,i)=>a+ (b ? S[i] : 0),0) === 0 ? 1 : 0;
        }
        let sum = 0;
        sum += _sum_of_zero(S,[...decisions,true]);
        sum += _sum_of_zero(S,[...decisions,false]);
        return sum;
    }
    return  _sum_of_zero(S) - 1
}
console.time('a')
console.log(sum_of_zero([1, -2, 2])) // 1
console.log(sum_of_zero([1, -1, 3, -2, 2])) // 1
console.log(sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2])) // 1
console.timeEnd('a')


// ### 36 2018年9月17日
// 写一个递归函数`sum_of_zero(S)`，求整数集合S中和为0的子集个数（不包括空集）。 集合S中可以有整数，也可以有负数。 

// ```
// sum_of_zero([1, -2, 2]) // 1
// sum_of_zero([1, -1, 3, -2, 2]) // 4
// sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2]) // 11
// ```















const sum_of_zero = S => {
    const _sum_of_zero = (S, decisions = [],finalArr) => {
        if(decisions.length === S.length){
            return finalArr.push( decisions);
        }
        _sum_of_zero(S,[...decisions,true],finalArr);
        _sum_of_zero(S,[...decisions,false],finalArr);
        if(decisions.length !== 0) return 
        return finalArr.map(val=>val.reduce((a,b,i)=>a+(b ? S[i] : 0),0) === 0 ? 1 : 0).reduce((a,b)=>a+b )
    }
    return _sum_of_zero(S,[],[]) - 1
}
console.time('a')
console.log(sum_of_zero([1, -2, 2])) // 1
console.log(sum_of_zero([1, -1, 3, -2, 2])) // 1
console.log(sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2])) // 1
console.timeEnd('a')

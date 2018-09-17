### 36 2018年9月17日
写一个递归函数`sum_of_zero(S)`，求整数集合S中和为0的子集个数（不包括空集）。 集合S中可以有整数，也可以有负数。 

```
sum_of_zero([1, -2, 2]) // 1
sum_of_zero([1, -1, 3, -2, 2]) // 4
sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2]) // 11
```

提示： 见tips.md

解法一
```js
function sum_of_zero_inner(A,len,itemArr,wholeLen,returnArr = []){
    if(len == wholeLen) return returnArr.push(itemArr);
    sum_of_zero_inner(A,++len,[...itemArr],wholeLen,returnArr);
    sum_of_zero_inner(A,len,[...itemArr,A[len]],wholeLen,returnArr);
    return returnArr;
}
function sum_of_zero(A){
    // 获取全排列 // 整数集合S中和为0的子集个数（不包括空集）
    return sum_of_zero_inner(A,-1,[],A.length).map(val=>val.length ? val.reduce((current,next)=>current + next) : 0).reduce((current,next)=>next == 0 ? current+1 : current ,0)-1;
}

console.log(sum_of_zero([1, -2, 2])) // 4
console.log(sum_of_zero([1, -1, 3, -2, 2])) // 4
console.log(sum_of_zero([1, -1, 3, -2, 2, 5, 3, 1, 2])) // 11

```
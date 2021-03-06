// ### 39 2018年9月20日
// (今日头条面试题简版）写一个函数`sum_subset(S,N)`：一个集合S里面都是正整数，求和为N的所有非空子集。 

// 比如{1,3,8,5,2} N=10 那么有{8, 2}, {3,5,2}

// tips：见tips.md
// 解法一: 将求子集看做决策树,每个元素出现的可能性为true false,可以转换成 0 1 那么所有子集就是 0b00000 - 0b11111之间的数 实际上我们只需要把对应的决策放到对应的数组中,我们就能取到所有子集

```js
function* subsets(S) {
    for (let i = 1; i < 1 << S.length; i++) { // 由于要求非空子集,所以0b00000排除,从1开始循环
        let s = [];
        for (let k = 0; k < S.length; k++){
            const take = i & (i<<k);
            take && s.push(S[k]);
        }
        yield s;
    }
}
function sum_subset(S,N){
    return [...subsets(S)].filter(val=>val.reduce((a,b)=>a+b) === N)
}
const S = [1,3,8,5,2] 
console.log(sum_subset(S,3))
```
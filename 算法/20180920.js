// ### 39 2018年9月20日
// (今日头条面试题简版）写一个函数`sum_subset(S,N)`：一个集合S里面都是正整数，求和为N的所有非空子集。 

// 比如{1,3,8,5,2} N=10 那么有{8, 2}, {3,5,2}

// tips：见tips.md
```js
function* subsets(S) {
    for (let i = 1; i < 1 << S.length; i++) {
        let s = [];
        for (let k = 0; k < S.length; k++){
            const take = i & (1<<k);
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

```js
function*subsets(S){
    for(let i = 1; i< 1<<S.length; i++){
        let s = [];
        for(let k = 0; k < S.length; k++){
            const take = i & i<<k;
            take && s.push(S[k])
        }
    }
    yield s
}

```
// {
//     s: //小于0
//     m: //等于0
//     d: //大于0
// }
let obj = [1,2,3,4,0,0,-1,-2].reduce((memo,current)=>{
    if (current<0){
        memo['s'] = memo['s'] ? memo['s']+1 : 1
    }else if(current==0){
        memo['m'] = memo['m'] ? memo['m']+1 : 1
    }else{
        memo['d'] = memo['d'] ? memo['d']+1 : 1
    }
    return memo;
},{})
console.log(obj)
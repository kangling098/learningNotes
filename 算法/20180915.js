### 35.2018年9月15日题目

观看「递归和穷举」一节，给定一个字符串，写一个全排列函数 `permutationn(str,...)`。后面参数可以自行设计。 

```
permutation('abc') // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
```
function permutation(str,decisions = [],returnArr = []){ 
    if(str.length === decisions.length){ // O(1)
        returnArr.push(decisions.map(val=>str[val]).join('')) // O(n)
    }
    for(let i in str){ // O(n)
        if(!decisions.includes(i)){ // O(1)
            permutation(str,[...decisions,i],returnArr)
        }
    }
    return returnArr
}
console.log(permutation('abc'))
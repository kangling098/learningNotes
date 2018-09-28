// ### 46 2018年9月28日

// 写一个函数`gcd`计算两个数字的最大公约数。比如数字12和数字8的最大公约数是4。

```js
function gcd(n1,n2){
    let min = Math.min(n1,n2);
    for(let i = min;i>0;i--){
        if(n1 % i === 0 && n2 % i === 0){
            return i
        }
    }
}
```
function gcd(n1,n2){
    let min = Math.min(n1,n2);
    for(let i = min;i>0;i--){
        if(n1 % i === 0 && n2 % i === 0){
            return i
        }
    }
}
console.log(gcd(12,8))
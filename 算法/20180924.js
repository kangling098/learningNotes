### 42 2018年9月23日

一个人爬一个n级楼梯，他可以一次迈1步，也可以1次迈两步，也可以一次迈三步，……也可以一次迈n步。 写一个函数steps(n)，求这个人一共有多少种走法？
解法一
```js
function _steps(n, count){
    if(count>=n){
        if(count == n){
            return 1;
        }
        return 0;
    }
    let newNum = 0;
    newNum += _steps(n, count+1)
    newNum +=_steps(n, count+2)
    newNum +=_steps(n, count+3)
    return newNum;
}
function steps(n){
    return _steps(n,0);
}

console.log(steps(10))
```
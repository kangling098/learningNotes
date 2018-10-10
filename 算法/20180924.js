// ### 42 2018年9月23日

// 一个人爬一个n级楼梯，他可以一次迈1步，也可以1次迈两步，也可以一次迈三步，……也可以一次迈n步。 写一个函数steps(n)，求这个人一共有多少种走法？
// 解法一
```js
function _steps(n, count){
    if(count>=n){
        if(count == n){
            return 1;
        }
        return 0;
    }
    let newNum = 0;
    for(let i = 1;i<=n;i++){
        newNum += _steps(n, count+i)
    }
    return newNum;
}
function steps(n){
    return _steps(n,0);
}

console.log(steps(10))
```

### 42.2018年9月23日题目

一个人爬一个n级楼梯，他可以一次迈1步，也可以1次迈两步，也可以一次迈三步，……也可以一次迈n步。 写一个函数`steps(n)`，求这个人一共有多少种走法？


答案：

题目选自《剑指Offer》

利用递归关系
```
function steps(n) {
 if(n === 0) return 1
 let sum = 0
 for(let i = 0; i < n; i++){
   sum += steps(i)
 }
 return sum
}
```

```
function steps(n){
  if(n === 0) {return 1}
  return [...Array(n)].map((_, i) => i).reduce( (s, i) => {
    return steps(i) + s
  }, 0)
}
```

由递归关系（自上而下），找到递推关系（自下而上），避免重复计算（也就是动态规划）
```
function steps(n){
  const s = [1, 1]
  for(let i = 2; i <= n; i++){
    s[i] = s.reduce((a, b) => a + b )
  }
  return s.pop()
}
```

发现数学关系，然后直接求解

```
function steps(n){
  return 1 << (n-1)
}
```
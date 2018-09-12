写一个函数`maxk(A, k)`找到一个数组中最大的k个数字。 如：

```
maxk([3,5,8,2,1,6],2) // 8, 6 或者 6,8 （结果不要求顺序)
maxk([3,5,8,2,1,6],3) // 8,6,5
```

解法一: 使用冒泡排序,只把最大的k个数排上去,然后输出最大的这k个数
```js
function maxk(A,k){
    for(let i = A.length-1; i>=A.length-k; i--){
        for(let j = 0;j < i; j++){
            if(A[i] < A[j]){
                [A[i],A[j]] = [A[j],A[i]]
            }
        }
    }
    return A.slice(-k);
}
console.log(maxk([3,5,8,2,1,6],2))
```
写一个函数`sort`按照元素出现的频率排序一个数组。如果数字出现频率一样，那么从小到大排序。

例如：
```
sort([1,2,3,1,1,0,5,5,5,5,7]) // [5,5,5,5,1,1,1,0,2,3,7]

```
解法一:
```js
const insert = (A, x) => {
    let p = A.length - 1;
    while (p >= 0 && A[p] > x) {
        A[p + 1] = A[p--];
    }
    A[p + 1] = x;
}
const genena = (obj, key) => {
    let arr = [];
    obj[key].forEach(val => {
        arr = [...arr, ...Array(Number(key)).fill(Number(val))]
    })
    return arr;
}
const sort = A => {
    const sort_obj = A.reduce((memo, current) => {
        console.log(memo)
        memo[current] = memo[current] !== undefined ? memo[current] + 1 : 1;
        return memo;
    }, {})
    const new_sort_obj = Object.keys(sort_obj).reduce((memo, current) => {
        memo[sort_obj[current]] ? insert(memo[sort_obj[current]], current) : memo[sort_obj[current]] = [current]
        return memo;
    }, {})
    let newA = [];
    Object.keys(new_sort_obj).forEach(val => {
        newA = newA.concat(genena(new_sort_obj, val))
    })
    return newA;
}

console.log(sort([1, 2, 3, 1, 1, 0, 5, 5, 5, 5, 7]))
```

const sort = A => {
    const obj = A.reduce((memo,current)=>{
        memo[current] = memo[current] ? memo[current] + 1 : 1;
        return memo;
    },{})
    return A.sort((a,b)=>obj[b] - obj[a] || a - b)
}
console.log(sort([1, 2, 1, 1, 0, 5, 5, 5, 5,3,3,3,3,4,4,4,4, 7]))
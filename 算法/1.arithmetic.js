
// ### 22. 2018年9月3日题目
// 封装一个函数`sequence`对一个无限序列求值。函数接收一个lambda表达式代表一个无限序列，然后提供两个操作`take`和`takeWhile`。


// 例如：
// ```
// sequence( n => n * n ).take(5) // [0, 1, 4, 9, 16]
// sequence( n => n * 4 ).takeWhile( n => n < 20 ) // [0, 4, 8, 12, 16]
// ```
const sequence = lambda =>({
    takeWhile(fn2){
        let arr = [],i=0,num;
        while(fn2.call(null,num = lambda(i++))){
            arr.push(num)
        }
        return arr
    }
})
console.log(sequence( n => n * 4 ).takeWhile( n => n < 20 ))
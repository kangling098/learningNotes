// 封装一个函数sequence对一个无限序列求值。函数接收一个lambda表达式代表一个无限序列，然后提供两个操作take和takeWhile。

// 例如：
// ```
// sequence( n => n * n ).take(5) // [0, 1, 4, 9, 16]
// sequence( n => n * 4 ).takeWhile( n => n < 20 ) // [0, 4, 8, 12, 16]
// ```
const sequence = (fn)=>{
    return {
        take(num){ // 时间复杂度根据fn的时间复杂度决定O(n*fn的时间复杂度)
            let arr = []; 
            for(let i = 0;i < num; i++){
                arr.push(fn.call(null,i));
            }
            return arr;
        },
        takeWhile(fn2){ // 设置prev,节省了一次fn.call
            let arr = [],i=0,prev;
            while(fn2.call(null,prev=fn.call(null,i))){
                arr.push(prev);
                i++
            }
            return arr;
        }
    }
}
console.log(sequence( n => n * n ).take(5))
console.log(sequence( n => n * 4 ).takeWhile( n => n < 20 ))
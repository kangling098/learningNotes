// ### 32 2018年9月13日
// 学习radix sort实现一个字典序排序单词的算法，忽略大小写。

// ```
// sort(['god', 'apple', 'alice', 'bob', 'boy', 'google']) // alice, apple, bob, boy, god, google
// ```

// 提示：见tips.md
function radis_sort(A){
    // 首先获取最大值
    let max = Math.max(...A); // 时间复杂度O(n);
    let buckets = Array.from({length:10},()=>[]);
    console.log()
    let m = 1;
    while(m<max){ // 循环w次
        A.forEach(val=>{
            let digit = ~~(val%(m*10)/m)
            buckets[digit].push(val);
        })
        let j = 0;
        buckets.forEach(bucket=>{
            while(bucket.length){
                A[j++] = bucket.shift();
            }
        })
        m*=10;
    }
    return A;
}
const A = [10,200,13,12,7,88,91,24]
console.log(radis_sort(A))
// 基数排序的时间复杂度在 w较小时,可以看做 O(n)的,在w较大时看做O(n*w)

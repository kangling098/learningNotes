// ### 32 2018年9月13日
// 学习radix sort实现一个字典序排序单词的算法，忽略大小写。

// ```
// sort(['god', 'apple', 'alice', 'bob', 'boy', 'google']) // alice, apple, bob, boy, god, google
// ```

// 提示：见tips.md
// 解法一: 使用基数排序

function radix_sort(A){
    const maxLength = Math.max(...A.map(val=>val.length));
    // 27个桶,0号桶为空字符串,将所有的字符串都看做同样长度的字符串,只不过有一些后几位是空字符串
    const buckets = Array.from({length:27},()=>[]);
    let m = maxLength-1;
    while(m>=0){
        A.forEach(val=>{
            // 不是空字符串的,将其转化为unicode码,然后减去24,得到a-z的顺序
            let code = val[m]
            let digit = code ? code.toUpperCase().charCodeAt(0) - 64 : 0; 
            console.log(digit)
            buckets[digit].push(val);
        })
        let j = 0;
        buckets.forEach(bucket=>{
            while(bucket.length){
                A[j++] = bucket.shift()
            }
        })
        m--;
    }
    return A;
}
console.log(radix_sort(['god', 'apple', 'alice', 'bob', 'boy', 'google']))
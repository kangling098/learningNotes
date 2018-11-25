const radix_sort = A => {
    // 首先生成十个桶
    const buckets = Array.from({length:10},_=>[])
    // 获得最大值
    const max = Math.max(...A)
    // 循环最大值最大位数次
    let m = 1
    while(m < max){
        // 开始排序
        A.forEach(val=>{
            // 获得每次循环对应位数的值
            const digit = ~~(val%(m*10)/m)
            // 不改变顺序的,将数据放入桶中
            buckets[digit].push(val)
        })
        // 开始回写数据
        let j = 0;
        buckets.forEach(buc=>{ // 依照先进先出的顺序,回写数据,并且要将桶给清空
            while(buc.length){
                A[j++] = buc.shift()
            }
        })
        m *= 10
    }
}
const arr = [3,6,5,4,55,443,54,34,54]
radix_sort(arr)
console.log(arr)
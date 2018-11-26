const insert = (A,i,x) => {
    let p = i-1 // 下一个待比较的位置
    while(p >= 0 && A[p] > x ){
        A[p + 1] = A[p--]
    }
    A[p + 1] = x
}
const insertion_sort = A => {
    for(let i = 1; i < A.length; i++ ){
        let p = i - 1
        const x = A[p + 1]
        while(p >= 0 && A[p] > x){
            A[p + 1] = A[p--]
        }
        A[p + 1] = x
    }
}


const buckets_sort = (A,k,s) => { // 桶排序 A待排序的数组 k是桶的数量 s是桶的大小
    // 首先生成k个桶
    const buckets = Array.from({length:k},()=>[])
    // 第二步将数字放入桶中
    for(let i = 0; i < A.length; i++){
        const index = ~~(A[i]/s);
        buckets[index].push(A[i]);
    }
    // 将每个桶进行排序
    buckets.forEach(bucket => insertion_sort(bucket))
    return [].concat(...buckets)
}

const A = [29, 25, 3, 49, 9, 37, 21, 43]
console.log(buckets_sort(A,5,10))

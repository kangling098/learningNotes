// 二分查找

const A1 = [1, 3, 5, 6, 7, 8, 9, 11, 23, 33, 42, 44, 46, 54, 55, 57, 77, 88]

const bsearch = (A, x) => {
    // 设置循环不变式
    let l = 0,
        r = A.length - 1;
    while (l <= r) {
        const guess = ~~((l + r) / 2) // 获取猜测位置
        if (A[guess] === x) return guess
        if (A[guess] > x) {
            r = guess - 1
        } else {
            l = guess + 1
        }
    }
    return -1
}
console.log('二分查找', 6, bsearch(A1, 9))
console.log('二分查找', 0, bsearch(A1, 1))
console.log('二分查找', 10, bsearch(A1, 42))
console.log('二分查找', -1, bsearch(A1, 10))

// 冒泡排序
const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]
const bubble_sort = A => {
    for (let i = A.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (A[j] > A[j + 1]) {
                swap(A, j, j + 1)
            }
        }
    }
}
const A2 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
bubble_sort(A2)
console.log('冒泡排序', A2)

// 插入排序

const insert = (A, i, x) => {
    let p = i - 1;
    while (p >= 0 && A[p] > x) {
        A[p + 1] = A[p--]
    }
    A[p + 1] = x
}

const insertion_sort = A => {
    for (let i = 0; i < A.length; i++) {
        insert(A, i, A[i])
    }
}
const A3 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
bubble_sort(A3)
console.log('插入排序', A3)

// 合并排序
const merge = (A, p, q, r) => {
    const A1 = A.slice(p, q) // 两个需要比较的数组
    const A2 = A.slice(q, r)
    // 插入哨兵
    A1.push(Infinity)
    A2.push(Infinity)
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}
const merge_sort = (A, p = 0, r = A.length) => {
    while (r - p < 2) return
    const q = ~~((p + r) / 2)
    merge_sort(A, p, q)
    merge_sort(A, q, r)
    merge(A, p, q, r)
}
const A4 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
merge_sort(A4)
console.log('合并排序', A4)


// 快速排序 核心是找中心点
const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]
const _qsort = (A, lo, hi) => {
    let i = lo // [lo,i) 比中间点小的区间
    let j = hi - 1 // [i,j] 未确定大小的区域
    let cen = A[hi - 1] // cen 中心点的值,区间最右侧的一项

    while (i <= j) {
        A[i] < cen ? i++ : swap(A, i, --j)
    }
    swap(A, j, hi - 1)
    return j
}
const qsort = (A, lo = 0, hi = A.length) => {
    if (hi - lo < 2) return // 当范围只有一个时,天然的有序状态
    const mid = _qsort(A, lo, hi)
    qsort(A, lo, mid)
    qsort(A, mid + 1, hi)

}


const A5 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
qsort(A5)
console.log('快速排序', A5)

// 计数排序
const counting_sort = A => {
    const max = Math.max(...A)
    const B = Array(max + 1).fill(0) // 用于计数的数组
    const C = Array(A.length) // 用于回写的数组
    A.forEach(val => B[val]++)
    for (let i = 1; i < B.length; i++) {
        B[i] += B[i - 1]
    }
    A.forEach(val => C[--B[val]] = val)
    return C
}
const A6 = [3, 6, 5, 4, 55, 443, 54, 34, 54]

console.log('计数排序', counting_sort(A6))

// 基数排序
const radis_sort = A => {
    const max = Math.max(...A)
    const buckets = Array.from({length: 10}, _ => []) // 生成桶
    // 开始根据基数来将数据放入桶中
    let m = 1;
    while (m < max) {
        A.forEach(val=>{
            const digit = ~~(val%(m*10)/m)
            buckets[digit].push(val)
        })
        let j = 0
        buckets.forEach(bucket=>{
            while(bucket.length){
                A[j++] = bucket.shift()
            }
        })
        m *= 10
    }
}

const A7 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
radis_sort(A7)
console.log('基数排序', A7)

// 桶排序 和计数排序差不多,只不过桶自己控制

const buckets_sort = (A, k, s) => {
    const buckets = Array.from({length:k},()=>[])
    // 将数据放入桶中
    A.forEach(val=>{
        const index = ~~(val/s)
        buckets[index].push(val)
    })
    buckets.forEach(val=>insertion_sort(val))
    return [].concat(...buckets)
}
const A8 = [29, 25, 3, 49, 9, 37, 21, 43]
console.log('桶排序',buckets_sort(A8,5,10))
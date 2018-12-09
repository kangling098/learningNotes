// const bsearch = (A, x) => {
//     let l = 0,
//     r = A.length - 1,
//     guess;
//     while ( l <= r ) {
//         guess = ~~((l + r)/2)
//         if ( A[guess] === x ){
//             return guess
//         } else if ( A[guess] > x ) {
//             r = guess - 1
//         } else {
//             l = guess + 1
//         }
//     } 
// }
// const A = [1,2,3,4,5,6,7,8,9,11,23]
// console.log(bsearch(A,2))
// const bubble_sort = A => {
//     for (let i = A.length - 1; i >= 0; i--) {
//         for (let j = 0; j < i; j++) {
//             A[j] > A[j + 1] && swap(A, j + 1, j)
//         }
//     }
// }


// const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]

// const bubble_sort = A => {
//     for(let i = A.length - 1; i > 0; i--) {
//         for(let j = 0; j < i; j++) {
//             A[j] > A[j+1] && swap(A,j+1,j)
//         }
//     }
// }

// const A2 = [3, 6, 5, 4, 55, 443, 54, 34, 54]
// bubble_sort(A2)
// console.log('冒泡排序', A2)

// // insertion_sort
// const insert = (A, i, x) => {
//     let p = i - 1;
//     while(p >= 0 && A[p] > x){
//         A[p + 1] = A[p--]
//     }
//     A[p + 1] = x
// }

// const insertion_sort = A => {
//     for(let i = 1; i < A.length; i++){
//         insert(A, i, A[i])
//     }
// }
// const A3 = [3, 6, 5, 4, 55, 443, 54, 34, 54]

// insertion_sort(A3)
// console.log('charu', A3)
// const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]
// const merge = (A, p, q, r) => {
//     const A1 = A.slice(p, q)
//     const A2 = A.slice(q, r)
//     A1.push(Infinity)
//     A2.push(Infinity)
//     for(let k = p, i = 0, j = 0; k < r; k++){
//         A[k] =  A1[i] > A2[j] ? A2[j++] : A1[i++]
//     }
// }
// const merge_sort = (A, p = 0, r = A.length) => {
//     if (r - p < 2) return 
//     let q = ~~((r + p)/2)
//     merge_sort(A, p, q)
//     merge_sort(A, q, r)
//     merge(A, p, q, r)
// }
const A3 = [3, 6, 5, 4, 55, 443, 54, 34, 54]

const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]
// kuai速排序就是找中心点,然后交换
const partition = (A, lo, hi) => {
    let i = lo // [lo,i) 比中间点小的区间
    let j = hi - 1 // [i,j] 未确定大小的区域
    const cen = A[hi - 1] // cen 中心点的值,区间最右侧的一项

    while (i < j) {
        A[i] < cen ? i++ : swap(A, i, --j)
    }
    swap(A, j, hi - 1)
    return j

}

const qsort = (A, lo = 0, hi = A.length) => {
    if (hi - lo < 2) return // 当范围只有一个时,天然的有序状态
    const mid = partition(A, lo, hi)
    qsort(A, lo, mid)
    qsort(A, mid + 1, hi)
}
qsort(A3)
console.log('charu', A3)
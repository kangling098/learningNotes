// 插入排序的优势是 对几乎排好序的数组进行排序时,时间复杂度可以达到O(n)
// 下面的排序
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 11, 10, 9];

// const insert = (A, i, x) => { 
//     let p = i - 1 // 设置循环不变式p,每次都是x和p做比较
//     while (p >= 0 && A[p] > x) {
//         A[p + 1] = A[p--];
//     }
//     A[p + 1] = x;

// }
// const sort = A => { 
//     for (let i = 1; i < A.length; i++) {
//         insert(A, i, A[i]);
//     }
//     return A;
// }
// console.log(sort(arr))
function insert(A,i,x){
    let p = i-1;
    if(p>=0&&A[p]>x){
        A[p+1] = A[p--]
    }
    A[p+1] = x;
}
function sort(A){
    for(let i = 1; i< A.length;i++){
        insert(A,i,A[i])
    }
    return A;
}
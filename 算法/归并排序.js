// // 归并排序方法 (20180904)
// const arr = [1, 3, 33, 22, 55555, 324, 9824, -4324, 2432424324, 234234, 3, 22];
// const merge = (arr, p, q, r) => {
//     const a1 = arr.slice(p,q);
//     const a2 = arr.slice(q,r);
//     // 添加哨兵,用于做边界判断(使用Infinity或者Number.MAX_SAFE_INTEGER)
//     a1.push(Number.MAX_SAFE_INTEGER);
//     a2.push(Number.MAX_SAFE_INTEGER);
//     for(let k = p,i=0 ,j = 0;k<r;k++){
//         arr[k] = a1[i] < a2[j] ? a1[i++] : a2[j++];
//     }
// }
// const merge_sort = (arr, p, r) => {
//     if (r - p < 2) return
//     const q = Math.ceil((r + p) / 2);
//     merge_sort(arr, p, q);
//     merge_sort(arr, q, r);
//     merge(arr, p, q, r);
// }
// merge_sort(arr,0,arr.length)
// console.log(arr)



// // 归并排序方法 (20180912修改)
// // 设置循环不变式 start 数组的起始点 end 数组的终点 center 数组的中间点

// const arr = [1, 3, 33, 22, 55555, 324, 9824, -4324, 2432424324, 234234, 3, 22];
// const merge = (A, start, center, end) => {
//     // 申明两个数组,准备在下面进行比较排序
//     const A1 = A.slice(start, center);
//     const A2 = A.slice(center, end);
//     // 给两个数组添加哨兵
//     A1.push(Infinity);
//     A2.push(Infinity);
//     for (let i = 0, j = 0, z = start; z < end; z++){
//         A[z] = A1[i] < A2[j] ? A1[i++] : A2[j++]
//     }
// }

// const merge_sort = (A, start, end) => {
//     if (end - start < 2) return; // 当数组拆分到只剩下一个时,不要继续拆分了
//     let center = Math.floor((start + end) / 2);
//     merge_sort(A, start, center);
//     merge_sort(A, center, end);
//     merge(A, start, center, end);
// }
// merge_sort(arr,0,arr.length);
// console.log(arr)

// 归并排序 20180917
function merge(A,p,q,r){
    // 申明比较数组,加入哨兵
    let A1 = A.slice(p,q);
    let A2 = A.slice(q,r);
    A1.push(Infinity);
    A2.push(Infinity);
    for(let i=0,j=0,k=p;i+j<r-p;k++){
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++];
    }
}

function merge_sort(A,p,r){
    if(r-p<2) return;
    // 设置循环不变式 q为i,j的中间数,我们将数组分成 [i,q),[q,j)两部分
    let q = ~~((p+r)/2);
    // 递归分解
    merge_sort(A,p,q);
    merge_sort(A,q,r);
    merge(A,p,q,r)
}
const arr = [1, 3, 33, 22, 55555, 324, 9824, -4324, 2432424324, 234234, 3, 22];
merge_sort(arr,0,arr.length)
console.log(arr)
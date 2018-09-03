// 归并排序方法
const arr = [1, 3, 33, 22, 55555, 324, 9824, -4324, 2432424324, 234234, 3, 22];

const merge = (arr, p, q, r) => {
    const a1 = arr.slice(p,q);
    const a2 = arr.slice(q,r);
    // 添加哨兵,用于做边界判断(使用Infinity或者Number.MAX_SAFE_INTEGER)
    a1.push(Number.MAX_SAFE_INTEGER);
    a2.push(Number.MAX_SAFE_INTEGER);
    for(let k = p,i=0 ,j = 0;k<r;k++){
        arr[k] = a1[i] < a2[j] ? a1[i++] : a2[j++];
    }
}



const merge_sort = (arr, p, r) => {
    if (r - p < 2) return
    const q = Math.ceil((r + p) / 2);
    merge_sort(arr, p, q);
    merge_sort(arr, q, r);
    merge(arr, p, q, r);
}
merge_sort(arr,0,arr.length)
console.log(arr)
// 快速排序 (20180912 16:54)
const arr = [1, 3, 33, 22, 55555, 324, 9824, -4324, 2432424324, 234234, 3, 22];

function swap(A,i,j){
    [A[i],A[j]] = [A[j],A[i]];
}

function partition(A,lo,hi){
    const pivot = A[hi-1]; // 中心点
    let i = lo,j = hi - 1;
    // 小于中心点的范围 : [lo,i)
    // 未确认范围[i,j)
    // 大于中心店范围为 : [j,hi - 1)
    while(i !== j){
        if(A[i]<=pivot){
            i++
        }else{
            swap(A,i,--j);
        }
    }
    swap(A,j,hi-1)
    return j
}
function qsort(A,lo = 0,hi = A.length){
    if(hi - lo < 2) return ;
    const center = partition(A,lo,hi);
    qsort(A,lo,center);
    qsort(A,center+1,hi);
}

qsort(arr)
console.log(arr)
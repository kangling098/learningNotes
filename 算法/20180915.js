// 计数排序
console.time('a')
const arr = [0,4,55,3,44,2,33,2,44,5,33,6666,3,5]

// 计数排序,首先对数组取最大值,然后生成一个比最大值大一位的数组
function counting_sort(A){
    let max = Math.max(...arr);
    // 生成排序数组
    const B = Array(max+1).fill(0);
    // 生成结果数组
    const C = Array(A.length);
    // 累计位递增
    A.forEach(v=>B[v]++);
    // 累计求和
    for(let i = 1; i < B.length; i++){
        B[i] += B[i-1];
    }
    // 结果取出
    for(let i=0; i<A.length;i++){
        //获取A中元素填充位置
        let p = -1 + B[A[i]]-- ;
        C[p] = A[i]
    }
    return C
}
console.log(counting_sort(arr))
console.timeEnd('a')
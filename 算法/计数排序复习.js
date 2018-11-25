/**
 * 非比较型排序
 * 待排序集合键为自然数(0-Infinity)的整数
 * 键的最大值为k
 * 
 * 时间复杂度O(n+k)
 * 空间复杂度O(n+k)
 **/

const counting_sort = A => {
    const k = Math.max(...A) // 获取最大值K
    const B = Array(k + 1).fill(0) // 生成计数数组B
    const C = Array(A.length) // 创建写入数组 C
    // 开始计数
    A.forEach(val=>B[val]++)
    for(let i = 1; i < B.length; i++){
        B[i] += B[i-1]
    }
    A.forEach(val=>C[--B[val]] = val)
    return C
}

const arr = [3,6,5,4,55,443,54,34,54]

console.log(counting_sort(arr))
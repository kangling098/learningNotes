// ### 8. 2018年8月20日
// 写一个函数`solution`，求比一个数字n小的所有3和5的整数倍数和。 

// 比如10，比它小的3、5整数倍数有： 3,5,6,9， 所以和为23。
// 比如16， 比它小的3，5整数倍数有： 3,5,6,9,10,12,15，所以和为60（15只计算1次）

// 示例
// ```
// solution(10) // 23
// solution(16) // 60
// ```
// 注意，如果输入负数，返回0

// 思路,这个题目可以看做取 比数字n小的所有3和5的整数倍和减去比数字n小的15的整数倍和
// 当 n 小于等于2时,返回0
let solution = n => {
    if(n<=3) return 0;
    let sum = 0
    for(let i = 3; i < n; i++){
        if(i % 3 === 0 || i % 5 === 0){
            sum+=i
        }
    }
    return sum
}
console.log(solution(-10))
console.log(solution(10))
console.log(solution(16))
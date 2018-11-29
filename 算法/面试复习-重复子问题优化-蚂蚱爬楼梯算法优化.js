// 一个人爬一个n级楼梯，他可以一次迈1步，也可以1次迈两步，也可以一次迈三步，……也可以一次迈n步。
// 写一个函数steps(n)，求这个人一共有多少种走法？
const climb = n => {
    const hash = {}
    const _climb = num => {
        if(hash[num]) return hash[num]
        let sum = 0
        for(let i = 1; i < num; i++){
            sum += _climb(i)
        }
        sum += 1
        
        return hash[num] = sum
    }
    return _climb(n)
}
console.log(climb(1))
console.log(climb(2))
console.log(climb(3))
console.log(climb(4))
console.log(climb(5))
const climb2 = n => 1 << (n-1)
console.log(climb2(1))
console.log(climb2(2))
console.log(climb2(3))
console.log(climb2(4))
console.log(climb2(5))
const a = "xyaabbbccccdefww", b = "xxxxyyyyabklmopq"
function longest(s1, s2) {
    const obj = {}
    const s3 = s1 + s2
    for(let i = 0; i < s3.length; i++){
      obj[s3[i]] = 1
    }
    return Object.keys(obj).sort().join('')
}
console.log(longest(a,b))
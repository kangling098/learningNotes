// 一个盒子里有16个求
const black = Array(8).fill(1)
const white = Array(8).fill(1)

const getBall = (n) => {
    if(n==1) return 1
    return n + f(n-1) + f(n-2)+f(n-n-1)
}

getBall = (n) => {
    let sum = 0
    for(let i=1; i<n.length; i++){
        n
    }
}

console.log(2<<1)
const compose = (...fns) => fns.reduce((a,b)=>(...args)=>a(b(...args)))
function fib(n) {
    const hash = {1:1,2:1}
    const _fib = n => {
        if(hash[n]) return hash[n]
        const result = _fib(n - 1) + _fib(n - 2)
        hash[n] = result
        return result
    }
    return hash[n] ? hash[n] : _fib(n)
}
console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(4))
console.log(fib(5))
console.log(fib(260))

function fib1(n) {
    if(n <= 2) return 1
    let a = 1, b = 1
    for(let i = 2; i < n; i++){
        [b, a] = [a + b, b]
    }
    return b
}
console.log(fib1(1))
console.log(fib1(2))
console.log(fib1(3))
console.log(fib1(4))
console.log(fib1(5))
console.log(fib1(260))
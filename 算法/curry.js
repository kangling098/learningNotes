// const curry = func => {
//     const g = (...allArgs) => allArgs.length >= func.length ?
//         func(...allArgs) : (...args) => g(...allArgs, ...args)
//     return g
// }

// const curry = func => {
//     const g = (...allArgs) => allArgs.length >= func.length ? func(allArgs) : (...args) => g(...allArgs,...args)
//     return g
// }


const curry = (func,...oldArgs) => {

    const g = (...allArgs) => allArgs.length + oldArgs.length >= func.length ? func(...oldArgs,...allArgs) : (...args) => g(...allArgs,...args)
    return g
}
const sum = (a,b,c,d,e)=>{
    return a+b+c+d+e
}
const currySum = curry(sum,1,3)
console.log(currySum(2)(4)(5))


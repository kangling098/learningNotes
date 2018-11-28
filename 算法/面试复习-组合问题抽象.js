// S : 数组, 需要求组合的集合
// k : 取出元素个数
const S = ['a','b','c','d']
const combination = (S,k) => {
    if(k === 0 || S.length === k){
        return [S.slice(0,k)]
    }
    let r = []
    const [first, ...others] = S
    r = r.concat(combination(others,k-1).map(A=>[first, ...A]))
    r = r.concat(combination(others,k))
    return r
}

console.log(combination(S, 2))
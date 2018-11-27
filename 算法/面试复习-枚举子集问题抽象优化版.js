/**
 * 优化方案是直接获取节点的决策 因为枚举子集和全排列以及组合问题其实都是决策树问题
 * 枚举子节点的优化方案,我们直接生成 决策的结果 以三个数为例 [true,false,false] 可以对应 [1,0,0]
 * 实际上 3个数的全排列 就是 0b000 -> 0b111 这八种状况
 * 
 * 我们要如何取每一位上是否被选择呢? const take = 0b111 & 1<<0 通过与运算,我们能得到这个数当前状态是否选中
 * 
 **/

function *subsets(S){
    
    for(let i = 0; i < 1 << S.length; i++){
        const s = []
        for(let k = 0; k < S.length; k++){
            const take = i & (1 << k)
            take && s.push(S[k])
        }
        yield s.join('')
    }
}
const S = ['a','b','c','d']
console.log([...subsets(S)])
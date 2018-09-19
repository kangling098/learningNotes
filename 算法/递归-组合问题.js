// S : 数组, 需要求组合的集合
// k : 取出元素个数
// const S = ['a','b','c','d']
// function combination(S,k){

//     if(k === 0 || S.length === k){
//         return [S.slice(0,k)];
//     }
//     const [first,...others] = S;
//     let r = [];
//     r = r.concat(combination(others, k-1).map(c => [first,...c]));
//     r = r.concat( combination(others, k));
//     return r
// }
// console.log(combination(S,6))

const S = ['a','b','c','d'];
const combination = (S,k) => {
    if(k>S.length){console.error('取值超过集合元素个数')}
    const real_combination = (S,k)=>{
        if(k === 0 || k === S.length) return [S.slice(0,k)];
        let [first, ...others] = S;
        let cache = [];
        cache = cache.concat(real_combination(others,k-1).map(c=>[first,...c]));
        cache = cache.concat(real_combination(others,k));
        return cache;
    }
    return real_combination(S,k)
}
console.log(combination(S,3))

// 题目5:求字符串的所有组合
// 对于给定的字符串，写一个函数combinations(str)，求所有可能的组合。 （结果不考虑顺序）

// 字符串长度不大于12
// 字符串遵循字典顺序
// combinations('abc') // ['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc']
// combinations('aac') // ['a', 'c', 'aa', 'ac',  'aac']

// const combinations = str => {
//     const sum = (take)=>{
//         take=take-1
//         take = take.toString(2)
//         return take.split('').reduce((a,b)=>+a+(+b))+1<=12
//     }
//     const subsets = function *(S){
//         for (let i = 1; i < 1 << S.length; i++) { 
//             let s = [];
//             for (let k = 0; k < S.length; k++){
//                 const take = i & (1<<k);
//                 take &&sum(take)&& s.push(S[k]);
//             }
//             yield s;
//         }
//     }
//     let arr = [...subsets(str)]
//     const obj = {};
//     arr.forEach(val=>{
//         val = val.sort((a,b)=>a.charCodeAt()-b.charCodeAt()).join('')
//         obj[val] = 1;
//     })
//     return Object.keys(obj)
// }
function combinations(str) {
    const subsets = function *(S){
        for (let i = 1; i < 1 << S.length; i++) { 
            let s = [];
            for (let k = 0; k < S.length; k++){
                const take = i & (1<<k);
                take && s.push(S[k]);
            }
            yield s;
        }
    }
    let arr = [...subsets(str)].filter(val=>val.length<=12)
    const obj = {};
    arr.forEach(val=>{
        val = val.sort((a,b)=>a.charCodeAt()-b.charCodeAt()).join('')
        obj[val] = 1;
    })
    return Object.keys(obj)
}



// 老师的
// function combinations(str){
//     const arr =  [...str]
    
//     let N = 1 << str.length 
//     const s = new Set()
//     for(let i = 1; i < N; i++ ) {
//       let w = ''
//       let j = 0
//       while( (1 << j) <= i ) {
//         if(i & (1 << j)) {
//           w += str[j] 
//         }
//         j++
//       }
//       s.add(w)
//     }
//     return [...s]
    
//   }
console.log(combinations('aacaaaaaaaaaaaaaaaaaa'))
// ### 35.2018年9月15日题目

// 观看「递归和穷举」一节，给定一个字符串，写一个全排列函数 `permutationn(str,...)`。后面参数可以自行设计。 

// ```
// permutation('abc') // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

const permutation = (str,A = []) => {
    if(A.length === str.length){
        let out = ''
        A.forEach(val=>{
            out += str[val]
        })
        return [out]
    }
    let r = []
    for(let i = 0; i < str.length; i++){
        if(!A.includes(i)){
            r = r.concat(permutation(str,A.concat(i)))
        }
    }
    return r
}
console.log(permutation('ab'))
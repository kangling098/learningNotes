// 题目4:数组的第k大值
// 对一个给定的数组，里面只有数字(有浮点数)。写一个函数maxk求它的第k大值（k<1000)。数据量级10W。

// maxk([1,2,3,5,8,2,100,23,7], 3) // 8
const maxk = (arr, k) => {
    let s = k
    const swap = (A,i,j) => {
        const t = A[i];
        A[i] = A[j];
        A[j] = t;
    }
    for(let i = arr.length -1; i >= 1;i--){
        s--
        for(let j = 0; j < i; j++){
            arr[j-1] > arr[j] &&swap(arr,j-1,j);
        }
        if(s == 0) {
            return arr[arr.length-k-1]
        }
    }
}
console.log(maxk([1.11,2.22,3,5,8,2,100,23,7], 4))








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


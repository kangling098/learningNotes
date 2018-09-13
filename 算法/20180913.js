// ### 32 2018年9月13日
// 学习radix sort实现一个字典序排序单词的算法，忽略大小写。

// ```
// sort(['god', 'apple', 'alice', 'bob', 'boy', 'google']) // alice, apple, bob, boy, god, google
// ```

// 提示：见tips.md

// 解法一
// const sort = A => {
//     A.sort((x,y)=>x.toUpperCase() - y.toUpperCase())
// }

// 写一个函数`maxk(A, k)`找到一个数组中最大的k个数字。 如：

// ```
// maxk([3,5,8,2,1,6],2) // 8, 6 或者 6,8 （结果不要求顺序)
// maxk([3,5,8,2,1,6],3) // 8,6,5
// ```

// 使用快排来解决
function swap(A,i,j){
    [A[i],A[j]] = [A[j],A[i]];
}
function partition(A,lo,hi){
    //pivot中心点 [lo,i) 小于中心点 [i,j)未比较 [j,hi-1)大于中心点
    let pivot = hi-1;
    let i = lo;
    let j = hi-1;
    while(i<j){
        if(A[i]<=pivot){
            i++
        }else{
            swap(A,i,--j)
        }
    }
    swap(A,j,hi-1);
    return j
}
function qsort(A,k,lo=0,hi=A.length){
    if(hi-lo < 2) return 
    let center = partition(A,lo,hi);

    if(center+k>A.length){
        qsort(A,k,lo,center);
    }
}
function maxk(A,k){
    qsort(A,k,0,A.length);
    return A.slice(-k)
}
console.log(maxk([3,5,8,2,1,6],2)) // 8, 6 或者 6,8 （结果不要求顺序)
console.log(maxk([3,5,8,2,1,6],3))
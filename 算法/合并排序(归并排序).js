const A = [10,200,13,12,7,88,91,24]
const B = [1,2,3,4,5,88,91,104]
// 二分查找
/**
 * 二分查找的核心思想: 设置边界条件 l ,r 每次查找lr的中间点,根据中间点大于或者小于目标
 * 再跟新边界,直到l>r 循环结束
 * 
*/
const bsearch = (A , x, ) =>{
    let l =0, r = A.length-1;
    while(l<=r){
        const guess = ~~((l + r)/2)
        if(A[guess] === x )return guess
        if(A[guess] > x){
            r = guess - 1
        }else{
            l = guess + 1
        }
    }
    return -1
}

// 二分查找
console.log('二分查找',bsearch(B,88))
console.log('二分查找',bsearch(B,3))
console.log('二分查找',bsearch(B,4))
console.log('二分查找',bsearch(B,7))




























// console.log(radis_sort(A))
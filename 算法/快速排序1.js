/***
 * 快速排序是基于比较的排序,同时,他也是基于交换的排序,它的时间复杂度是O(nlgn)
 * 空间复杂度是 O(1) ,核心思想就是设置中心点,然后将区域内的元素按照大于中心点与小于中心点
 * 分成两块,再将中心点与 大小区域的交界处的大值进行交换,然后排序 左侧和右侧
 *  */

 const swap = (A,i,j) => [A[i],A[j]] = [A[j],A[i]]
 const partition = (A, lo, hi) => {
     const pivot = A[hi - 1]
     let i = lo,j = hi -1;
     while(i !== j) {
         A[i] <= pivot ? i++ : swap(A,i,--j) 
     }
     swap(A,j,hi-1)
     return j
 }

 const qsort = (A, lo=0, hi=A.length) => {
     if(hi - lo < 2) return 
     const p = partition(A, lo, hi);
     qsort(A,lo,p)
     qsort(A,p+1,hi)
 }
 const arr = [3,6,5,4,55,443,54,34,54]
 qsort(arr)
 console.log(arr)
 
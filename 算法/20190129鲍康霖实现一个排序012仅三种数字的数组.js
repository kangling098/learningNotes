// 题目1:排序0,1,2
// 写一个函数sort，排序一个只有0，1，2三种数字的数组，需要排序。

// 在原数组上直接排序，空间复杂度O(1)
// 输入规模在100W
// 不需要返回值
function swap(A, i, j) {
  let x = A[i];
  A[i] = A[j];
  A[j] = x;
}
function sort(A) {
  let cur = 0
  for( let i = 0; i < A.length; i++) {
    if(A[i] === 0){
      swap(A, i, cur++)
    }
  }
  for( let i = cur; i < A.length; i++) {
    if(A[i] === 1){
      swap(A, i, cur++)
    }
  }
}
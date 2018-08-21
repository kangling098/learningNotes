// ### 8. 2018年8月21日
// 写一个二分查找函数`bsearch`，和之前学习的二分查找函数有一定的变化。

// ```
// function bsearch(A, x) {
//   /// TODO
// }

// ```
// A是一个已排序的数组，x是目标值。

// 1. 如果找到目标值，返回目标值在数组中的序号。 
// 2. 如果没有找到目标值，返回目标值应该被插入的位置


// 比如数组: A=3,5,7,13,22,25

// ``
// `
// bsearch(A,5) // 1
// bsearch(A,13) // 3
// bsearch(A,4) // 1
// bsearch(-1) // 0
// bsearch(-10000) // 0
// bsearch(30) // 6
// `
// ``

// ### 解法一
// const bsearch = (arr, target) => {
//     if(target<=arr[0]) return 0;
//     if(target>arr[arr.length-1]) return arr.length;
//     // 设置边界值
//     let i = 0;
//     let j = arr.length - 1;
    
//     const getIndex = (arr,target,i,j) => {
//         let idx = Math.round((i + j) / 2);
//         if(arr[idx] === target){
//             return idx;
//         } else if(arr[idx] > target){
//             j = idx - 1;
//         } else {
//             i = idx + 1
//         }
//         if(i>j){
//             return arr[i]>target ? i : i+1;
//         }
//         return getIndex(arr,target,i,j);
//     }
//     return getIndex(arr,target,i,j);
// }
const bsearch = (arr, val) => {
    let left = 0, right = arr.length - 1, mid
    while (left <= right) {
      mid = Math.floor((left + right) / 2)
      if (arr[mid] === val) {
        return mid
      } else if (arr[mid] > val) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    // 运行到这里的 肯定是 left>right
    return left
  }
const A = [3,5,7,13,22,25]
console.log(bsearch(A,5)) // 1
console.log(bsearch(A,12)) // 3
console.log(bsearch(A,13)) // 3
console.log(bsearch(A,14)) // 4
console.log(bsearch(A,4)) // 1
console.log(bsearch(A,3)) // 0
console.log(bsearch(A,-1)) // 0
console.log(bsearch(A,-10000)) // 0
console.log(bsearch(A,30)) // 6
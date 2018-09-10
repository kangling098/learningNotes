// ### 25 2018年9月6日
// 有同学去普华永道，面试官给了这样一道面试题：写一个函数`traverse(A)`螺旋状遍历一个二维数组。 比如 

// ```
// // 遍历3*3
// traverse([1,2,3,4,5,6,7,8,9], 3) // [1,2,3,6,9,8,7,4,5])

// // 遍历4*4
// traverse([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 4)
// // [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]

// ```

// 思路 螺旋遍历 只考虑 n^2形式的数组
// const traverse = (A,n) => {
//     // 可知螺旋循环有如下规律 第一次延n*n正方形的上边遍历 n个数据 
//     // 之后以顺时针顺序,每两轮遍历上一轮遍历数据个数n-1,直到 n=0结束遍历
//     const arr = [];
//     const time = 2*n - 1; //设置循环次数
//     for( i = 1,j=0 ,o =n ;i <= time; i++){
//         if(i ===1 ){
//             let k = 0;
//             while(k<o){
//                 arr.push(A[j+k++]);
//             }
//             j += (k-1) ; // 更新j的值
//             o-=1; // 减少一次单次内部循环的个数
//         }else{
//             if(i % 4 == 1){
//                 let k = 1;
//                 while(k<=o){
//                     arr.push(A[j+k++]);
//                 }
//                 j += (k-1) ; // 更新j的值
//                 o-=1; // 减少一次单次内部循环的个数
//             }
//             if(i % 4 == 2){
//                 let k = 1
//                 while(k<=o){
//                     arr.push(A[j+n*k++]);
//                 }
//                 j += (k-1)*n;  ; // 更新j的值
//             }
//             if(i % 4 == 3){
//                 let k = 1
//                 while(k<=o){
//                     arr.push(A[j-k++]);
//                 }
//                 j -= (k-1); // 更新j的值
//                 o-=1; // 减少一次单次内部循环的个数
//             }
//             if(i % 4 == 0){
//                 let k = 1
//                 while(k<=o){
//                     arr.push(A[j-n*k++]);
//                 }
//                 j -= (k-1)*n; // 更新j的值
//             }
//         }
        
//     }
//     return arr;
// }
// console.log(traverse([1,2,3,4,5,6,7,8,9], 3))// [1,2,3,6,9,8,7,4,5])
// console.log(traverse([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 4))


// function xy(i, N){
//     return [Math.floor(i / N), i % N]
// }
// function d(x, y, N){
//     return Math.min(x, y, N - x - 1, N - y - 1)
// }
// function k(x, y,  N){
//     return x <= y ? x + y : 4*N - (x + y)
// }

// function traverse(A, N) {
//     return A.map((x, i) => [x, ...xy(i, N)])
//         .sort(([v1, x1, y1], [v2,x2,y2]) => {
//         const d1 = d(x1, y1, N)
//         const d2 = d(x2, y2, N)
//         const k1 = k(x1, y1, N)
//         const k2 = k(x2, y2, N)

//         return d1 - d2 || k1 - k2
//     })
//     .map(t => t[0])
// }
// console.log(traverse([1,2,3,4,5,6,7,8,9], 3))

function next(t, p, N) {
    return [x => x % N === N - 1 ? -1 : x + 1, x => x + N, x => x % N === 0 ? -1 : x - 1, x => x - N][t % 4](p)
  }
  
  function traverse(A, N) {
    const B = Array(N * N).fill(false)
  
    let
      i = 0, // 已遍历的个数
      p = 0, // 遍历的节点序号
      t = 0, // 方向
      r = [] // 结果
    while (i < A.length) {
      r[i++] = A[p]
      B[p] = true
      let np = next(t, p, N)
      if (B[np] === undefined || B[np] === true) {
        np = next(++t, p, N)
      }
      p = np
    }
    return r
  }

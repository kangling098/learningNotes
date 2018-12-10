// const swap = (A, i, j) => [A[i], A[j]] = [A[j], A[i]]
const sort = (A, i, x) => {
    let p = i - 1;
    while (p >= 0 && A[p] > x) {
        A[p + 1] = A[p--]
    }
    A[p + 1] = x
}
const insertion_sort = (A) => {
    for (let i = 1; i < A.length; i++) {
        
        sort(A, i, A[i])
    }
}



// const insert = (A, i, x) => {
//     let p = i - 1;
//     while (p >= 0 && A[p] > x) {
//         A[p + 1] = A[p--]
//     }
//     A[p + 1] = x
// }

// const insertion_sort = A => {
//     for (let i = 0; i < A.length; i++) {
//         insert(A, i, A[i])
//     }
// }
const A = [1,3,2,4,9,7,5,6,7,6,77,123,42]
insertion_sort(A)
console.log(A)
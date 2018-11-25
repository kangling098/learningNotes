const insert = (A, i, x) => {
    let p = i - 1; // 定义p为下次需要比较的位置
    while(p >= 0 && A[p] > x){
        A[p + 1] = A[p--]
    }
    A[p + 1] = x
}
const insertion_sort = (A) => {
    for(let i = 0; i < A.length; i++){
        insert(A, i, A[i])
    }
}
const arr = [3,6,5,4,55,443,54,34,54]
insertion_sort(arr)
console.log(arr)
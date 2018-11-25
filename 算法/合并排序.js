const sort = (A, p, q, r) => {
    const A1 = A.slice(p, q)
    const A2 = A.slice(q, r)
    A1.push(-Infinity)
    A2.push(-Infinity)
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] > A2[j] ? A1[i++] : A2[j++]
    }
}
const merge_sort = (A, p, r) => {
    if(r-p < 2 ) return 
    const q = ~~((r+p)/2)
    merge_sort(A,p,q)
    merge_sort(A,q,r)
    sort(A,p,q,r)
}
const arr = [10,5,6,4,2,8,9,3,1,222,-43]
merge_sort(arr,0,arr.length)
console.log(arr)
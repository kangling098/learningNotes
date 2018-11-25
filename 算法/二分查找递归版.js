const bsearch = (A,p,q,x) => {
    if(p>q) return -1
    const guess = ~~((p+q)/2)
    if(A[guess] === x) return guess
    return A[guess] > x ? bsearch(A,p,guess-1,x) : bsearch(A,guess+1,q,x)
}

const arr = [1,2,3,4,5,6,7,8,9,11,22,33,44,55,66,77,777,6666]
console.log(bsearch(arr, 0, arr.length-1,44))
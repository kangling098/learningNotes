const arr = [1,3,5,6,7,8,9,11,23,33,42,44,46,54,55,57,77,88]

const bsearch = (A,target) => {
    let l = 0
    let r = A.length - 1 
    let guess 
    while(l<=r){
        guess = Math.floor((l+r)/2);
        if(A[guess] === target){
            return guess
        }else if(A[guess] < target){
            l = guess + 1
        }else {
            r = guess -1
        }
    }
    return -1
}
console.log(bsearch(arr,22))
console.log(bsearch(arr,23))
console.log(bsearch(arr,33))
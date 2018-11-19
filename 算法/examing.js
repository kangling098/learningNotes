function maxk(arr, k) {
    let s = k
    const swap = (A,i,j) => {
        const t = A[i];
        A[i] = A[j];
        A[j] = t;
    }
    for(let i = 0; i < arr.length;i++){
        s--
        for(let j = 0; j < arr.length-i; j++){
            arr[j-1] > arr[j] &&swap(arr,j-1,j);
        }
        if(s == 0) {
            return arr[arr.length-k]
        }
    }
    return arr
}
let arr = [1,2,3,5,8,2,100,23,7]
console.log(maxk(arr, 5))
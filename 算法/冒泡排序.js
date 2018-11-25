const swap = (A,i,j) => [A[i],A[j]] = [A[j],A[i]]
const bubble_sort = A => {
    for(let i = A.length-1;i>=0; i--){
        for(let j = 0; j < i; j++){
            if(A[j] > A[i]) swap(A,i,j)
        }
    }
}

const arr = [3,6,5,4,55,443,54,34,54]
bubble_sort(arr)
console.log(arr)
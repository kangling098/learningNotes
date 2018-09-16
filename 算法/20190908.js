
const insert = (A,i,x) => { // 空间复杂度O(1)
    // 设置一个循环不变式p 是每次比较的位置
    let p = i - 1;
    while(p>=0 && A[p]>x){
        A[p+1] = A[p--]
    }
    A[p+1] = x;
}

const sort = A =>{
    for(let i =1;i < A.length; i++){
        insert(A,i,A[i])
    }
    return A;
}
console.log(sort([1,2,3,4,5,7,6]))
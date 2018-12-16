const counting_sort = A => {
    const max = Math.max(...A)
    // 累计数组
    const B = Array(max + 1).fill(0)
    // 结果数组
    const C = Array(A.length);
    // 累计位递增
    A.forEach(v => B[v]++)
    // 累计求和
    for(let i = 1; i < B.length; i++ ){
        B[i] += B[i-1] 
    }
    // 取出结果
    for(let i = 0; i < A.length; i++){
        const p = B[A[i]] - 1
        B[A[i]]--;
        C[p] = A[i]
    }
    return C
}
const arr = [4,55,3,440,0,0,0,0,2,33,2,44,5,33,6666,3,5]
console.log(counting_sort(arr))

const reverse = list => {
    const _reverse = p => {
        if(p.next){
            reverse(p.next)
            p.next.next = p.next
            p.next = null
        }else{
            list.head = p
        }
    }
    _reverse(list.head)
}
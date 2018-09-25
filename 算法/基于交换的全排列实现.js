// 基于交换的全排列实现
// 保持A中序号大于k的元素不变, 前k个元素的全排列,存在一种基于交换的递归关系
function permutation(A,k){
    if(k === 1) {return [...A]}
    for(i = n-1;i>= 0; i--){
        swap(A,i,k-1);
        permutation(A,k-1)
        swap(A,i,k-1)
    }
}
// 在一个顺序排列的数组里,查找n的位置,找到了,返回它在数组中的索引,找不到,返回-1
let arr = [2,3,4,55,66,77,88,99,111,121,122,132,233,234]
let getIndex = (arr,num) => {
    if(num<arr[0] || num>arr[arr.length]) return -1;
    let i = 0;
    let j = arr.length - 1;
    return getIndexInner(arr,num,i,j);
}
function getIndexInner(arr,num,i,j){
    
    const current = Math.round((i+j)/2);
    if(arr[current] === num){
        return current;
    }else if (arr[current] > num){
        j = current - 1
    }else if (arr[current] < num){
        i = current + 1
    }
    if(j<i) {
        return -1
    }
    return getIndexInner(arr,num,i,j);
}
console.log(getIndex(arr,-100)) // -1
console.log(getIndex(arr,300)) // -1
console.log(getIndex(arr,6)) // -1
console.log(getIndex(arr,55)) // 3
console.log(getIndex(arr,121)) // 9
console.log(getIndex(arr,132)) // 11
console.log(getIndex(arr,141)) // -1

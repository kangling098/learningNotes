const reverse = arr => {
    let length = arr.length;
    for(let i=0;i<Math.floor(length/2);i++){
        let o = arr[i];
        arr[i] = arr[length-i-1]
        arr[length-i-1] = o;
    }
    return arr;
}
let arr = [1,2,3,4,5]
console.log(reverse(arr))
console.log(arr)
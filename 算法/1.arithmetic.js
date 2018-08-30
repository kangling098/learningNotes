const reverse = (arr,i=0,j=arr.length-1)=>{
    if(i>=j) return arr;
    [arr[i],arr[j]] = [arr[j],arr[i]];
    return reverse(arr,++i,--j);
}
let arr = [1,2,3,4,5,6]
console.log(reverse(arr))
console.log(arr)
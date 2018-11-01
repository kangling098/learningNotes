const insert = (A,i,x) => {
    let p = i-1;
    while(p>=0&&A[p]>x){
        A[p+1] = A[p--]
    }
    A[p+1] = x;
}
const insert_sort = arr => {
    for( i=1 ;i<arr.length ;i++){
        insert(arr,i,arr[i])
    }
}

const arr = [3,6,5,4,55,443,54,34,54]
insert_sort(arr)
console.log(arr)

let nums = [3,2,4], target = 6
var twoSum = function(nums, target) {
    let obj = {};
    nums.forEach((val,key)=> obj['key'+key+'&val'+val] = key)
    for(let i = 0; i < nums.length; i++){
        if(hash.get()[target - nums[i]] !== undefined) return [i,obj[target - nums[i]]]
    }
};
console.log(twoSum(nums,target))
const swap = (arr,i,j)=>{
    let hash = arr[i];
    arr[i] = arr[j];
    arr[j] = hash;
}
const insert = (arr,i) => {

}
const insert_sort = arr => {
    for( i=1 ;i<arr.length ;i++){
        for(let j = i; j>=0; j--){
            if(arr[j] < arr[i] ){
                swap(arr,i,j)
            }
        }
    }
}

const arr = [3,6,5,4,55,443,54,34,54]
insert_sort(arr)
console.log(arr)
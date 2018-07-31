console.time('a')
let arr = [];

for (let i = 0;i<1000000;i++){
    arr.push(i+1);
}
function next(){
    let newArr = []
    for (let i = 10000;i>=1;i--){
        let num = Math.floor(Math.random()*arr.length);
        newArr.push(arr.splice(num,1));
    }
    return newArr.length;
}
console.log(next())
console.timeEnd('a')

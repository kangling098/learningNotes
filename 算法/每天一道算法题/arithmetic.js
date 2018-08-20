// function is_square(num){
//     return Number.isInteger(Math.sqrt(num));
// }
function is_square(num){
    return Math.round(Math.sqrt(num)) === Math.sqrt(num);
}
function is_square(num){
    return Math.sqrt(num)%1 === 0;
}
console.log(is_square(-1))
console.log(is_square(0))
console.log(is_square(3))
console.log(is_square(4))
console.log(is_square(25))
console.log(is_square(26))
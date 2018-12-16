// var uniqueInOrder=function(iterable){
//     return [...iterable].reduce((a,b)=>a + (a[a.length-1] === b ? '' : b),'').split('')
// }
// console.log(uniqueInOrder('AAAABBBCCDAABBB'))

// console.log(Buffer.byteLength("珠峰"))
function expandedForm(num) {
    num+=''
    let s = ''
    for(let i = 0; i < num.length; i++){
        if(num[i]!=='0')s+=num[i]+('0'.repeat(num.length-1-i))+' + '
    }
    return s.substr(0,s.length-3)
}
console.log(expandedForm(12))
console.log(expandedForm(42))
console.log(expandedForm(10731))
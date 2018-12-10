var uniqueInOrder=function(iterable){
    return [...iterable].reduce((a,b)=>a + (a[a.length-1] === b ? '' : b),'').split('')
}
console.log(uniqueInOrder('AAAABBBCCDAABBB'))

console.log(Buffer.byteLength("珠峰"))
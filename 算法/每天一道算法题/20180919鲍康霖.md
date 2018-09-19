### 38 2018年9月19日
写一个函数`is_combination`判断字符串s是不是由字符串p1,p2组成。 例如:


`googlechrome`可以由`ggrome`和`oolech`组成。

```
//例如
//s : googlechrome
//p1: g  g    rome
//p2:  oo lech
 
is_combination('googlechrome', 'ggrome', 'oolech') // true
```

要求，p1,p2组成s后所有字符的顺序仍然保持不变。

tips : 见tips.md

解法一: 可以将改方法拆解为全排列问题,
```js
function is_combination(str,p1,p2){
    const genStr = (str,returnStr,p1,p2,i,j)=>{
        if((!str.startsWith(returnStr))&&(i+j)) return 0;
        let s = 0;
        if(i<p1.length){
            s += genStr(str,returnStr+p1[i],p1,p2,i+1,j)
        }
        if(j<p2.length){
            s += genStr(str,returnStr+p2[j],p1,p2,i,j+1)
        }
        if(i+j === str.length){
            s = returnStr === str ? 1 : 0
        }
        return s
    }
    return genStr(str,'',p1,p2,0,0) === 0 ? false : true;
}
console.log(is_combination('googlechrome', 'ggrome', 'oolech'))
```
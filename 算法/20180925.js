// ## 43 2018年9月25日

// 写一个程序`is_additive(s)`，判断一个字符串是不是加和序列。 如果一个字符串是一个*加和序列*，那么字符串可以被拆分成为这样一个序列，序列的相邻两项和等于下一项。

// ```
// 输入 : s = “235813”
// 输出 : true
// 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13

// 输入 : s = “199100199”
// 输出 : true
// 1 + 99 = 100, 99 + 100 = 199

// 输入 : s = “12345678”
// 输出 : false
// ```
// 解法一:
```js
function _is_additive(s,a,b,arr){
    
    let c = a+b
    arr=[...arr,c]
    let newStr = arr.join('');
    if(newStr.length<s.length){
        return s.startsWith(newStr) ? _is_additive(s,b,c,arr) : 0
    }else{
        return s === newStr ? 1 : 0;
    }
}
function is_additive(s){
    let returnNum = 0;
    for(let i=1;i<s.length;i++){
        let a = Number(s.slice(0,i));
        for(let j = i;j<s.length;j++){
            let b = Number(s.slice(i,j));
            let c = a+b;
            if(s.startsWith([a,b,c].join(''))){
                returnNum += _is_additive(s,b,c,[a,b,c])
            }
        }
    }
    return returnNum === 0 ? false : true;
}
console.log(is_additive('235813'))
console.log(is_additive('199100199'))
console.log(is_additive('12345678'))
```

function is_additive(s, p = []) {
    if(s.length === 0) {
      return p.length >= 3
    }
  
    // 递归体循环递归每种取字符的情况
    for(let i = 1; i <= s.length; i++) {
      const v = parseInt( s.slice(0, i) )
      const tail = s.slice(i)
      if (
        p.length < 2 || (
          p.length >= 2 &&
          p[p.length - 1] + p[p.length - 2] === v
        )
      ) { 
        if (is_additive(tail, p.concat(v))) {
          return true
        }
      }
    }
    return false
  }
  console.log(is_additive('235813'))
console.log(is_additive('199100199'))
console.log(is_additive('1001101102'))
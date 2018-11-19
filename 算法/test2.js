// 题目2:计算词频
// 小明需要写一个程序要统计英文文章的词频，函数名称term_freq(doc)。

// 只考虑英文字母（大写按照小写处理）
// 其他字符（数字、中文等等其他符号）都视为分隔符
// 例如：

// term_freq('Tom practise programing every day. Join practise alg every night. 123456')
// 返回：

// {
//   alg: 1
//   day: 1
//   every: 2
//   join: 1
//   night: 1
//   practise: 2
//   programing: 1
//   tom: 1
// }
// 例如：

// term_freq('aaa bbb c1c')
// 返回:

// {
//   aaa : 1,
//   bbb : 1,
//   c:2
// }
const term_freq = doc => {
    const obj = {};
    const str = doc.toLowerCase();
    const isEn = st => st.charCodeAt() <= 122 && st.charCodeAt() >= 97 // 检验是否为英文
    let longStr='';
    for(let i = 0; i < str.length; i++){
        if(isEn(str[i])){
            longStr += str[i]
            if(i == str.length-1){
                obj[longStr] = obj[longStr] ? obj[longStr] + 1 : 1;
            }
        }else{
            obj[longStr] = obj[longStr] ? obj[longStr] + 1 : 1;
            longStr = ''
        }
    }
    delete obj['']
    return obj
}
console.log(term_freq('Tom practise programing every day. Join practise alg every night. 123456'))
console.log(term_freq('aaa bbb c1c'))
// 学习数据结构-栈，写一个函数match(str)，判断一个字符串中的小括号是否匹配。
class Stack {
    constructor(max = 1000){
        this.max = max;
        this.sp = -1;
        this.data = Array(max);
    }
    push(item){
        if(this.sp+2 > this.max){
            throw 'stack overflow'
        }
        this.data[++this.sp] = item;
    }
    pop(){
        if(this.sp-1<-1){
            throw 'stack underflow'
        }
        return this.data[this.sp--];
    }
}
const match = str =>{
    const arr = str.split('');
    const stack = new Stack(arr.length) ;
    arr.forEach(val=>{
        stack.push(val);
    })
    let num = 0;
    while(stack.sp !== -1){
        let str = stack.pop();

        if(str === '('){
            
            num++
        }else if (str === ')'){
            num--
        }
    }
    return num === 0 ? true : false;
}
console.log(match('abc()def')) // true
console.log(match('(1+2()')) // false
console.log(match('(1+2+3+5*2*(3+7))')) // true

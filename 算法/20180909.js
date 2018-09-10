// 某AI创业公司前端团队面试题，写一个函数`sort`，对一个只有字符的数组进行排序，比如说`['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd']` 

// 要求： 
// 1. 大写在前，小写在后
// 2. 大小写字母之间的顺序不能改变，比如AaBbCcDd排序后应该是ABCDabcd。
// 3. 不能使用额外空间。 

function swarp(A, i, j) {
    let a = A[i];
    A[i] = A[j];
    A[j] = a;
}

const bubble_sort = (A,compareFunc) => {
    for (let i = A.length - 1; i >= 1; i--) {
        for (let j = 0; j < i; j++) {
            if(compareFunc(A[j],A[j+1])>0){
                swarp(A,j,j+1)
            }
        }
    }
}

function create(){
    let obj = {};
    console.log(arguments)
    let constructor = [].shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    console.log(arguments)
    let result = constructor.apply(obj,arguments);
    return typeof result === 'object' ? result : obj;
}
new Object(()=>{this.a = a},3,4,5,5)
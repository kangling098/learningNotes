// 题目2:找零钱
// 汽水5块钱1瓶，顾客排队来你这里买，但是顾客可能会给你5,10,20元的钞票。

// 一开始你没有零钱
// 写一个程序change来判断是否能完成找零
// 用一个数组表示顾客每次给你的钞票
// 例1：

// change([5,5,10,10]) // true
// 第1个顾客给你5块钱
// 第2个顾客给你5块钱
// 第3个顾客给你10块钱，你找零5块
// 第4个顾客给你10块钱， 你找零5块
// 程序返回true代表可以完成找零
// 例2：

// change([5,5,10,10,20]) // false
// 最后一个顾客我们不能给15块的找零，所以返回false


function change(bills) {
  const moneyStore = {
    5 : [],
    10 : [],
  }
  for(let i = 0; i < bills.length; i++){
    if(bills[i] === 5) {
      moneyStore[5].push(1)
    }else if(bills[i] === 10){
      if(!moneyStore[5].length) return false
        moneyStore[5].pop();
        moneyStore[10].push(10);
      
    }
  }
}
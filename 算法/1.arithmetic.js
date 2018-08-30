// const floor_power_of2 = num => 2**Math.floor(Math.log2(num));


const floor_power_of2 = num => num<=0 ? NaN : 2**Math.floor(Number.isInteger(Math.log2(num)) ? Math.log2(num) - 1: Math.log2(num));
console.log(floor_power_of2(64))
console.log(floor_power_of2(63))
console.log(floor_power_of2(33))
console.log(floor_power_of2(32))
console.log(floor_power_of2(0))
console.log(floor_power_of2(0.5))


18. 2018年8月30日题目 答案
写一个函数floor_power_of2，求比x小的最大二的整数次幂。
例如

floor_power_of2(64) // 64
floor_power_of2(63) // 32
floor_power_of2(33) // 32
floor_power_of2(32) // 32
答案:

function floor_power_of2(x){
  x = x | (x >> 1)
  x = x | (x >> 2)
  x = x | (x >> 4)
  x = x | (x >> 8)
  x = x | (x >> 16)
  x = x | (x >> 32)
  return x - (x >> 1)
}

参考:
算法是要取x最高位，最左边的二进制位。 x | (x >> 1)相当于将所有1位置复制到它下一个位置： 0b101010 | (0b101010 >> 1 // 0b111111
可以通过仔细分析x=0b101010和x=0b100000去理解这个算法，最终在return之前算法会得到0b11111……的二进制数
答案2：

function floor_power_of2(x) {
  return 1 << Math.floor( Math.log2(x) )
}

// 目前的大部分PC答案2更快。 因为CPU支持log等数学指令。
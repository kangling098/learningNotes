// const floor_power_of2 = num => 2**Math.floor(Math.log2(num));


const floor_power_of2 = num => num<=0 ? NaN : 2**Math.floor(Number.isInteger(Math.log2(num)) ? Math.log2(num) - 1: Math.log2(num));
console.log(floor_power_of2(64))
console.log(floor_power_of2(63))
console.log(floor_power_of2(33))
console.log(floor_power_of2(32))
console.log(floor_power_of2(0))
console.log(floor_power_of2(0.5))

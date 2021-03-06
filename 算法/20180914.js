
// 参考递归第一节，设计一个程序`solve_hanoi_tower(disks, from, to, use)`，打印汉诺塔的移动步骤， 比如移动3个：

// ```
// solve_hanoi_tower(['i', 'j', 'k'],'A', 'B', 'C')
// i,j,k代表碟子，k最小，i最大
// A,B,C是三个位置
// ```

// 输出：
// ```
// k A->B
// j A->C
// k B->C
// i A->B
// k C->A
// j C->B
// k A->B
// ```
// 解法一: 递归汉诺塔
// ```js
// function solve_hanoi_tower(disks, from, to, use){
//     if(disks.length === 1){
//         console.log(`${disks[0]} ${from}->${to}`)
//     }else{
//         solve_hanoi_tower(disks.slice(1), from, use, to);
//         console.log(`${disks[0]} ${from}->${to}`)
//         solve_hanoi_tower(disks.slice(1), use, to, from);
//     }
    
// }
// solve_hanoi_tower(['i', 'j', 'k'],'A', 'B', 'C')
// ```

function move_tower(disks,num, from, to, use){
    if(num === 1){
        console.log(`${disks[disks.length-num]} ${from}->${to}`)
    }else{
        move_tower(disks,num-1, from, use, to)
        console.log(`${disks[disks.length-num]} ${from}->${to}`)
        move_tower(disks,num-1, use, to, from)
    }
}
function solve_hanoi_tower(disks, from, to, use){
    move_tower(disks,disks.length, from, to, use)
}
solve_hanoi_tower(['i', 'j', 'k'],'A', 'B', 'C')
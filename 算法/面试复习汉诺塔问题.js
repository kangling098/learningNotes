// 参考递归第一节，设计一个程序`solve_hanoi_tower(disks, from, to, use)`，打印汉诺塔的移动步骤， 比如移动3个：

// ```
// solve_hanoi_tower(['i', 'j', 'k'],'A', 'B', 'C')
// // i,j,k代表碟子，k最小，i最大
// // A,B,C是三个位置
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


const solve_hanoi_tower = (disks, from, to, use) => {
    if(disks.length == 1) return console.log(`${disks[0]} ${from}->${to}`)
    const newDisks = disks.slice(1,disks.length)
    solve_hanoi_tower(newDisks,from,use,to)
    solve_hanoi_tower([disks[0]],from,to,use)
    solve_hanoi_tower(newDisks,use,to,from)
}
solve_hanoi_tower(['i', 'j', 'k'],'A', 'B', 'C')
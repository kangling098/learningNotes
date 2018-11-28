// ### 44 2018年9月26日

// 观看老鼠走迷宫的视频（回溯算法），写一个老鼠走迷宫算法`rat_in_maze(maze)`返回路径，再写一个函数`print`打印迷宫和走的过程，打印老鼠走的路径。 

// ```
// const maze = [
//   [0,1,0,0,0,0],
//   [0,1,0,1,1,0],
//   [0,0,0,1,0,1],
//   [1,1,0,0,0,1],
//   [0,0,0,1,1,1],
//   [2,1,0,0,0,0]
// ]

// print( rat_in_maze(maze) )

// ```

// 上述程序执行结果为:
// ```
// x 1 0 0 0 0
// x 1 0 1 1 0
// x x x 1 0 1
// 1 1 x 0 0 1
// x x x 1 1 1
// x 1 0 0 0 0
// ```

const maze = [
  [0,1,0,0,0,0],
  [0,1,0,1,1,0],
  [0,0,0,1,0,1],
  [1,1,0,0,0,1],
  [0,0,0,1,1,1],
  [2,1,0,0,0,0]
]

// maze为迷宫 pos为老鼠所在初始的位置 path为老鼠走出迷宫的路径 tranverse为老鼠走过的路径
const rat_in_maze = (maze, pos = [0, 2], path = [[...pos]], transverse = {}) => {
    const [x ,y] = pos
    console.log(x,y)
    if(maze[x][y] == 2) { // 基础条件
        return path
    }
    transverse[x * maze[0].length + y] = true // 在已走过的地方,进行一次记录 (tranverse毕竟是一个记录点)
    // 获取下一步,老鼠可能走得位置的集合  由于老鼠走得位置可能会撞到墙
    const nextStepArr = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([x, y]) => {
        return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && !transverse[x * maze[0].length + y] && maze[x][y] !== 1
    })
    console.log()
    for(let i = 0; i < nextStepArr.length; i++) {
        const newP = rat_in_maze(maze, nextStepArr[i], [...path, [...nextStepArr[i]]], transverse)
        if(newP) return newP
    }
}
console.log(rat_in_maze(maze))
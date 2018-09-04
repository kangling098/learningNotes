# Node使用事件驱动，非阻塞I/O 模型


## ui线程 js线程
- 是互斥的,不能同时执行,执行js后空闲下来了,再去执行css

## js单线程(主线程)
- 只能是单线程的 不能两个线程同时操作一个dom

## 多线程
- 有的时候可能浪费资源,切换时间片

## webworker
- 我有一些计算的功能,可以使用webworker来计算

## 队列&栈
- 队列 先进先出 (事件队列)
- 栈 先进后出 (执行栈)

## 宏任务 微任务 (执行时机不一样)
- 常见的宏任务 setTimeout setImmediate
- 常见的微任务 promise.then方法 process.nextTick()

## 
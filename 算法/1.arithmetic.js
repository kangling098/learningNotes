// 001-分页计算
// 在一个分页表格中,给定每页条数(pageSize)和元素的序号(index),求页码

const pageNow = Math.ceil((index+1)/pageSize)

// pageSize = 10 
// 0->1
// 9->1
// 10->2
// 11->2
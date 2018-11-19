// 题目3:转换树状结构
// 上一波程序员们离职的时候留下一些旧数据，是一种树状结构，但是用了数组进行描述。

//  [
//   {id : 25, pid : 10, name : 'apple'}, 
//   {id : 100,  pid :1, name : 'tree'}, 
//   {id : 10, pid : 1, name : 'fruit'}, 
//   {id : 35, pid : 10, name : 'grape'}, 
//   {id : 1,  pid :0, name : 'plant'}, 
//   {id : 123,  pid :100, name : 'pine tree'}, 
//   {id : 155,  pid :100, name : 'elm'}, 
// ]
// 数据大致有这样的特性：

// 约10W量级
// id<20W,
// 父子节点通过id-pid进行关联，父节点id小于子节点
// 没有重复的id
// 树的层级不确定有多少级，但不会太大
// 整理好的数据，children中节点需要按照id从小到大排序
// 以下是整理好的数据格式：

//  {
//   id: 1,
//   pid: 0,
//   name: 'plant',
//   children: [
//     {
//       id: 10,
//       pid: 1,
//       name: 'fruit',
//       children: [{
//         id: 25,
//         pid: 10,
//         name: 'apple'
//       }, {
//         id: 35,
//         pid: 10,
//         name: 'grape'
//       }],
//     },
//     {
//       id : 100,
//       pid : 1,
//       name: 'tree',
//       children: [{
//         id : 123,
//         pid : 100,
//         name: 'pine tree'
//       }, {
//         id : 155,
//         pid : 100,
//         name: 'elm'
//       }],
//     }
//   ]
// }
// 试下一个函数to_tree(list)完成上述过程。




const list =  [
    {id : 25, pid : 10, name : 'apple'}, 
    {id : 100,  pid :1, name : 'tree'}, 
    {id : 10, pid : 1, name : 'fruit'}, 
    {id : 35, pid : 10, name : 'grape'}, 
    {id : 1,  pid :0, name : 'plant'}, 
    {id : 123,  pid :100, name : 'pine tree'}, 
    {id : 155,  pid :100, name : 'elm'}, 
  ]
const to_tree = list => {
    const obj = {};
    list.forEach(val=>{
        obj[val.id] = val
    })
    let arr = Object.keys(obj)
    arr.forEach(val=>{
        const parent = obj[obj[val].pid]
        if(parent){
            if(Array.isArray(parent.children)){
                parent.children.push(obj[val])
            }else{
                parent.children = [obj[val]]
            }
        }
    })
    return obj[arr[0]]
}
console.log(to_tree(list))

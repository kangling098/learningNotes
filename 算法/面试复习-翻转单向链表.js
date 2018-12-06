// 写一个递归函数`reverse`，反转一个链表。链表是由next和value构成的一个结构体链，next指向下一个节点，value是节点中存储的值。

// 链表节点结构示例：
// ```
// class Node {
//   constructor(v){
//     this.next = null
//     this.value = v
//   }
// }
// ```

// 例如:
// ```
// // 构造一个链表
// const a = new Node('a')
// const b = new Node('b')
// const c = new Node('c')
// const d = new Node('d')
// a.next=b
// b.next=c
// c.next=d

// // 执行reverse函数
// reverse(a) 

// console.log( d.next.value ) // c
// console.log( c.next.value ) // b
// console.log( b.next.value ) // a


// // 提示： 见tips.md

// ```

class ListNode {
    constructor(key) {
        this.key = key
        this.next = null
    }
}
class SingleList {
    constructor() {
        this.head = null
    }
    insert(key) {
        const node = new ListNode(key)
        if (this.head) node.next = this.head
        this.head = node
    }
    // 翻转单向链表
    reverse(p = this.head) {
        if(p.next){
            this.reverse(p.next)
            p.next.next = p
            p.next = null
        }else {
            this.head = p
        }
    }
}

const list = new SingleList

list.insert('a')
list.insert('b')
list.insert('c')
list.insert('d')
list.insert('e')
console.log(list)
list.reverse()
console.log(list)

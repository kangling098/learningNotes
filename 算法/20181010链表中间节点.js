
// 写一个函数`center(list)`找到一个链表的中间节点。
//  如果链表有基数个节点，那么返回中心节点。 
// 如果链表有偶数个节点，返回中间偏左的节点。 

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    print() {
        let str = '';
        let p = this.head
        while (p !== null) {
            str += p.key + '<->';
            p = p.next;
        }
        console.log(str += 'NULL');
    }
    insert(node) {
        if(!(node instanceof ListNode)){
            node = new ListNode(node);
        }
        if (this.tail === null) {
            this.tail = node;
        }
        if (this.head !== null) {
            this.head.prev = node;
            node.next = this.head;
        }
        this.head = node;
    }
    merge(list) {
        this.tail.next = list.head;
        list.head.prev = this.tail;
        this.tail = list.tail;
    }

}
class ListNode {
    constructor(key) {
        this.prev = null
        this.next = null
        this.key = key
    }
}

// 解法一: 空间复杂度高 O(n) 时间复杂度O(n)
const center = (list)=>{
    let p = list.head
    const arr = []
    while(p){
        arr.push(p)
        p = p.next;
    }
    return arr.length % 2 ? arr[~~(arr.length/2)] : arr[arr.length/2-1]
}
// 解法二 时间复杂度O(n)
const center = (list)=>{
    let p = list.head
    if(p==null) return null
    let count = 0
    while(p){
        count++;
        p = p.next;
    }
    count = count % 2 ? ~~(count/2) : count/2-1
    p = list.head;
    while(count){
        count--
        p = p.next;
    }
    return p
}
const list = new DoubleLinkedList()
console.log(center(list) )// null
list.insert(4)
list.insert(3)
list.insert(2)
list.insert(1)
// list = 1-2-3-4
const node = center(list) // node.key = 2
console.log(node)
list.insert(5)
// list = 5-1-2-3-4
const node2 = center(list) // node.key = 2
console.log(node2)

// 解法三
function center(list) {
    let fast = list.head,  // 快指针，每次移动两个
        slow = list.head   // 慢指针，每次移动一个
  
    while(fast) {
      fast = fast.next
      fast && (fast = fast.next)
      fast && (fast = fast.next)
      fast && (slow = slow.next)
    }
    return slow
  }


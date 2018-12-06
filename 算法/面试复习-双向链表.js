// // 学习`链表`一节，完善双向链表的`打印`，`插入`和`合并`操作。 为了让合并操作可以在O(1)完成，除了头指针head外，还需要维护一个尾指针tail。


// ``` javascript
// class DoubleLinkedList {
//   constructor(){
//     // 指向链表开头
//     this.head = null
//     // 指向链表末尾
//     this.tail = null
//   }

//   /**
//    * 打印链表
//    */
//   print(){
//     /// TODO    
//   }

//   /**
//    * 插入一个键为{key}的元素到链表头部
//    */
//   insert(key){
//     /// TODO 
//   }

//   /**
//    * 将list合并到链表末尾
//    */
//   merge(list) {
//     /// TODO
//   }
// }

// class DoubleLinkedList {
//     constructor () {
//         // 指向链表开头
//         this.head = null
//         // 指向链表末尾
//         this.tail = null
//     }

//     // 打印链表
//     print () {
//         let str = 'NULL'
//         if( !this.tail ) return console.log(str)
//         let node = this.tail
//         while( node ) {
//             str = node.key + '<->' + str
//             node = node.prev
//         }
//         console.log(str)
//     }
//     /**
//      * 插入一个键为{key}的元素到链表头部
//      */
//     insert(key){
//         let node = new ListNode(key)
//         if( this.head ){
//             this.head.prev = node
//             node.next = this.head
//         }
//         this.head = node
//         if( !this.tail ) this.tail = node
        
//     }
//     /**
//      * 将list合并到链表末尾
//      */
//     merge(list) {
//         if( !list.head ) return 
//         this.tail.next = list.head
//         this.tail = list.tail
//     }
//     // 翻转链表 
//     reverse () {
        
//         if( !this.tail ) return 
//         const tranverse = node => {
//             let prev = node.prev
//             let next = node.next
//             console.log(prev,next)
//             node.prev = next
//             node.next = prev
//         }
//         let node = this.head
//         // while( node ){
//         //     tranverse(node)
//         //     node = node.prev
//         // }
//         tranverse(node)
       
//     }
// }
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
    reverse () {
        
        if( !this.tail ) return 
        const tranverse = node => {
            let prev = node.prev
            let next = node.next
            console.log(prev,next)
            node.prev = next
            node.next = prev
        }
        let node = this.head
        this.tail = node
        while( node ){
            tranverse(node)
            if( !node.prev ){
                this.head = node
            }
            node = node.prev
        }
        
    }

}

// NULL<->A<-B<->C<->NULL

class ListNode {
    constructor (key) {
        this.key = key
        this.prev = null
        this.next = null
    }
}

const list = new DoubleLinkedList()
list.print()
// 输出: NULL
for(let i = 0; i < 5; i++) {
  list.insert( String.fromCharCode('A'.charCodeAt(0) + i) )
}
list.print()
// 输出: E<->D<->C<->B<->A<->NULL

list.insert('X')
list.print()
// 输出: X<->E<->D<->C<->B<->A<->NULL

const list2 = new DoubleLinkedList()
list2.insert('Q')
list2.insert('P')
list2.insert('O')
list2.print()
// 输出 O<->P<->Q<->NULL


list2.merge(list)
list2.print()
list2.reverse()
list2.print()
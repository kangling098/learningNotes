// ### 37 2018年9月18日
// 写一个递归函数`reverse`，反转一个链表。链表是由next和value构成的一个结构体链，next指向下一个节点，value是节点中存储的值。

// 链表节点结构示例：
```
class Node {
  constructor(v){
    this.next = null
    this.value = v
  }
}
```

// 例如:
```
// 构造一个链表
const a = new Node('a')
const b = new Node('b')
const c = new Node('c')
const d = new Node('d')
a.next=b
b.next=c
c.next=d

// 执行reverse函数
reverse(a) 

console.log( d.next.value ) // c
console.log( c.next.value ) // b
console.log( b.next.value ) // a


// 提示： 见tips.md

```
// 解法一
```js
// 创建链表类
class Node {
    constructor(val){
        this.next = null;
        this.value = val;
    }
}
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
a.next = b;
b.next = c;
c.next = d;

function reverse(node) {
    if (node.next) {
        reverse(node.next)
        node.next.next = node
        node.next = null
    }
}
reverse(a)
console.log( d.next.value ) // c
console.log( c.next.value ) // b
console.log( b.next.value ) // a
```
// 解法二:
```js
const reverse = (node) => {
    if(node.next){
        reverse(node.next);
        node.next.next = node;
        node.next = null
    }
}

```

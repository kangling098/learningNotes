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

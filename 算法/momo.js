function binaryTree2SumTree(root){
    if(root.left&&root.right){
        root.value = binaryTree2SumTree(root.left).value + binaryTree2SumTree(root.right).value;
    }
    return root
}
class Node {
    constructor(parent,left,right){
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}
let bl1= {value:1}
let br1= {value:1}
let cl1= {value:3}
let cl2= {value:3}
let cr1= {value:3}
let cr2= {value:3}
let a= {value:3,left:bl1,right:br1}

let node1 = new Node(bl1,cl1,cr1);
let node2 = new Node(br1,cl2,cr2);
let node3 = new Node(a,bl1,br1);
console.log(binaryTree2SumTree(a))
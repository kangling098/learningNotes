
function ListNode(val) {
    this.val = val;
    this.next = null;
}
const listCreate = str => {
    let arr = [...str];
    const l3 = new ListNode(+arr.pop());
    let l4 = l3
    arr.reverse().forEach((val,key)=>{
        l4.next = new ListNode(+val)
        l4 = l4.next;
    })
    return l3
}
let l1 = listCreate('1000000000000000000000000000001');
let l2 = listCreate('465');
var addTwoNumbers = function(l1, l2) {
    const getStr = (listItem,obj) => {
        obj.str = listItem.val + obj.str
        if(listItem.next){
            getStr(listItem.next,obj)
        }
        return obj.str
    }
    
    let l1s = getStr(l1,{str:''})
    let l2s = getStr(l2,{str:''})
    let numberStr = +l1s+(+l2s) ;
    console.log(numberStr)
    return listCreate(numberStr.toLocaleString())
};
console.log(addTwoNumbers(l1,l2))
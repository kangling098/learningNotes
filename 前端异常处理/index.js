// window.__myWebLogTracker__.modifyConfig({debug:true});
window.addEventListener('error', function(e) {
  console.log(e)
})

/* DOMException start */
// 操作不存在的dom
function NOT_FOUND_ERR() {
  var node = document.getElementsByTagName('h1').item(0);
  var refnode = node.nextSibling;
  var newnode = document.createTextNode('这就是为何你挂了！');
  node.insertBefore(newnode, refnode);
}

function NAMESPACE_ERR() {
  let element = 
document.createElementNS('4444wo是xxx!!!¥¥¥¥$$$_+_+~!"""@@@', '3333wo是xxx!!!¥¥¥¥$$$_+_+~!"""@@@')
}


function INVALID_ACCESS_ERR() {
  document.getElementById('h1').getFloatValue
}

/* DOMException end */

// DOMException

// NOT_FOUND_ERR();
// NAMESPACE_ERR()
// INVALID_ACCESS_ERR()

// DOMError

// function TimeoutError(url) {
//   const xml = new XMLHttpRequest()
//   xml.onreadystatechange=state => console.log(state);
//   xml.open("GET",url,true);
//   xml.send(null)

// }
// setTimeout(()=>{
//   TimeoutError('http://10.5.217.42:3008/aaa')
// })

// function copy(obj){
//   // if(hash.has(obj)) return hash.get(obj);
//   if(typeof obj !== 'object' || obj === null) return obj;
//   if(obj instanceof Date) return new Date(obj);
//   if(obj instanceof RegExp) return new RegExp(obj);
//   // 兼容Moments等库
//   if(obj.clone) return obj.clone();
//   let o = new obj.constructor();
//   // hash.set(obj,o);
//   for(let key in obj){
//       if(obj.hasOwnProperty(key)) o[key] = copy(obj[key]);
//   }
//   return o;
// }
// const a = {b: 0,c: 1, d:2}
// a.b = a;
// const newA = copy(a)
setTimeout(function(){
  let a = ccc
},100)
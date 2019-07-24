function NOT_FOUND_ERR() {
  var node = document.getElementsByTagName('h1').item(0);
  var refnode = node.nextSibling;
  var newnode = document.createTextNode('这就是为何你挂了！');
  node.insertBefore(newnode, refnode);
}

function imgError(num){
  setTimeout(()=>{
    // NOT_FOUND_ERR()
    console.log(num)
    $('body').append('<img src="" alt="我是浏览器插件插入的img标签,我的src为空,我的错误处理函数不存在" onerror="cefQuery()" />');
    // scriptError()
  },num * 1000)
}
// let d = ddd
function scriptError(){
  $('body').append('<script>eval(a=c)</script>');
}

// imgError(1);
// imgError(2);
// imgError(3);
// imgError(4);

// const scriptEle = document.createElement('script');
// scriptEle.setAttribute('src', './a.js')
// $('#h1').append('<script src="./a.js"></script>');
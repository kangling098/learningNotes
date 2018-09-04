// 模块的分类 三大类
// 1.内置模块 核心模块 fs path http 加载速度比较高
const fs = require('fs');
const path = require('path');
console.log(path.resolve('a'))
console.log(path.dirname('/asd/dsa/da/dsa/dsa/a.txt'))

const vm = require('vm');
const mime = require('mime');
console.log(path.extname('a.b.c.js'))
console.log(path.basename('a.b.c.d.js','d.js'))

vm.runInThisContext(`console.log('3')`)
console.log(mime.getType('a.vue'))

function Module(p){
    this.id = p; 
    this.loaded = false;
    this.exports = {};
}

Module.wrapper = [`(function(exports,require,module,__filename,__dirname){`,`})`];
Module._extensions = {
    '.js' : function(module){
        // 读取js文件 增加一个闭包
        let script = fs.readFileSync(module.id,'utf8');
        let fn = Module.wrapper[0] + script + Module.wrapper[1];
        vm.runInThisContext(fn).call(module.exports,module.exports,req.module,module.id,path.dirname(module.id));
        return module.exports;
    },
    '.json': function(module){
        return JSON.parse(fs.readFileSync(module.id,'utf8'));
    },
    '.node':' xxx'
}
Module._cacheModule = {} // 根据的是绝对路径进行缓存
// 解析绝对路径的方法 返回一个绝对路径
Module._resolveFileName = function(moduleId){
    let p = path.resolve(moduleId);
    // 没有后缀我再加上后缀 如果传过来的有后缀我就不用加了
    if(!path.extname(moduleId)){
        let arr = Object.keys(Module._extensions);
        for(let i = 0; i< arr.length;i++){
            let file = p + arr[i];
            try {
                fs.accessSync(file);
                return file;
            }catch(e){

            }
        }
    }else{
        return p;
    }
}
// 模块加载的方法
Module.prototype.load = function(filepath){
    // 判断加载的文件时json还是node还是js
    let ext = path.extname(filepath);
    let content = Module._extensions[ext](this);
    return content;
}
function req(moduleId){
    let p = Module._resolveFileName(moduleId);
    if(Module._cacheModule[p]){
        return Module._cacheModule[p].exports;
    }
    let module = new Module(p); // 没有缓存的话就生成一个模块
    // 加载模块
    let content = module.load(p);
    module.loaded = true;
    module.exports = content;
    Module._cacheModule[p] = module;
    return module.exports

}

const curry = func => {
    const g = (...allArgs) => allArgs.length >= func.length ?
      func(...allArgs) : (...args) => g(...allArgs, ...args)
    return g
  }

  const curry = func => {
      const g = (...allArgs) => allArgs.length >= func.length ? func(...allArgs): (...args)=> g(...allArgs,...args) ;
      return g;
  }
  function _add(a, b, c, d){
    return a + b + c + d
  }
  
  const add = curry(_add)
  
  console.log( add(1,2,3) ) // 函数
  console.log( add(1)(2) ) // 函数
  console.log( add(1)(2)(3) ) // 函数
  console.log ( add(1)(2)(3)(4) ) // 10
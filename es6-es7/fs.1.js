const fs = require('fs');
const path = require('path');

function req(mod){
    let filePath = path.join(__dirname,mod);
    let content = fs.readFileSync(filePath,'utf8');
    let fn = new Function('exports','require','module','__filename','__dirname',content+'\n return module.exports')
    let module = {
        exports: {}
    };
    return fn(module.exports,req,module,__filename,__dirname);
}

(function(modules){
    function require(moduleId){
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require('./index.js');
})({
    './index.js' : 
    (function(module,exports,require){
        eval("console.log('hello);\n\n")
    })
})
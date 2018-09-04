let fs = require('fs');
let path = require('path');
let b = req('./b.js');
function req(mod) {
    let filename = path.join(__dirname, mod);
    let content = fs.readFileSync(filename, 'utf8');
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + '\n return module.exports;');
    let module = {
        exports: {}
    };

    return fn(module.exports, req, module, __filename, __dirname);
}
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;

    }
    return require("./index.js");
})
    ({
        "./index.js":
            (function (module, exports, require) {
                eval("console.log('hello');\n\n");
            })
    });
// #! /usr/bin/env node
const pathLib = require('path');
const fs = require('fs');
let ejs = require('ejs');
let cwd = process.cwd();
let { entry, output: { filename, path } } = require(pathLib.join(cwd, './webpack.config.js'));
let script = fs.readFileSync(entry, 'utf8');
let bundle = `
(function (modules) {
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;

    }
    return require("<%-entry%>");
})
    ({
        "<%-entry%>":
            (function (module, exports, require) {
                eval("<%-script%>");
            })
    });
`
let bundlejs = ejs.render(bundle, {
    entry,
    script
});
try {
    fs.writeFileSync(pathLib.join(path, filename), bundlejs);
} catch (e) {
    console.error('编译失败 ', e);
}
console.log('compile sucessfully!');
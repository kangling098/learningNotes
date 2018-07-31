let esprima = require('esprima');
let estracerse = require('estraverse');
let escodegen = require('escodegen');
let code = 'function ast(){}';
let ast = esprima.parse(code);
console.log(ast)
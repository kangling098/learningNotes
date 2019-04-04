const chalk = require('chalk');
const log = console.log;

// Combine styled and normal strings
log(chalk.blue.underline.bold('Hello') + ' World' + chalk.red('!'));
const err = {
  "capturedTime": 1552993387355,
  "capturedType": "onerror",
  "stacktraceFrames": [{
    "filename": "https://eis-test.mypaas.com.cn/performance/page_load",
    "in_app": true
  }],
  "exceptionType": "SyntaxError",
  "exceptionValue": "Unexpected token <"
}
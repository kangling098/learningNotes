const chalk = require('chalk');
const log = console.log;
 
// Combine styled and normal strings
log(chalk..blue.underline.bold('Hello') + ' World' + chalk.red('!'));
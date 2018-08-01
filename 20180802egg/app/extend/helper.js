let moment = require('moment');
exports.format = function(ts){
  return moment(new Date(ts)).format('YYYY:MM:DD hh:mm:ss')
}
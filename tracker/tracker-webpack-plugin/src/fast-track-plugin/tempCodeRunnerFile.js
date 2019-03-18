const crypto = require('crypto')
let hmac = crypto.createHmac('sha1','6a786cf41e3a84ac');
const data = {
  product_code: 'fast',
  app_code: 'analysis',
  timestamp: '1552037158',
}
const string = Object.keys(data).sort().map((val) => val + '=' + data[val]).join('&');
console.log(string)
hmac.update(string);

console.log(hmac.digest('hex'))
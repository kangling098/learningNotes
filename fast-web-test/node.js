const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express()
app.use('/', express.static('./dist'))
var router = express.Router();

app.use(proxy('/api', { target: 'https://eis-test.mypaas.com.cn/', changeOrigin: true }))
app.listen(8000)


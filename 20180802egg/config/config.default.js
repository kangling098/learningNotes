module.exports = app => {
  const config = {}
  config.keys = 'zfpx' // 加密cookie
  config.view = {
    defaultViewEngine: 'ejs',
    mapping:{
      '.ejs': 'ejs'
    }
  }
  config.middleware = ['time','robot'];
  config.robot = {
    uas:[
      /google/i
    ]
  }
  config.time={};
  return config;
}
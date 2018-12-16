const APIV1 = '/api/admin'                // 如果API 后端已实现 请在对应service中 使用此请求前缀
const APIV2 = '/test/admin'               // 如果API 后端未实现 请在对应service中 使用此请求前缀（MOCK 中，只能使用APIV2）
const verifyImg  = 'http://172.23.18.18:8005/'  // 验证码地址

module.exports = {
  name: 'ZKEY-ADMIN',
  prefix: 'zkeysAdmin',
  title: 'ZKEYS管理系统',
  footerText: 'zkeys  © 2018 niaoyun.com',
  logo: '/public/logo.png',
  successJson: {
    RequestId: '4C467B381111111-3910-447D-87BC-AC049166F216',
    Code: 'Success',
  },
  errorJson: {
    RequestId: '111111111111111111',
    Code: 'MissingParameter.CommandId',
    Message: '出错说明~~ 巴拉巴拉',
  },
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api',
  APIV1,
  APIV2,
  verifyImg,
  api: {
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV1}/test`,
  },
}

/*
  静态常量
*/

// 默认API忽略地址
export const DEFAULT_IGNORE_API = [
  'prod.cn-hangzhou.log.aliyuncs.com',      // 探针自身上报地址
  'growingio.com',                          // growingio上报地址
  'sensorsdata.cn',                         // 神策上报地址
  'hm.baidu.com',                           // 百度分析上报地址
  'google-analytics.com',                   // 谷歌分析上报地址
  'tingyun.com',                            // 听云上报地址
];

// 日志数据上报的接口地址
export const SEND_URL = 'https://prod.cn-hangzhou.log.aliyuncs.com/logstores/web_original_log/track?APIVersion=0.6.0';

// 挂在window下全局对象的变量名称
export const GLOBAL_KEY = '__myWebLogTracker__';

// 最大referrer截取长度
export const MAX_REFERRER_LEN = 200;

// API空闲判断时长（ms）
export const API_FREE_TIMEOUT = 3000;

// 日志数据url请求大小限制(16kb 留1kb作为缓冲)
export const MAX_LOG_SIZE = 15 * 1024;

// 每一批的日志最大条数
export const MAX_LOG_NUM = 10;

// 上报数据的类型
export const REPORT_TYPES = {
  start: 'start',                               // 开始
  pause: 'pause',                               // 退出到后台
  resume: 'resume',                             // 从后台唤醒
  page_stay: 'page_stay',                       // 页面停留
  page_load: 'page_load',                       // 页面加载
  page: 'page',                                 // 页面切换
  click: 'click',                               // 点击事件
  api: 'api',                                   // API接口
  error: 'error',                               // 报错
  log: 'log',                                   // 日志
};

// 设备类型
export const DEVICE_TYPES = {
  pc: 'PC Web',                                 // PC浏览器
  mobile: 'Mobile Web',                         // 移动浏览器
  weixin: 'WeChat APP',                         // 微信内置浏览器
  app: 'HybridApp',                             // 混合APP Web View
};

// 上报参数名称映射表
export const PARAMS_NAME_MAP = {
  // 基础数据
  product: 'p',                         // 产品唯一标识；名称或编码，推荐使用编码
  app: 'a',                             // 产品中应用唯一标识；名称或编码，推荐使用编码
  app_type: 'at',                       // 产品应用类型
  tenant: 'tn',                         // SaaS产品中的租户；名称或编码，推荐使用编码
  user_id: 'u',                         // 终端用户唯一标识；根据客户端或设备生成
  real_user_id: 'ru',                   // 产品真实用户唯一标识；id或编码，推荐使用编码
  device_screen_width: 'dsw',           // 设备宽度
  device_screen_height: 'dsh',          // 设备高度
  os_name: 'osn',                       // 操作系统名称
  os_version: 'osv',                    // 操作系统版本
  browser_name: 'bn',                   // 浏览器名称
  browser_version: 'bv',                // 浏览器版本
  time: 't',                            // 上报Unix时间戳
  domain: 'd',                          // 页面域名host
  page: 'pg',                           // 当前所在页面path
  title: 'te',
  referrer: 'r',                        // 来源
  log: 'l',                             // 自定义日志内容
  // 事件类型
  event: 'e',                           // 事件
  // element event only
  element_type: 'et',                   // 事件源元素类型
  element_content: 'ec',                // 事件源元素内容
  element_path: 'ep',                   // 事件源元素DOM路径
  // page only
  stay_time: 'st',                      // 页面、窗口停留时间(ms)
  page_load_time: 'plt',                // 页面、窗口加载时间(ms)
  page_render_time: 'prt',              // 页面、窗口渲染时间(ms)
  page_id: 'pid',                       // 页面唯一标识
  // api only
  api: 'api',                           // 数据接口地址
  api_method: 'apim',                   // 数据接口请求方式
  api_status: 'apis',                   // 数据接口响应状态码
  api_response_time: 'apit',            // 数据接口响应时间(ms)
  api_response_content_length: 'apil',  // 数据接口响应内容长度(byte)
  // ----------- 移动设备专用 -----------
  device_manufacturer: 'dmf',           // 设备制造商
  device_model: 'dmd',                  // 设备型号
  device_orientation: 'do',             // 设备方向
  m_app_channel: 'ac',                  // 应用渠道
  m_app_id: 'aid',                      // 应用唯一标识（Android：PackageName iOS：BundleID）
  m_app_version: 'av',                  // 移动应用版本
  m_app_framework_version: 'afv',       // 移动应用框架版本（cordova）
  network: 'nt',                        // 网络类型
  longitude: 'lng',                     // 经度
  latitude: 'lat',                      // 维度
  is_root: 'ir',                        // 移动应用设备是否Root
  cpu_architectures: 'ca',              // CPU架构
  available_ram: 'ram',                 // 可用内存(MB)
  available_rom: 'rom',                 // 可用存储(MB)
};



### 当前探针上报数据类型

```js
{
  const REPORT_TYPES = {
  start: 'start',                               // hybrid开始 (小程序可以实现,改写app钩子函数)
  pause: 'pause',                               // hybrid退出到后台(小程序可以实现,改写app钩子函数)
  resume: 'resume',                             // hybrid从后台唤醒(小程序可以实现,改写app钩子函数)
  page_stay: 'page_stay',                       // 页面停留(小程序可以实现,改写app钩子函数)
  page_load: 'page_load',                       // 页面加载（未知,小程序加载方式与传统）
  page: 'page',                                 // 页面切换(小程序可以实现,改写app钩子函数)
  click: 'click',                               // 点击事件(小程序无click事件,tap事件代替)
  api: 'api',                                   // API接口(小程序可以实现)
  error: 'error',                               // 报错(小程序可以实现,错误堆栈跟踪存疑)
  log: 'log',                                   // 日志(小程序可以实现)
}
```
上报信息
```js
const PARAMS_NAME_MAP = {
  // 基础数据
  product: 'p',                         // 产品唯一标识；名称或编码,推荐使用编码(开发者配置)
  app: 'a',                             // 产品中应用唯一标识；名称或编码,推荐使用编码(开发者配置)
  app_type: 'at',                       // 产品应用类型(开发者配置)
  tenant: 'tn',                         // SaaS产品中的租户；名称或编码,推荐使用编码(开发者配置)
  user_id: 'u',                         // 终端用户唯一标识；根据客户端或设备生成(探针生成)
  real_user_id: 'ru',                   // 产品真实用户唯一标识；id或编码,推荐使用编码(开发者注册)
  device_screen_width: 'dsw',           // 设备宽度(通过wx.getSystemInfo  screenWidth 获取)
  device_screen_height: 'dsh',          // 设备高度(通过wx.getSystemInfo  screenHeight 获取)
  os_name: 'osn',                       // 操作系统名称(通过wx.getSystemInfo  system 获取)
  os_version: 'osv',                    // 操作系统版本(通过wx.getSystemInfo  system 获取)
  browser_name: 'bn',                   // 浏览器名称(无)
  browser_version: 'bv',                // 浏览器版本(无)
  time: 't',                            // 上报Unix时间戳(探针生成)
  domain: 'd',                          // 页面域名host(无)
  page: 'pg',                           // 当前所在页面path(用户配置)
  title: 'te',
  referrer: 'r',                        // 来源(无)
  log: 'l',                             // 自定义日志内容(未知,需要参考神策,growing-io源码)
  // 事件类型
  event: 'e',                           // 事件(可以获取,具体实现需要参考growing-io源码)
  // element event only
  element_type: 'et',                   // 事件源元素类型(小程序可以获取事件源组件类型)
  element_content: 'ec',                // 事件源元素内容(无)
  element_path: 'ep',                   // 事件源元素DOM路径(无)
  // page only
  stay_time: 'st',                      // 页面、窗口停留时间(ms)(通过重写App方法,代理传入的对象参数 onUnload,实现参考神策探针源码)
  page_load_time: 'plt',                // 页面、窗口加载时间(ms)(通过重写App方法,代理传入的对象参数 实现参考神策探针源码,具体规则还需要整理,初步判断劫持onLoad)
  page_render_time: 'prt',              // 页面、窗口渲染时间(ms)(通过重写App方法,代理传入的对象参数 实现参考神策探针源码,具体规则还需要整理,初步判断劫持onReady)
  page_id: 'pid',                       // 页面唯一标识(探针生成)
  // api only
  api: 'api',                           // 数据接口地址(重写wx.request方法)
  api_method: 'apim',                   // 数据接口请求方式(重写wx.request方法)
  api_status: 'apis',                   // 数据接口响应状态码(重写wx.request方法)
  api_response_time: 'apit',            // 数据接口响应时间(ms)(重写wx.request方法)
  api_response_content_length: 'apil',  // 数据接口响应内容长度(byte)(重写wx.request方法)
  // ----------- 移动设备专用 -----------
  device_manufacturer: 'dmf',           // 设备制造商(通过wx.getSystemInfo  screenHeight 获取)
  device_model: 'dmd',                  // 设备型号(通过wx.getSystemInfo  screenHeight 获取)
  device_orientation: 'do',             // 设备方向(通过wx.onDeviceMotionChange监听设备方向改变,只有出发的时候才能获取)
  m_app_channel: 'ac',                  // 应用渠道(无)
  m_app_id: 'aid',                      // 应用唯一标识（Android：PackageName iOS：BundleID）(获取方式未知)
  m_app_version: 'av',                  // 移动应用版本(无,考虑替换为微信版本)
  m_app_framework_version: 'afv',       // 移动应用框架版本 cordova(无,考虑替换为客户端基础库版本)
  network: 'nt',                        // 网络类型(通过wx.getNetworkType获取)
  longitude: 'lng',                     // 经度(通过wx.getLocation获取)
  latitude: 'lat',                      // 维度(通过wx.getLocation获取)
  is_root: 'ir',                        // 移动应用设备是否Root(无)
  cpu_architectures: 'ca',              // CPU架构(无)
  available_ram: 'ram',                 // 可用内存(MB)(无)
  available_rom: 'rom',                 // 可用存储(MB)(无)
};
```





### 探针开发难点
1. 没有开发过小程序,需要对小程序开发进行学习.
2. 小程序api和浏览器端不同,其实现方式不一样,所有api都是微信自己提供的,原探针代码大部分无法复用.
3. 无法直接拦截/监听请求（参考growing io 这个可以解决）

    微信请求统一通过微信API完成 ,请求模块已被微信方封装,且小程序的运行环境不是浏览器对象,不像web应用那样重写封装很自如.
4. 三种运行环境的监控兼容性保证
    - Android 上,js运行环境是 X5 内核
    - iOS 上,js 运行环境是 JavaScriptCore
    - 开发工具上, js运行环境是 nwjs（chrome内核）

5. 用户行为无法直接监听(需参考growing-io,代码比较复杂,还在整理)
6. 强扩展性
    需要适用于多种架构设计场景（小程序）使用(taro,vue等,参考grpwing-io)
7. sdk需要轻量
    每个小程序的包存在2M的限制,并且小程序不支持在代码中引入npm包,故 sdk会占用2M的大小限制,小程序有分包功能,这一块还要探究,但是所有包总大小不能超过8M
,
### 评估
由于小程序本身api与浏览器端不同,无法获取到window对象,document对象.探针的小程序实现无法复用当前探针的大部分逻辑.

探针小程序实现需要重写一个新的探针,主要以参考growing-io 神策的探针实现方案为主,收集天眼探针需要的参数指标.

开发之前需要对小程序相关知识进行深度学习.



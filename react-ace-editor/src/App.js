import React, {
    Component
} from 'react';

import AceEditor from 'react-ace';

import 'brace/mode/mysql';
import 'brace/snippets/mysql';
import 'brace/theme/github';
import "brace/ext/language_tools";
import "brace/ext/searchbox";
class App extends Component {
    render() {
        return ( 
            <div className = "App" >
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="mysql"
                  theme="github"
                  name="blah2"
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={`function onLoad(editor) {
                    console.log("i've loaded");
                  }`
                  }
                  commands={[ 'p',
                    'a',
                    'at',
                    'tn',
                    'u',
                    'ru',
                    'ug',
                    'dsw',
                    'dsh',
                    'osn',
                    'osv',
                    'bn',
                    'bv',
                    'd',
                    'pg',
                    'pid',
                    'ps',
                    'te',
                    'r',
                    'tv',
                    't',
                    'l',
                    'e',
                    'et',
                    'ec',
                    'ep',
                    'st',
                    'plt',
                    'prt',
                    'api',
                    'apim',
                    'apis',
                    'apit',
                    'apil',
                    'dmf',
                    'dmd',
                    'do',
                    'ac',
                    'aid',
                    'av',
                    'afv',
                    'nt',
                    'ir',
                    'ca',
                    'ram',
                    'rom',
                    's',
                    'wv' ]}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    
                  }}/>
            </div>
        );
    }
    onChange = (...args) => console.log(args)
}

export default App;



const PARAMS_NAME_MAP = {
  // ---------基础数据----------
  product: 'p',                         // 产品唯一标识；名称或编码，推荐使用编码
  app: 'a',                             // 产品中应用唯一标识；名称或编码，推荐使用编码
  app_type: 'at',                       // 产品应用类型
  // 用户相关数据
  tenant: 'tn',                         // SaaS产品中的租户；名称或编码，推荐使用编码
  user_id: 'u',                         // 终端用户唯一标识；根据客户端或设备生成(使用openid)
  real_user_id: 'ru',                   // 产品真实用户唯一标识；id或编码，推荐使用编码
  user_group: 'ug',                     // 用户分组
  // 设备相关数据
  device_screen_width: 'dsw',           // 设备宽度
  device_screen_height: 'dsh',          // 设备高度
  os_name: 'osn',                       // 操作系统名称
  os_version: 'osv',                    // 操作系统版本
  browser_name: 'bn',                   // 浏览器名称
  browser_version: 'bv',                // 浏览器版本
  // 前端页面相关
  domain: 'd',                          // 页面域名host
  page: 'pg',                           // 当前所在页面path
  page_id: 'pid',                       // 页面唯一标识
  page_search: 'ps',                    // 当前页面的search参数
  title: 'te',                          // 页面标题
  referrer: 'r',                        // 来源
  // 其他
  tracker_version: 'tv',                // 使用的当前探针版本
  time: 't',                            // 上报Unix时间戳
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
  m_app_version: 'av',                  // 替换为小程序版本
  m_app_framework_version: 'afv',       // 小程序基础库版本
  network: 'nt',                        // 网络类型
  is_root: 'ir',                        // 移动应用设备是否Root
  cpu_architectures: 'ca',              // CPU架构
  available_ram: 'ram',                 // 可用内存(MB)
  available_rom: 'rom',                 // 可用存储(MB)
  scene: 's',                           // 小程序场景值
  wechart_version: 'wv',                // 微信版本
}

console.log(Object.keys(PARAMS_NAME_MAP).map(val => PARAMS_NAME_MAP[val]).join('|'))
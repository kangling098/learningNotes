const filter = [
  [
    'domain', // 页面域名
    'page', // 页面地址
    'referer', // 页面来源
    'tenant', // 租户编码
    'real_user_id', // 真实用户
    'user_id', // 唯一标识
    'ip', // IP地址
    'country', //国家
    `province`, //string  省份
    `city`, //string  城市
    'isp' // 网络类型
  ],
  [
    'product', // 产品编码
    'app', // 应用编码
    'app_type', // 上报应用形态
    'm_app_channel', // 应用渠道
    'm_app_id', // App_id
    'm_app_version', // App_Version
    'm_app_framework_version' // Cordova_Version
  ],
  [
    'os_name', // 操作系统
    'os_version', // 操作系统版本
    'browser_name', // 浏览器名称
    'browser_version', // 浏览器版本
    'device_manufacturer', // 设备
    'device_model', // 设备型号
    'm_is_root', // is_root
    'm_cpu_architectures', // cpu_architectures
    'm_available_ram' // 可用内存
  ]

]
import {
  uuid
} from './utils';
export default class MyWebLogTracker {
  constructor () {
    const wxSystemInfo = wx.getsysteminfosync();
    const systemArr = wxSystemInfo.system.split('');
    const baseData = {
      device_screen_width: wxSystemInfo.screenWidth,
      device_screen_height: wxSystemInfo.screenHeight,
      os_name: systemArr[0],
      os_version: systemArr[1],
      time: Date.now(),
      page: getCurrentPages().reverse()[0].route,
      page_id: uuid(),
      device_manufacturer: wxSystemInfo.brand,
      device_model: wxSystemInfo.model,
      device_orientation: '',
    }
    wx.onDeviceMotionChange((data) => {
      console.log(data)
    })
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId


        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        console.log(res)
      }
    })
  }
}

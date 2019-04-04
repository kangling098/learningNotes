export const uuid = function() {
  // 随机数
  const R = function () {
    return Math.random().toString(16).replace('.', '').substr(0, 8);
  };
  // 根据当前时间生成的字串
  const T = function () {
    let d = (1 * new Date()).toString(32);
    if (d.length >= 8) {
      d = d.substr(0, 8);
    } else {
      for (let i = 0; i < 8 - d.length; i++) {
        d += R().slice(-1);
      }
    }
    return d;
  };
  // userAgent
  const UA = function () {
    const systemInfo = wx.getSystemInfoSync();

    const ua = systemInfo.SDKVersion + systemInfo.system + systemInfo.version + systemInfo.model;
    let i;
    let ch;
    let buffer = [];
    let ret = 0;
    const xor = function (result, byte_array) {
      let j;
      let tmp = 0;
      for (j = 0; j < byte_array.length; j++) {
        tmp |= (buffer[j] << j * 8);
      }
      return result ^ tmp;
    };
    for (i = 0; i < ua.length; i++) {
      ch = ua.charCodeAt(i);
      buffer.unshift(ch & 0xFF);
      if (buffer.length >= 4) {
        ret = xor(ret, buffer);
        buffer = [];
      }
    }
    if (buffer.length > 0) {
      ret = xor(ret, buffer);
    }
    return ret.toString(16);
  };
  return `${T()}-${R()}-${UA()}`;
}
// 上传类,用来控制提交到后端数据的队列
class Uploader { //
  constructor(t) {
    this.growingio = t;
    this.messageQueue = [];
    this.uploadingQueue = [];
    this.uploadTimer = null;
    this.projectId = this.growingio.projectId;
    this.appId = this.growingio.appId;
    this.host = this.growingio.host;
    this.url = `${this.host}/projects/${this.projectId}/apps/${this.appId}/collect`
  }
  upload(t) {
    this.messageQueue.push(t);
    const e = this.messageQueue.length;
    e > 100 && (this.messageQueue = this.messageQueue.slice(e - 100)); 
    this.uploadTimer || (this.uploadTimer = setTimeout(() => {
      this._flush(); 
      this.uploadTimer = null
    }, 1e3))
  }
  forceFlush() {
    this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null);
    this._flush();
  }
  _flush() {
    this.uploadingQueue = this.messageQueue.slice();
    this.messageQueue = [];
    this.uploadingQueue.length > 0 && wx.request({
      url: `${this.url}?stm=${Date.now()}`,
      header: {
        "content-type": "application/json"
      },
      method: "POST",
      data: this.uploadingQueue,
      success: () => {
        this.messageQueue.length > 0 && this._flush()
      },
      fail: () => {
        this.messageQueue = this.uploadingQueue.concat(this.messageQueue)
      }
    })
  }
}

// 工具方法
var Utils = {
  sdkVer: "1.8.9",
  devVer: 1,
  guid: function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return ("x" == t ? e : 3 & e | 8).toString(16)
    })
  },
  getScreenHeight: function (t) {
    return Math.round(t.screenHeight * t.pixelRatio)
  },
  getScreenWidth: function (t) {
    return Math.round(t.screenWidth * t.pixelRatio)
  },
  getOS: function (t) {
    if (t) {
      var e = t.toLowerCase();
      return -1 != e.indexOf("android") ? "Weixin-Android" : -1 != e.indexOf("ios") ? "Weixin-iOS" : t
    }
  },
  getOSV: t => `Weixin ${t}`,
  isEmpty: t => {
    for (var e in t)
      if (t.hasOwnProperty(e)) return !1;
    return !0
  }
};

// 页面类,用来存储当前page
class Page$1 {
  constructor() {
    this.queries = {}
  }
  touch(t) { // 传入page实例,获得page的 url, 当前时间, search参数
    this.path = t.route;
    this.time = Date.now();
    this.query = this.queries[t.route] ? this.queries[t.route] : void 0
  }
  addQuery(t, e) { // e为search 各字段组成的对象
    this.queries[t.route] = e ? this._getQuery(e) : null
  }
  _getQuery(t) { // 获取search字符串
    return Object.keys(t).map(e => `${e}=${t[e]}`).join("&")
  }
}

// 监听的事件类型
const eventTypeMap = {
  tap: ["tap", "click"],
  longtap: ["longtap"],
  input: ["input"],
  blur: ["change", "blur"],
  submit: ["submit"],
  focus: ["focus"]
},
fnExpRE = /^function[^\(]*\([^\)]+\).*[^\.]+\.([^\(]+)\(.*/;



// 和mpvue有關，具体原理有待学习
function getComKey(t) { 
return t && t.$attrs ? t.$attrs.mpcomid : "0"
}

// 和mpvue有關，具体原理有待学习
function getVM(t, e) {
  void 0 === e && (e = []);
  var i = e.slice(1);
  return i.length ? i.reduce(function (t, e) {
    for (var i = t.$children.length, n = 0; i > n; n++) {
      var s = t.$children[n];
      if (getComKey(s) === e) return t = s
    }
    return t
  }, t) : t
}

function getHandle(t, e, i) {
  void 0 === i && (i = []); // i为undefined的话,设置i为 [];
  var n = [];
  if (!t || !t.tag) return n;
  var s = t || {},
    r = s.data;
  void 0 === r && (r = {});
  var o = s.children;
  void 0 === o && (o = []);
  var a = s.componentInstance;
  a ? Object.keys(a.$slots).forEach(function (t) {
    var s = a.$slots[t];
    (Array.isArray(s) ? s : [s]).forEach(function (t) {
      n = n.concat(getHandle(t, e, i))
    })
  }) : o.forEach(function (t) {
    n = n.concat(getHandle(t, e, i))
  });
  var h = r.attrs,
    g = r.on;
  return h && g && h.eventid === e && i.forEach(function (t) {
    var e = g[t];
    "function" == typeof e ? n.push(e) : Array.isArray(e) && (n = n.concat(e))
  }), n
}
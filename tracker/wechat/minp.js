// 上传类,用来控制提交到后端数据的队列
class Uploader { //
  constructor(t) {
    this.growingio = t; // 
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
  guid: function () { // 获取guid
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return ("x" == t ? e : 3 & e | 8).toString(16)
    })
  },
  getScreenHeight: function (t) { // 获取屏幕高度
    return Math.round(t.screenHeight * t.pixelRatio)
  },
  getScreenWidth: function (t) { // 获取屏幕宽度
    return Math.round(t.screenWidth * t.pixelRatio)
  },
  getOS: function (t) { // 获取系统类型
    if (t) {
      var e = t.toLowerCase();
      return -1 != e.indexOf("android") ? "Weixin-Android" : -1 != e.indexOf("ios") ? "Weixin-iOS" : t
    }
  },
  getOSV: t => `Weixin ${t}`, // 获取系统版本
  isEmpty: t => { // 判断当前对象是否为不含本身属性的对象
    for (var e in t)
      if (t.hasOwnProperty(e)) return !1;
    return !0
  }
};

// 页面类,用来存储当前page
class Page$1 {
  constructor() {
    this.queries = {} // queries对象
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
/**
 * 
 * @param {*} t : o._vnode
 * @param {*} e : dataset.eventid
 * @param {*} i : eventTypeMap[对应事件类型] 传入的是数组
 */
function getHandle(t, e, i) {
  void 0 === i && (i = []); // 传入的事件数组为空时,设置为空数组
  var n = [];
  if (!t || !t.tag) return n; // 如果虚拟dom _vnode不存在,或者 _vnode.tag 不存在,返回空数组
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

// mpvue 相关
class VueProxy {
  constructor(t) {
    this.vueVM = t
  }
  getHandle(t) { // 获取到绑定事件名称 返回值为bindTap bindLongtap bindChange
    // t为事件对象
    // {
    //   "type": "tap",
    //   "timeStamp": 895,
    //   "target": {
    //     "id": "tapTest",
    //     "dataset": {
    //       "hi": "WeChat"
    //     }
    //   },
    //   "currentTarget": {
    //     "id": "tapTest",
    //     "dataset": {
    //       "hi": "WeChat"
    //     }
    //   },
    //   "detail": {
    //     "x": 53,
    //     "y": 14
    //   },
    //   "touches": [
    //     {
    //       "identifier": 0,
    //       "pageX": 53,
    //       "pageY": 14,
    //       "clientX": 53,
    //       "clientY": 14
    //     }
    //   ],
    //   "changedTouches": [
    //     {
    //       "identifier": 0,
    //       "pageX": 53,
    //       "pageY": 14,
    //       "clientX": 53,
    //       "clientY": 14
    //     }
    //   ]
    // }
    var e = t.type, // 获取事件类型
      i = t.target; // 获取事件触发对象
    void 0 === i && (i = {}); // 如果不存在
    var n = (t.currentTarget || i).dataset; // 获取事件标签上的dataset
    void 0 === n && (n = {}); // 如果dataset不存在,做兼容,将获取到的dataset对象设置为空对象
    var s = n.comkey; // 获取dataset.comkey (用于找到真实dom)
    void 0 === s && (s = ""); // 如果comkey不存在设置为空字符串
    var r = n.eventid, // dataset 上的eventid
      o = getVM(this.vueVM, s.split(",")); // 根据真实dom找到虚拟dom
    if (o) { // 如果存在虚拟dom
      var a = getHandle(o._vnode, r, eventTypeMap[e] || [e]); // 获取虚拟dom上的事件
      if (a.length) {
        var h = a[0];
        if (h.isProxied) return h.proxiedName; // 返回wxml上绑定的事件的名称 例 bindTap
        try {
          var g = ("" + h).replace("\n", "");
          if (g.match(fnExpRE)) {
            var u = fnExpRE.exec(g);
            if (u && u.length > 1) return u[1]
          }
        } catch (t) {}
        return h.name
      }
    }
  }
}


/**
 * 观察者
 * 
 */
class Observer {
  constructor(t) {
    this.growingio = t; // gio实例
    this.weixin = t.weixin; // 微信实例(作用待确认)
    this.currentPage = new Page$1; // 当前page实例
    this.scene = null; // 场景值
    this._sessionId = null; // 
    this.cs1 = null;
    this.lastPageEvent = void 0;
    this.lastVstArgs = void 0;
    this.lastCloseTime = null;
    this.lastScene = void 0; // 最后的场景值
    this.keepAlive = t.keepAlive; // 超时时间
    this.isPauseSession = !1;
    this._observer = null;
    this.CLICK_TYPE = { // 归类为点击事件的事件类型
      tap: "clck",
      longpress: "lngprss",
      longtap: "lngprss"
    }
  }
  get sessionId() { // 获取sessionId时,判断是否有_sessionId,不存在时,调用Utils.guid()生成guid
    return null === this._sessionId && (this._sessionId = Utils.guid()), this._sessionId
  }
  resetSessionId() { // 重置sessionId
    this._sessionId = null
  }
  pauseSession() { // 设置isPauseSession为true
    this.isPauseSession = !0 // true
  }
  getVisitorId() { // 返回微信.uid
    return this.weixin.uid
  }
  getUserId() { // 获取userId
    return this.cs1
  }
  setUserId(t) { // 设置userId 如果cs1的长度小于100,将t设置为userId 处罚 _sendEvent
    var e = t + "";
    e && 100 > e.length && (this.cs1 = e, this.lastPageEvent && this._sendEvent(this.lastPageEvent))
  }
  clearUserId() { // 清除userId
    this.cs1 = null
  }
  collectImp(t, e = null) { // 未调用,不知道有什么作用
    this.growingio.vue && (t = t.$mp.page);
    this.growingio.taro && (t = t.$scope);
    var i = {};
    this._observer && this._observer.disconnect();
    this._observer = t.isComponent ? t.createIntersectionObserver({
      observeAll: !0
    }) : wx.createIntersectionObserver(t, {
      observeAll: !0
    });
    this._relative = e ? this._observer.relativeTo(e) : this._observer.relativeToViewport();
    this._relative.observe(".growing_collect_imp", t => {
      t.id && !i[t.id] && (this.track(t.dataset.gioTrack && t.dataset.gioTrack.name, t.dataset.gioTrack && t.dataset.gioTrack.properties), i[t.id] = !0)
    })
  }
  appListener(t, e, i) { // 
    if (!this.isPauseSession) { // 当不是PauseSession时
      this.growingio.debug && console.log("App.", e, Date.now());
      if ("onShow" == e) {
        this._parseScene(i), !this.lastCloseTime || Date.now() - this.lastCloseTime > this.keepAlive || this.lastScene && this.scene !== this.lastScene ? (this.resetSessionId(), this.sendVisitEvent(i, this.growingio.getLocationType), this.lastVstArgs = i, this.lastPageEvent = void 0) : this.useLastPageTime = !0
      } else if ("onHide" == e) {
        this.lastScene = this.scene, this.growingio.forceFlush(), this.weixin.syncStorage(), this.isPauseSession || (this.lastCloseTime = Date.now(), this.sendVisitCloseEvent())
      } else {
        "onError" == e && this.sendErrorEvent(i)
      }


      // 下侧为原代码
      // "onShow" == e ? (this._parseScene(i), !this.lastCloseTime || Date.now() - this.lastCloseTime > this.keepAlive || this.lastScene && this.scene !== this.lastScene ? (this.resetSessionId(), this.sendVisitEvent(i, this.growingio.getLocationType), this.lastVstArgs = i, this.lastPageEvent = void 0) : this.useLastPageTime = !0) : "onHide" == e ? (this.lastScene = this.scene, this.growingio.forceFlush(), this.weixin.syncStorage(), this.isPauseSession || (this.lastCloseTime = Date.now(), this.sendVisitCloseEvent())) : "onError" == e && this.sendErrorEvent(i)
    }
  }
  pageListener(t, e, i) {
    if (this.growingio.debug && console.log("Page.", t.route, "#", e, Date.now()), "onShow" === e) this.isPauseSession ? this.isPauseSession = !1 : (this.currentPage.touch(t), this.sendPage(t));
    else if ("onLoad" === e) {
      Utils.isEmpty(n = i[0]) || this.currentPage.addQuery(t, n)
    } else if ("onHide" === e) this._observer && this._observer.disconnect();
    else if ("onShareAppMessage" === e) {
      var n = null,
        s = null;
      2 > i.length ? 1 === i.length && (i[0].from ? n = i[0] : i[0].title && (s = i[0])) : (n = i[0], s = i[1]), this.pauseSession(), this.sendPageShare(t, n, s)
    } else if ("onTabItemTap" === e) {
      this.sendTabClick(i[0])
    }
  }
  actionListener(t, e) { // t为事件对象  e为函数名称 bindtap="login" login就是e
    if ("handleProxy" === e && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
      let i = new VueProxy(this.growingio.vueRootVMs[this.currentPage.path]).getHandle(t);
      i && (e = i)
    }

    // this.growingio.taroRootVMs && this.growingio.taroRootVMs[e] && (e = this.growingio.taroRootVMs[e]);
    // this.growingio.debug && console.log("Click on ", e, Date.now());

    "tap" === t.type || "longpress" === t.type ? this.sendClick(t, e) : -1 !== ["change", "confirm", "blur"].indexOf(t.type) ? this.sendChange(t, e) : "getuserinfo" === t.type ? (this.sendClick(t, e), t.detail && t.detail.userInfo && this.setVisitor(t.detail.userInfo)) : "getphonenumber" === t.type ? this.sendClick(t, e) : "contact" === t.type ? this.sendClick(t, e) : "submit" === t.type && this.sendSubmit(t, e)


    if ('tap' === t.type || 'longpress' === t.type) {
      this.sendClick(t, e)
    } else if (-1 !==  ["change", "confirm", "blur"].indexOf(t.type)) {
      this.sendChange(t, e)
    } else if ("getuserinfo" === t.type) {
      this.sendClick(t, e);
      t.detail && t.detail.userInfo && this.setVisitor(t.detail.userInfo)
    } else if ("getphonenumber" === t.type){
      this.sendClick(t, e)
    } else if ("contact" === t.type){
      this.sendClick(t, e)
    } else if ("submit" === t.type){
      this.sendSubmit(t, e)
    } 
  }
  getLocation(t = "wgs84") {
    this.growingio.getLocation = !0;
    
    this.sendVisitEvent(this.lastVstArgs, t)
  }
  track(t, e) {
    if (null !== t && void 0 !== t && 0 !== t.length) {
      var i = {
        t: "cstm",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        n: t
      };
      null !== e && "object" == typeof e && (i.var = e), this._sendEvent(i)
    }
  }
  identify(t, e) {
    void 0 !== t && 0 !== t.length && (this.growingio.login(t), this._sendEvent({
      t: "vstr",
      var: {
        openid: t,
        unionid: e
      }
    }))
  }
  setVisitor(t) {
    this._sendEvent({
      t: "vstr",
      var: t
    })
  }
  setUser(t) {
    this._sendEvent({
      t: "ppl",
      var: t
    })
  }
  setPage(t) {
    this._sendEvent({
      t: "pvar",
      ptm: this.currentPage.time,
      p: this.currentPage.path,
      q: this.currentPage.query,
      var: t
    })
  }
  setEvar(t) {
    this._sendEvent({
      t: "evar",
      var: t
    })
  }
  sendVisitEvent(t, e = "wgs84") {
    e = -1 !== ["wgs84", "gcj02"].indexOf(e) ? e : "wgs84";
    var i = this.weixin.systemInfo,
      n = {
        t: "vst",
        tm: Date.now(),
        av: Utils.sdkVer,
        db: i.brand,
        dm: i.model.replace(/<.*>/, ""),
        sh: Utils.getScreenHeight(i),
        sw: Utils.getScreenWidth(i),
        os: Utils.getOS(i.platform),
        osv: Utils.getOSV(i.version),
        l: i.language
      };
    if (this.growingio.appVer && (n.cv = this.growingio.appVer + ""), t.length > 0) {
      var s = t[0];
      n.p = s.path, Utils.isEmpty(s.query) || (n.q = this.currentPage._getQuery(s.query)), n.ch = `scn:${this.scene}`, s.referrerInfo && s.referrerInfo.appId && (n.rf = s.referrerInfo.appId)
    }
    this.weixin.getNetworkType().then(t => {
      t && (n.nt = t.networkType, this.growingio.getLocation ? this.weixin.requestLocation(e).then(() => {
        null != this.weixin.location && (n.lat = this.weixin.location.latitude, n.lng = this.weixin.location.longitude), this._sendEvent(n)
      }) : this._sendEvent(n))
    })
  }
  sendVisitCloseEvent() {
    this._sendEvent({
      t: "cls",
      p: this.currentPage.path,
      q: this.currentPage.query
    })
  }
  sendErrorEvent(t) {
    if (t && t.length > 0) {
      let e = t[0].split("\n");
      if (e && e.length > 1) {
        let t = e[1].split(";");
        if (t && t.length > 1) {
          let i = t[1].match(/at ([^ ]+) page (.*) function/),
            n = {
              key: e[0],
              error: t[0]
            };
          i && i.length > 2 && (n.page = i[1], n.function = i[2]), this._sendEvent({
            t: "cstm",
            ptm: this.currentPage.time,
            p: this.currentPage.path,
            q: this.currentPage.query,
            n: "onError",
            var: n
          })
        }
      }
    }
  }
  sendPage(t) {
    var e = {
      t: "page",
      tm: this.currentPage.time,
      p: this.currentPage.path,
      q: this.currentPage.query
    };
    this.lastPageEvent ? (e.rp = this.lastPageEvent.p, this.useLastPageTime && (e.tm = this.lastPageEvent.tm, this.useLastPageTime = !1)) : e.rp = this.scene ? `scn:${this.scene}` : null, t.data && t.data.pvar && (e.var = t.data.pvar);
    var i = this.weixin.getPageTitle(t);
    i && i.length > 0 && (e.tl = i), this._sendEvent(e), this.lastPageEvent = e
  }
  sendPageShare(t, e, i) {
    this._sendEvent({
      t: "cstm",
      ptm: this.currentPage.time,
      p: this.currentPage.path,
      q: this.currentPage.query,
      n: "onShareAppMessage",
      var: {
        from: e ? e.from : void 0,
        target: e && e.target ? e.target.id : void 0,
        title: i ? i.title : void 0,
        path: i ? i.path : void 0
      }
    })
  }
  sendClick(t, e) {
    var i = {
        t: this.CLICK_TYPE[t.type] || "clck",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      },
      n = t.currentTarget,
      s = {
        x: `${n.id}#${e}`
      };
    n.dataset.title ? s.v = n.dataset.title : n.dataset.src && (s.h = n.dataset.src), void 0 !== n.dataset.index && (s.idx = /^[\d]+$/.test(n.dataset.index) ? parseInt(n.dataset.index) : -1), i.e = [s], this._sendEvent(i)
  }
  sendSubmit(t, e) {
    var i = {
      t: "sbmt",
      ptm: this.currentPage.time,
      p: this.currentPage.path,
      q: this.currentPage.query
    };
    i.e = [{
      x: `${t.currentTarget.id}#${e}`
    }], this._sendEvent(i)
  }
  sendChange(t, e) {
    var i = {
        t: "chng",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      },
      n = t.currentTarget,
      s = {
        x: `${n.id}#${e}`
      };
    if (-1 !== ["blur", "change", "confirm"].indexOf(t.type) && n.dataset.growingTrack) {
      if (!t.detail.value || 0 === t.detail.value.length) return;
      "string" == typeof t.detail.value ? s.v = t.detail.value : "[object Array]" === Object.prototype.toString.call(t.detail.value) && (s.v = t.detail.value.join(","))
    }
    "change" === t.type && t.detail && t.detail.source && "autoplay" === t.detail.source || (i.e = [s], this._sendEvent(i))
  }
  sendTabClick(t) {
    var e = {
      t: "clck",
      ptm: this.currentPage.time,
      p: this.currentPage.path,
      q: this.currentPage.query,
      e: [{
        x: "#onTabItemTap",
        v: t.text,
        idx: t.index,
        h: JSON.stringify(t.pagePath)
      }]
    };
    this._sendEvent(e)
  }
  _sendEvent(t) {
    t.u = this.weixin.uid, t.s = this.sessionId, t.tm = t.tm || Date.now(), t.d = this.growingio.appId, t.b = "MinP", null !== this.cs1 && (t.cs1 = this.cs1), this.growingio.upload(t)
  }
  _parseScene(t) {
    if (t.length > 0) {
      var e = t[0];
      e.scene && (this.scene = e.scene)
    }
  }
}

class GrowingIO {
  constructor() {
    this.uploadingMessages = []
  }
  init(t, e, i = {}) {
    this.projectId = t;
    this.appId = e;
    this.appVer = i.version;
    this.debug = i.debug || !1;
    this.forceLogin = i.forceLogin || !1;
    this.followShare = i.followShare || !1;
    this.usePlugin = i.usePlugin || !1;
    this.getLocation = i.getLocation || !1;
    this.getLocationType = "object" == typeof i.getLocation && i.getLocation.type || "wgs84";
    this.keepAlive = +i.keepAlive || 3e4;
    this.vue = !!i.vue;
    this.taro = !!i.taro;
    this.stopTrack = !!i.stopTrack;
    this.weixin = new Weixin(this); // Weixin实例
    this.esid = this.weixin.esid;
    this.host = "https://wxapi.growingio.com";
    i.host && i.host.indexOf("http") >= 0 && (this.host = "https://" + i.host.slice(i.host.indexOf("://") + 3));
    this.uploader = new Uploader(this);
    this.observer = new Observer(this);
    i.vue && (this.vueRootVMs = {}, this._proxyVue(i.vue)); // 对于mpvue进行处理
    i.taro && (this.taroRootVMs = {}, this._proxyTaro(i.taro));
    i.cml && this._proxyCml(i.cml);
    i.stopTrack || this._start()
  }
  setVue(t) {
    this.vueRootVMs || (this.vueRootVMs = {}), this.vue = !0, this._proxyVue(t)
  }
  setStopTrack(t) {
    this.stopTrack = t
  }
  login(t) {
    if (this.forceLogin)
      for (var e of (this.weixin.uid = t, this.forceLogin = !1, this.uploadingMessages)) e.u = t, this._upload(e)
  }
  upload(t) {
    this.stopTrack || (this.forceLogin ? this.uploadingMessages.push(t) : this._upload(t))
  }
  forceFlush() {
    this.weixin.esid = this.esid, this.uploader.forceFlush()
  }
  proxy(t, e) {
    try {
      if ("setVue" === t) this.setVue(e[0]);
      else if ("setStopTrack" === t) this.setStopTrack(e[0]);
      else if (this.observer && this.observer[t]) return this.observer[t].apply(this.observer, e)
    } catch (t) {
      console.error(t)
    }
  }
  _start() {
    VdsInstrumentAgent.initInstrument(this.observer, this.usePlugin);
    try {
      global && (global.App = App, global.Page = Page, global.Component = Component)
    } catch (t) {
      console.error(t)
    }
  }
  _upload(t) {
    t.esid = this.esid++, this.debug && console.info("generate new event", JSON.stringify(t, 0, 2)), this.uploader.upload(t)
  }
  _proxyTaro(t) {
    let e = this;
    const i = t.createComponent;
    t.createComponent = function (t, n) {
      let s = t;
      for (; s && s.prototype;) {
        const i = Object.keys(Object.getOwnPropertyDescriptors(s.prototype) || {});
        for (let n = 0; i.length > n; n++)
          if (i[n].startsWith("func__")) {
            const r = s.name,
              o = i[n].slice(6);
            e.taroRootVMs[i[n]] = r + "_" + ("" + t.prototype[i[n]]).match(/this\.__triggerPropsFn\(\"(.+)\",/)[1] + "_" + o
          } s = Object.getPrototypeOf(s)
      }
      const r = i(t, n);
      return n && VdsInstrumentAgent.instrumentTaroPageComponent(r), r
    }
  }
  _proxyCml(t) {
    const e = t.createApp;
    t.createApp = function (t) {
      const i = e(t);
      return VdsInstrumentAgent.GrowingApp(i.options), i
    }
  }
  _proxyVue(t) { // 代理vue
    if (void 0 !== t.mixin) {
      let e = this;
      t.mixin({
        created: function () { // 在created生命周期之后,对当前实例的methods方法进行处理
          if (!this.$options.methods) return;
          const t = Object.keys(this.$options.methods); // 获取当前实例methods上的所有方法数组
          for (let e of Object.keys(this)) { // 获取当前vue实例上的属性对应的函数名, 实例上的函数,对于methods上的方法进行处理,给该方法打上烙印, 例子: 'proxiedName' : {value: 'bindTap'}, 'isProxied': {value: true}
            0 > t.indexOf(e) || "function" != typeof this[e] || (Object.defineProperty(this[e], "proxiedName", {
              value: e
            }), Object.defineProperty(this[e], "isProxied", {
              value: !0
            }))
          }
        },
        beforeMount: function () { // 在beforeMount生命周期,将根父组件实例挂在 Growing-io实例的vueRootVMs上
          let t = this.$root; // 根父组件
          t.$mp && "page" === t.$mp.mpType && t.$mp.page && (e.vueRootVMs[t.$mp.page.route] = t)
        }
      })
    }
  }
}
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"2hqy":function(e,t,n){"use strict";n.r(t);var a=n("2Taf"),r=n.n(a),o=n("vZ4D"),i=n.n(o),c=n("l4Ni"),s=n.n(c),l=n("ujKo"),u=n.n(l),d=n("MhPg"),p=n.n(d),h=n("q1tI"),m=n.n(h),g=(n("17x9"),n("MuoO")),f=n("Mj6V"),y=n.n(f),v=n("eHn4"),_=n.n(v),E=n("TSYQ"),S=n.n(E),C=n("5B2C"),L=n.n(C),b=function(e){var t,n=e.spinning,a=void 0!==n&&n,r=e.fullScreen;return m.a.createElement("div",{className:S()(L.a.loader,(t={},_()(t,L.a.hidden,!a),_()(t,L.a.fullScreen,r),t))},m.a.createElement("div",{className:L.a.warpper},m.a.createElement("div",{className:L.a.inner}),m.a.createElement("div",{className:L.a.text},"LOADING")))},P=b,k=n("utR0"),N=n("Y/ft"),w=n.n(N);function D(){return function(e){var t,n,a=(t=Object(g["connect"])(function(e){var t=e.user;return{userProfile:t.profile}}),t(n=function(t){function n(){return r()(this,n),s()(this,u()(n).apply(this,arguments))}return p()(n,t),i()(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,n=e.userProfile;n||t({type:"user/fetchUserProfile"})}},{key:"render",value:function(){var t=this.props,n=t.userProfile,a=w()(t,["userProfile"]);return n?m.a.createElement(e,a):null}}]),n}(h["PureComponent"]))||n);return a}}var O,x,M,T,A,I,j,F,G,H,K,U,q,z,B,V,Q=D,R=function(e){function t(){return r()(this,t),s()(this,u()(t).apply(this,arguments))}return p()(t,e),i()(t,[{key:"render",value:function(){return m.a.createElement("div",{style:{width:"100%",height:"100%"}},this.props.children)}}]),t}(h["PureComponent"]),Y=R,Z=(n("qVdP"),n("jsC+")),W=(n("Pwec"),n("CtXQ")),J=(n("lUTK"),n("BvKs")),X=n("5DY1"),$=(n("OaEy"),n("2fM7")),ee=n("mwIZ"),te=n.n(ee),ne=n("XS0u"),ae=n("AEAo"),re=n("QNCp"),oe=n.n(re),ie=$["a"].Option,ce=(O=Object(g["connect"])(function(e){var t=e.common,n=e.loading;return{productList:t.productList,productCode:t.productCode,appList:t.appList,appCode:t.appCode,isSaasApp:t.isSaasApp,tenantCode:t.tenantCode,tenantPage:t.tenantPage,tenantList:t.tenantList,tenantNoNextPage:t.tenantNoNextPage,tenantSearchPage:t.tenantSearchPage,tenantSearchList:t.tenantSearchList,tenantSearchNoNextPage:t.tenantSearchNoNextPage,tenantListLoding:te()(n,["effects","common/fetchTenantList"],!1)}}),Object(k["a"])(x=O((M=function(e){function t(){var e,n;r()(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=s()(this,(e=u()(t)).call.apply(e,[this].concat(o))),n.state={tenantSearchKeyword:""},n.searchTimer=0,n.scrollLoading=!1,n.handleChange=function(e,t){"tenantCode"===e&&n.handleDropdownVisibleChange(!1),n.props.dispatch({type:"common/".concat(e),payload:" "===t?"":t})},n.handleDropdownVisibleChange=function(e){e||n.setState({tenantSearchKeyword:""})},n.handleTenantScroll=function(e){var t=n.props,a=t.tenantPage,r=t.tenantNoNextPage,o=t.tenantSearchPage,i=t.tenantSearchNoNextPage,c=a,s=r;n.state.tenantSearchKeyword&&(c=o,s=i),e.target.scrollTop+270>=e.target.scrollHeight&&!n.scrollLoading&&!s&&n._getTenantList(c+1)},n.handleSearchTenant=function(e){clearTimeout(n.searchTimer),n.searchTimer=setTimeout(function(){n.setState({tenantSearchKeyword:e},n._getTenantList)},500)},n}return p()(t,e),i()(t,[{key:"componentDidMount",value:function(){this._getData()}},{key:"getSnapshotBeforeUpdate",value:function(e){var t=this.props.silent;return!(t||!e.silent)}},{key:"componentDidUpdate",value:function(e,t,n){n&&this._getData()}},{key:"render",value:function(){var e=S()(oe.a.headerSelector,_()({},oe.a.hidden,this.props.hidden));return m.a.createElement("div",{className:e},this.renderProductSelect(),this.renderAppSelect(),this.renderTenantSelect())}},{key:"renderProductSelect",value:function(){var e=this.props,t=e.productList,n=e.productCode;return m.a.createElement("div",{className:oe.a.selectItem},m.a.createElement("span",{className:oe.a.selectLabel},"\u4ea7\u54c1\uff1a"),m.a.createElement($["a"],{mode:"single",value:n||"",placeholder:"\u9009\u62e9\u4ea7\u54c1",notFoundContent:m.a.createElement("div",{style:{padding:"0 12px"}},"\u6ca1\u6709\u6b64\u4ea7\u54c1"),optionFilterProp:"children",showSearch:!0,onChange:this.handleChange.bind(this,"productCode"),style:{width:"100%"}},t.map(function(e){return m.a.createElement(ie,{key:e.code,title:e.name},e.name)})))}},{key:"renderAppSelect",value:function(){var e=this.props,t=e.productCode,n=e.appList,a=e.appCode;return m.a.createElement("div",{className:oe.a.selectItem},m.a.createElement("span",{className:oe.a.selectLabel},"\u5e94\u7528\uff1a"),m.a.createElement($["a"],{mode:"single",value:a||" ",placeholder:"\u9009\u62e9\u5e94\u7528",notFoundContent:m.a.createElement("div",{style:{padding:"0 12px"}},"\u6ca1\u6709\u6b64\u5e94\u7528"),optionFilterProp:"children",showSearch:!0,onChange:this.handleChange.bind(this,"appCode"),style:{width:"100%"}},1!==n.length&&m.a.createElement(ie,{value:" ",key:"".concat(t,"_all_app_option")},"\u6240\u6709\u5e94\u7528"),n.map(function(e){return m.a.createElement(ie,{key:e.code,title:e.name},e.name)})))}},{key:"renderTenantSelect",value:function(){var e=this.props,t=e.isSaasApp,n=e.tenantCode,a=e.tenantListLoding,r=e.tenantList,o=e.tenantSearchList,i=this.state.tenantSearchKeyword;if(!t)return null;var c=i?o:r;return m.a.createElement("div",{className:oe.a.selectItem},m.a.createElement("span",{className:oe.a.selectLabel},"\u79df\u6237\uff1a"),m.a.createElement($["a"],{mode:"single",value:n||" ",placeholder:"\u9009\u62e9\u79df\u6237",notFoundContent:m.a.createElement("div",{style:{padding:"0 12px"}},"\u6ca1\u6709\u6b64\u79df\u6237"),filterOption:!1,showSearch:!0,onSearch:this.handleSearchTenant,onChange:this.handleChange.bind(this,"tenantCode"),onDropdownVisibleChange:this.handleDropdownVisibleChange,onPopupScroll:this.handleTenantScroll,loading:a,style:{width:"100%"}},!i&&m.a.createElement(ie,{value:" ",key:"all_tenant_option"},"\u6240\u6709\u79df\u6237"),c.map(function(e){return m.a.createElement(ie,{key:e.tenant_code,title:e.tenant_code},e.tenant_code)})))}},{key:"_getData",value:function(){var e=this.props,t=e.dispatch,n=e.silent,a=e.location;if(!n){var r=te()(a,"query.product_code",""),o=te()(a,"query.app_code",""),i=te()(a,"query.tenant","");r&&Object(ne["b"])(ae["c"],r),o&&Object(ne["b"])(ae["a"],o),i&&Object(ne["b"])(ae["d"],i),t({type:"common/fetchProductList"})}}},{key:"_getTenantList",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=this.props,a=n.productCode,r=n.appCode,o=n.dispatch;this.scrollLoading=!0,o({type:"common/fetchTenantList",payload:{productCode:a,appCode:r,page:t,keyword:this.state.tenantSearchKeyword}}).then(function(){e.scrollLoading=!1})}}]),t}(h["PureComponent"]),x=M))||x)||x),se=ce,le=n("MGFk"),ue=n.n(le),de=function(e){function t(){return r()(this,t),s()(this,u()(t).apply(this,arguments))}return p()(t,e),i()(t,[{key:"render",value:function(){var e=this.props,t=e.userProfile,n=e.onLogout,a=e.hideHeaderSelector,r=e.selectorSilent,o=m.a.createElement(J["a"],null,m.a.createElement(J["a"].Item,{key:"global-header-user-menu-item-manage-product"},m.a.createElement(X["a"],{to:"/manage/product"},"\u4ea7\u54c1\u7ba1\u7406")),m.a.createElement(J["a"].Item,{key:"global-header-user-menu-item-manage-tracker"},m.a.createElement(X["a"],{to:"/manage/tracker"},"\u63a2\u9488\u7ba1\u7406")),m.a.createElement(J["a"].Divider,null),m.a.createElement(J["a"].Item,{key:"global-header-user-menu-item-user-logout",onClick:n},"\u767b\u51fa"));return m.a.createElement("div",{className:ue.a.globalHeader},m.a.createElement(X["a"],{to:"/overview"},m.a.createElement("div",{className:"fast-web-brand"})),m.a.createElement(se,{hidden:a,silent:r}),m.a.createElement(Z["a"],{overlay:o,placement:"bottomRight",trigger:["click"]},m.a.createElement("span",{className:ue.a.userMenu},m.a.createElement(W["a"],{type:"user",style:{fontSize:"18px",paddingRight:"10px"}}),t.name||"\u7528\u6237",m.a.createElement(W["a"],{type:"down",style:{paddingLeft:"10px"}}))))}}]),t}(h["PureComponent"]),pe=de,he=n("O8Rh"),me=n("WvCx"),ge=n("+n12"),fe=n("x4zE"),ye=n.n(fe),ve=(T=Object(he["a"])(),Object(k["a"])(A=T((I=function(e){function t(e){var n;r()(this,t),n=s()(this,u()(t).call(this,e)),n.generateMenus=function(e,t){return e.map(function(e){return e.showBy&&!e.showBy.some(function(e){return t[e]})?null:e.routes.length>0?m.a.createElement(J["a"].SubMenu,{key:e.key,title:m.a.createElement(h["Fragment"],null,e.icon&&m.a.createElement(me["a"],{type:e.icon}),m.a.createElement("span",null,e.name))},n.generateMenus(e.routes,t)):m.a.createElement(J["a"].Item,{key:e.key},m.a.createElement(X["a"],{to:e.path||"#"},e.icon&&m.a.createElement(me["a"],{type:e.icon}),m.a.createElement("span",null,e.name)))})};var a=e.menuData;return n.state={defaultOpenKeys:Array.isArray(a)?a.map(function(e){var t=e.key;return t}):[]},n}return p()(t,e),i()(t,[{key:"render",value:function(){var e=this.props,t=e.menuData,n=e.menus,a=e.location,r=e.isHybridApp,o=e.isSaasApp,i=e.productCode,c=e.appCode,s=e.tenantCode,l=e.userIdentityType,u=this.state.defaultOpenKeys,d=n.find(function(e){return e.path&&Object(ge["e"])(e.path,a.pathname)}),p=d?Object(ge["f"])(n,d,"parentPath","key").map(function(e){return e.key}):[];return m.a.createElement(J["a"],{className:ye.a.siderMenu,mode:"inline",defaultOpenKeys:u,selectedKeys:p},this.generateMenus(t,{isHybridApp:r,isSaasApp:o,productCode:i,appCode:c,tenantCode:s,userIdentityType:l}))}}]),t}(h["PureComponent"]),A=I))||A)||A),_e=ve,Ee=n("H1Kz"),Se=n.n(Ee),Ce=(j=Q(),F=Object(g["connect"])(function(e){var t=e.user,n=e.common;return{userProfile:t.profile,menuData:n.menuData,menus:n.menus,initialLoad:n.initialLoad}}),j(G=Object(k["a"])(G=F((H=function(e){function t(){var e,n;r()(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=s()(this,(e=u()(t)).call.apply(e,[this].concat(o))),n.handleLogout=function(){n.props.dispatch({type:"user/fetchUserLogout",payload:{noRedirect:!0}})},n}return p()(t,e),i()(t,[{key:"render",value:function(){var e=this.props,t=e.hideHeaderSelector,n=e.hideSiderMenu,a=e.children,r=e.userProfile,o=e.menuData,i=e.menus,c=e.initialLoad,s=e.location,l=s.pathname,u="/manage/product"===l||"/manage/tracker"===l,d=u||c,p=Array.isArray(o)&&o.length>0,h=S()(Se.a.content,_()({},Se.a.hideSiderMenu,n));return m.a.createElement("div",{className:Se.a.primaryLayout},m.a.createElement(pe,{hideHeaderSelector:t,selectorSilent:u,userProfile:r,onLogout:this.handleLogout}),!n&&p&&m.a.createElement("div",{className:Se.a.sider},m.a.createElement(_e,{menuData:o,menus:i})),m.a.createElement("div",{className:h},d&&m.a.createElement(Y,null,a)))}}]),t}(h["PureComponent"]),G=H))||G)||G)||G),Le=Ce,be=(n("+L6B"),n("2/Rp")),Pe=(n("5NDa"),n("5rEg")),ke=(n("y8nQ"),n("Vl3Y")),Ne=n("q4Da"),we=n.n(Ne),De=(K=ke["a"].create(),K((q=function(e){function t(){var e,n;r()(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=s()(this,(e=u()(t)).call.apply(e,[this].concat(o))),n.handleSubmitLogin=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){e||window.g_app._store.dispatch({type:"user/fetchUserLogin",payload:t})})},n}return p()(t,e),i()(t,[{key:"render",value:function(){return m.a.createElement("div",{className:we.a.loginBackground},m.a.createElement("div",{className:we.a.login},m.a.createElement("div",{className:we.a.rightGhost}),m.a.createElement("div",{className:we.a.right},m.a.createElement("div",{className:we.a.logo}),this.renderLoginForm())))}},{key:"renderLoginForm",value:function(){var e=this.props.form.getFieldDecorator;return m.a.createElement(ke["a"],{onSubmit:this.handleSubmitLogin,className:we.a.loginForm},m.a.createElement("div",{className:we.a.head},m.a.createElement("h1",{className:we.a.title},"\u767b\u5f55"),m.a.createElement("p",{className:we.a.des},"\u8bf7\u4f7f\u7528\u660e\u6e90\u4e91\u57df\u5e10\u53f7\u767b\u5f55\u5929\u773c\u5e73\u53f0")),m.a.createElement(ke["a"].Item,null,e("account",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d26\u53f7!"}]})(m.a.createElement(Pe["a"],{size:"large",placeholder:"\u8d26\u53f7",onPressEnter:this.handleSubmitLogin}))),m.a.createElement(ke["a"].Item,null,e("password",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!"}]})(m.a.createElement(Pe["a"],{size:"large",type:"password",placeholder:"\u5bc6\u7801",onPressEnter:this.handleSubmitLogin}))),m.a.createElement(ke["a"].Item,null,m.a.createElement(be["a"],{type:"primary",htmlType:"submit",size:"large",className:we.a.submitbtn},"\u767b\u5f55")))}}]),t}(h["PureComponent"]),U=q))||U),Oe=De,xe=function(e){return/\/login/.test(e)?"login":"primary"},Me={login:Oe,primary:Le},Te=function(e){return/\/(manage|(errors\/crash_(list|detail)))/.test(e)?{hideSiderMenu:!0,hideHeaderSelector:!0}:{}},Ae=(z=Object(g["connect"])(function(e){var t=e.loading;return{loading:t}}),z((V=function(e){function t(){var e,n;r()(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=s()(this,(e=u()(t)).call.apply(e,[this].concat(o))),n.previousPath="",n._getGlobalLoadingStatus=function(){var e=n.props.loading.effects,t=["user/fetchUserLogin","user/fetchUserProfile","user/fetchUserLogout","tracker/fetchTrackerList","product/fetchProductList","pageGroup/fetchPageGroupConfigList","pageGroup/fetchAddPageGroupConfig","pageGroup/fetchUpdatePageGroupConfig","pageGroup/fetchDeletePageGroupConfig","pageGroup/fetchSyncPageGroupConfig","common/fetchProductList","common/fetchAppList","common/productCode","common/appCode"];return!!t.some(function(t){return e&&e[t]})},n}return p()(t,e),i()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.route.routes,n=e.dispatch;n({type:"common/queryMenuDataFromRoutes",payload:t})}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.location,a=Me[xe(n.pathname)],r=Te(n.pathname),o=n.pathname+n.search,i=this._getGlobalLoadingStatus();return o!==this.previousPath&&y.a.start(),i||(y.a.done(),this.previousPath=o),m.a.createElement("div",{id:"fast-web-base-layout",style:{width:"100%",minWidth:"1200px",height:"100%",position:"relative",zIndex:0}},m.a.createElement(P,{spinning:i,fullScreen:!0}),m.a.createElement(a,r,t))}}]),t}(h["PureComponent"]),B=V))||B);t["default"]=Ae},"5B2C":function(e,t,n){e.exports={loader:"loader___U0gXU",fullScreen:"fullScreen___3stt8",warpper:"warpper___1_Ml1",inner:"inner___LZ9-r",spinner:"spinner___2-IFt",text:"text___27oz3",hidden:"hidden___2sYXU"}},H1Kz:function(e,t,n){e.exports={primaryLayout:"primaryLayout___UvQ65",sider:"sider___O_mNv",content:"content___2ruHZ",hideSiderMenu:"hideSiderMenu___25fRa"}},MGFk:function(e,t,n){e.exports={globalHeader:"globalHeader___21MiK",userMenu:"userMenu___1We-g"}},O8Rh:function(e,t,n){"use strict";n.d(t,"a",function(){return f});var a=n("2Taf"),r=n.n(a),o=n("vZ4D"),i=n.n(o),c=n("l4Ni"),s=n.n(c),l=n("ujKo"),u=n.n(l),d=n("MhPg"),p=n.n(d),h=n("q1tI"),m=n.n(h),g=n("MuoO");function f(){return function(e){var t,n,a=(t=Object(g["connect"])(function(e){var t=e.common,n=e.analysis;return{isSaasApp:t.isSaasApp,isHybridApp:t.isHybridApp,productCode:t.productCode,appCode:t.appCode,tenantCode:t.tenantCode,userIdentityType:n.userIdentityType,threshold:n.threshold}}),t(n=function(t){function n(){return r()(this,n),s()(this,u()(n).apply(this,arguments))}return p()(n,t),i()(n,[{key:"render",value:function(){return m.a.createElement(e,this.props)}}]),n}(h["PureComponent"]))||n);return a}}},QNCp:function(e,t,n){e.exports={headerSelector:"headerSelector___3fDVk",hidden:"hidden___3xl-s",selectItem:"selectItem___2O-TI",selectLabel:"selectLabel___3ferP"}},WvCx:function(e,t,n){"use strict";var a=n("jehZ"),r=n.n(a),o=n("Y/ft"),i=n.n(o),c=n("q1tI"),s=n.n(c),l=n("TSYQ"),u=n.n(l),d=function(e){var t=e.className,n=e.type,a=i()(e,["className","type"]),o=u()(t,"fasticon","fasticon-".concat(n));return s.a.createElement("i",r()({className:o},a))};t["a"]=d},q4Da:function(e,t,n){e.exports={loginBackground:"loginBackground___2zO1p",login:"login___3JO_8",rightGhost:"rightGhost___1dVzd",right:"right___11djQ",logo:"logo___2QsYH",loginForm:"loginForm___3lSOx",head:"head___WWF7D",title:"title___27He0",des:"des___2ZgO1",submitbtn:"submitbtn___1VsCu"}},x4zE:function(e,t,n){e.exports={siderMenu:"siderMenu___21Jpr"}}}]);
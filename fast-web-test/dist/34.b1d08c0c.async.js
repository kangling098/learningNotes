(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[34],{"8Gar":function(e,t,a){"use strict";a.r(t);var n=a("p0pE"),r=a.n(n),o=(a("P2fV"),a("NJEC")),i=(a("5Dmo"),a("3S7+")),l=(a("5NDa"),a("5rEg")),c=a("eHn4"),s=a.n(c),p=(a("Pwec"),a("CtXQ")),u=a("gWZ8"),d=a.n(u),m=(a("miYZ"),a("tsqr")),h=a("2Taf"),f=a.n(h),g=a("vZ4D"),_=a.n(g),y=a("l4Ni"),v=a.n(y),E=a("ujKo"),S=a.n(E),C=a("MhPg"),T=a.n(C),w=a("q1tI"),R=a.n(w),I=a("MuoO"),N=a("Kr6O"),k=a("WvCx"),L=(a("2qtc"),a("kLXV")),b=(a("OaEy"),a("2fM7")),P=(a("17x9"),a("iHgP")),x=a.n(P),A=b["a"].Option,G=b["a"].OptGroup,U=function(e){function t(){var e,a;f()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=v()(this,(e=S()(t)).call.apply(e,[this].concat(r))),a.state={confirmLoading:!1,productList:[],targetAppId:""},a.handleSelect=function(e){a.setState({targetAppId:e})},a.handleConfirmImport=function(){a.props.onImport(a.state.targetAppId)},a}return T()(t,e),_()(t,[{key:"getSnapshotBeforeUpdate",value:function(e){var t=this.props.show;return t&&!e.show?"show":!(t||!e.show)&&"hide"}},{key:"componentDidUpdate",value:function(e,t,a){"show"===a?this._getProductList():"hide"===a&&this.setState({targetAppId:"",productList:[]})}},{key:"render",value:function(){var e=this.props,t=e.show,a=e.onCancel,n=this.state,r=n.confirmLoading,o=n.productList,i=n.targetAppId;return R.a.createElement(L["a"],{width:"680px",onCancel:a,onOk:this.handleConfirmImport,title:"\u5f15\u5165\u5176\u4ed6\u5e94\u7528\u914d\u7f6e",visible:t,maskClosable:!1,confirmLoading:r,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},R.a.createElement("div",{className:x.a.importConfigContent},R.a.createElement("div",{className:x.a.label},"\u9009\u62e9\u5e94\u7528\uff1a"),R.a.createElement(b["a"],{mode:"single",value:i||void 0,placeholder:"\u8bf7\u9009\u62e9\u5e94\u7528",notFoundContent:R.a.createElement("div",{style:{padding:"0 12px"}},"\u6ca1\u6709\u6b64\u5e94\u7528"),optionFilterProp:"children",showSearch:!0,onChange:this.handleSelect,style:{width:"100%"}},o.map(function(e){var t=e.apps,a=e.name,n=e.id;return R.a.createElement(G,{label:a,key:"import-config-product-".concat(n)},t.map(function(e){return R.a.createElement(A,{key:e.id},e.name||"<\u672a\u547d\u540d\u5e94\u7528>")}))}))))}},{key:"_getProductList",value:function(){var e=this;window.g_app._store.dispatch({type:"pageGroup/fetchProductList"}).then(function(t){if(t.result){var a=e.props.appId,n=Array.isArray(t.data.items)?t.data.items.filter(function(e){return Array.isArray(e.apps)&&e.apps.length>0}):[];e.setState({productList:a?n.map(function(e){return e.apps=e.apps.filter(function(e){return e.id!==a}),e}):n})}})}}]),t}(w["PureComponent"]);U.defaultProps={show:!1,appId:""};var O,B,D,M,j=U,K=a("TSYQ"),V=a.n(K),H=a("wd/R"),q=a.n(H),Y=a("usdK"),F=a("mwIZ"),W=a.n(F),J=a("BkRI"),Z=a.n(J),Q=a("aJ0n"),z=a.n(Q),$=(O=Object(I["connect"])(function(e){var t=e.pageGroup;return{configList:t.configList}}),O((M=D=function(e){function t(e){var a;f()(this,t),a=v()(this,S()(t).call(this,e)),a.handleOpenImportConfigDialog=function(){a.setState({importDialogShow:!0})},a.handleCloseImportConfigDialog=function(){a.setState({importDialogShow:!1})},a.handleImportConfig=function(e){a.props.dispatch({type:"pageGroup/fetchImportPageGroupConfig",payload:{source_app_id:e,target_app_id:a.appId}}).then(function(e){e.result&&(a.handleCloseImportConfigDialog(),a._getConfigData())})},a.handleSyncConfig=function(){a.state.needSync&&a.props.dispatch({type:"pageGroup/fetchSyncPageGroupConfig",payload:a.appId}).then(function(e){e.result&&a.setState({needSync:!1})})},a.handleAddConfig=function(){if(!a.commiting){var e=a.state,t=e.configList,n=e.editKey;t.some(function(e){return!e.id})?!n&&m["a"].error("\u5c1a\u6709\u672a\u586b\u5199\u5b8c\u6210\u7684\u914d\u7f6e\u9879"):a.setState(function(e){var t={page_path_name:"",group_rules:[{group_name:"",search_regx:""}]};return{configList:[t].concat(d()(e.configList))}})}},a.handleAddRule=function(e){if(!a.commiting){var t=a.state,n=t.configList,r=t.editKey,o=n[e].group_rules;o.some(function(e){return!e.group_name})?!r&&m["a"].error("\u5c1a\u6709\u672a\u586b\u5199\u5b8c\u6210\u7684\u89c4\u5219\u9879"):a.setState(function(t){var a=t.configList.slice();return a[e].group_rules.push({group_name:"",search_regx:""}),{configList:a}})}},a.handleDeleteRule=function(e,t){var n=a.state.configList[e];if(1===n.group_rules.length&&0===t)n.id?a.props.dispatch({type:"pageGroup/fetchDeletePageGroupConfig",payload:n.id}).then(function(t){t.result&&a.setState(function(t){return{saveTip:"\u81ea\u52a8\u4fdd\u5b58\u6210\u529f",editKey:"",configList:t.configList.filter(function(t,a){return a!==e})}},a._updateSaveTip)}):a.setState(function(t){return{editKey:"",configList:t.configList.filter(function(t,a){return a!==e})}});else{var r=Z()(n),o=r.group_rules.splice(t,1);r.id&&W()(o,"0.group_name")?a._saveConfig(e,r):a._updateConfigList(e,r)}},a.handleStartEdit=function(e,t,n){if(!a.state.editKey){var r="".concat(e,"-").concat(t,"-").concat(n),o="".concat(r,"-input");"page_path_name"!==e&&(r="rule-".concat(t,"-").concat(n),o="".concat(r,"-").concat(e,"-input")),a.setState({editKey:r},function(){a[o]&&a[o].focus()})}},a.handleFocusRuleInput=function(){clearTimeout(a.inputBlurTimer)},a.handleBlurRuleInput=function(e,t,n){a.commiting=!0,a.inputBlurTimer=setTimeout(function(){a.handleConfirmEdit(e,t,n)},200)},a.handleConfirmEdit=function(e,t,n){a.commiting=!0;var r="",o=!1,i=a.state,l=i.configList,c=i.editKey,s=Z()(l[t]);if("page_path_name"===e){var p=a["".concat(c,"-input")],u=W()(p,"input.value","").replace(/(^\s*)|(\s*$)/g,"");u?s.page_path_name!==u&&(l.some(function(e,a){return a!==t&&e.page_path_name.replace(/(^\/)|(\/$)/g,"")===u.replace(/(^\/)|(\/$)/g,"")})?r="\u9875\u9762\u8def\u5f84\u4e0d\u80fd\u91cd\u590d":(s.page_path_name=u,o=!0)):r="\u9875\u9762\u8def\u5f84\u4e0d\u80fd\u4e3a\u7a7a"}else{var d="rule-".concat(t,"-").concat(n),h=a["".concat(d,"-group_name-input")],f=a["".concat(d,"-search_regx-input")],g=W()(h,"input.value","").replace(/(^\s*)|(\s*$)/g,""),_=W()(f,"input.value","").replace(/(^\s*)|(\s*$)/g,"");g?s.group_rules[n].group_name===g&&s.group_rules[n].search_regx===_||(s.group_rules.some(function(e,t){return t!==n&&e.search_regx===_})?r="Search\u90e8\u5206\u5339\u914d\u89c4\u5219\u5728\u540c\u4e00\u9875\u9762\u8def\u5f84\u5185\u4e0d\u80fd\u91cd\u590d":(s.group_rules[n].group_name=g,s.group_rules[n].search_regx=_,o=!0)):r="\u5206\u7ec4\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"}r?(m["a"].error(r),a.commiting=!1):o?a._saveConfig(t,s):a.setState({editKey:""},function(){a.commiting=!1})};var n=e.match,r=W()(n,"params.name"),o=W()(n,"params.id");return o||Y["a"].push("/manage/product"),a.appId=o,a.appName=r||"",a.saveTipTimer=null,a.inputBlurTimer=null,a.commiting=!1,a.state={saveTip:"\u81ea\u52a8\u4fdd\u5b58\u6240\u6709\u5185\u5bb9",needSync:!1,importDialogShow:!1,configList:[],editKey:""},a}return T()(t,e),_()(t,[{key:"componentDidMount",value:function(){this._getConfigData()}},{key:"componentWillUnmount",value:function(){this.setState=function(){}}},{key:"render",value:function(){var e=this.state.importDialogShow,t=[{title:this.appName,path:"/manage/product"},{title:"\u9875\u9762\u5206\u7ec4"}];return R.a.createElement(N["a"],{navTitle:t,containerStyle:{padding:"0 0 42px"}},R.a.createElement("div",{className:z.a.pageGroup},this.renderHeader(),this.renderConfigList()),R.a.createElement(j,{show:e,onCancel:this.handleCloseImportConfigDialog,onImport:this.handleImportConfig,appId:this.appId}))}},{key:"renderHeader",value:function(){var e=this.state,t=e.needSync,a=e.saveTip;return R.a.createElement("div",{className:z.a.header},R.a.createElement("div",{className:z.a.leftTip},R.a.createElement(p["a"],{type:"check-circle",style:{marginRight:"8px"}}),R.a.createElement("span",{style:{marginRight:"32px"}},a),R.a.createElement("span",null,"\u63d0\u793a\uff1a\u914d\u7f6e\u53d8\u66f4\u540e\uff0c\u4e0b\u6b21\u6e05\u6d17\u751f\u6548")),R.a.createElement("div",{className:z.a.rightBtns},R.a.createElement("span",{className:z.a.btn,onClick:this.handleOpenImportConfigDialog},R.a.createElement(p["a"],{type:"import",style:{marginRight:"10px"}}),"\u5f15\u5165\u5176\u4ed6\u5e94\u7528\u914d\u7f6e"),R.a.createElement("span",{className:V()(z.a.btn,s()({},z.a.disabled,!t)),onClick:this.handleSyncConfig},R.a.createElement(p["a"],{type:"sync",style:{marginRight:"10px"}}),"\u540c\u6b65\u914d\u7f6e\u81f3OSS")))}},{key:"renderConfigList",value:function(){var e=this,t=this.state,a=t.configList,n=t.editKey;return R.a.createElement("ul",{className:z.a.configList},this.renderTitleRow(),R.a.createElement("li",{className:z.a.row},R.a.createElement("div",{className:"".concat(z.a.cell," ").concat(z.a.addBtn),onClick:this.handleAddConfig},R.a.createElement(p["a"],{type:"plus",style:{marginRight:"9px"}}),"\u6dfb\u52a0\u9875\u9762\u5206\u7ec4")),a.length>0&&a.map(function(t,a){var r=t.page_path_name,c=void 0===r?"":r,s=t.group_rules,p=void 0===s?[]:s,u=t.id,d=void 0===u?"":u,m="page_path_name-".concat(a,"-").concat(-1),h=p.length,f=e.handleConfirmEdit.bind(e,"page_path_name",a,-1);return R.a.createElement("li",{key:"page-group-config-list-item-".concat(d,"-").concat(a),className:z.a.row,style:{height:"".concat(54*h,"px")}},R.a.createElement("div",{className:z.a.cell,style:{paddingTop:"".concat(27*(h-1)+16,"px")}},n===m?R.a.createElement(l["a"],{ref:function(t){e["".concat(m,"-input")]=t},className:z.a.input,defaultValue:c,style:{top:"".concat(27*(h-1)+11,"px")},onPressEnter:f,onBlur:f}):R.a.createElement(i["a"],{placement:"top",title:c},R.a.createElement("span",{className:z.a.text,onClick:e.handleStartEdit.bind(e,"page_path_name",a,-1)},c))),R.a.createElement("div",{className:"".concat(z.a.cell," ").concat(z.a.hasSub)},p.map(function(t,r){var c=t.group_name,s=t.search_regx,p="rule-".concat(a,"-").concat(r),u=e.handleBlurRuleInput.bind(e,"group_name",a,r),m=e.handleBlurRuleInput.bind(e,"search_regx",a,r);return R.a.createElement("div",{key:"page-group-config-rule-item-".concat(d,"-").concat(a,"-").concat(r),className:z.a.subRow},R.a.createElement("div",{className:z.a.item},n===p?R.a.createElement(l["a"],{ref:function(t){e["".concat(p,"-group_name-input")]=t},className:z.a.input,defaultValue:c,onFocus:e.handleFocusRuleInput,onPressEnter:u,onBlur:u}):R.a.createElement(i["a"],{placement:"top",title:c},R.a.createElement("span",{className:z.a.text,onClick:e.handleStartEdit.bind(e,"group_name",a,r)},c))),R.a.createElement("div",{className:z.a.item},n===p?R.a.createElement(l["a"],{ref:function(t){e["".concat(p,"-search_regx-input")]=t},className:z.a.input,defaultValue:s,onFocus:e.handleFocusRuleInput,onPressEnter:m,onBlur:m}):R.a.createElement(i["a"],{placement:"top",title:s},R.a.createElement("span",{className:z.a.text,onClick:e.handleStartEdit.bind(e,"search_regx",a,r)},s))),R.a.createElement(o["a"],{title:R.a.createElement("div",null,"\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u89c4\u5219\uff1f"),onConfirm:e.handleDeleteRule.bind(e,a,r),okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},R.a.createElement("div",{className:"".concat(z.a.item," ").concat(z.a.delBtn)},"\u5220\u9664")))})),R.a.createElement("div",{className:z.a.addRowBtn,onClick:e.handleAddRule.bind(e,a)},R.a.createElement(k["a"],{type:"add"})))}))}},{key:"renderTitleRow",value:function(){return R.a.createElement("li",{className:"".concat(z.a.title," ").concat(z.a.row)},R.a.createElement("div",{className:z.a.cell},"\u9875\u9762\u8def\u5f84",R.a.createElement(i["a"],{placement:"topLeft",title:"\u9875\u9762\u8def\u5f84",overlayClassName:z.a.tooltip1},R.a.createElement(p["a"],{type:"info-circle",theme:"filled",style:{paddingLeft:"14px",marginLeft:"-5px"}}))),R.a.createElement("div",{className:z.a.cell,style:{width:"440px"}},"\u5206\u7ec4\u540d\u79f0"),R.a.createElement("div",{className:z.a.cell,style:{width:"280px"}},"Search\u90e8\u5206\u5339\u914d\u89c4\u5219",R.a.createElement(i["a"],{placement:"topRight",title:"Search\u90e8\u5206\u5339\u914d\u89c4\u5219\u4e3a\u7a7a\uff0c\u5219\u5b8c\u6574\u5339\u914dPage\u90e8\u5206",overlayClassName:z.a.tooltip2},R.a.createElement(p["a"],{type:"info-circle",theme:"filled",style:{paddingRight:"14px",marginLeft:"9px"}}))),R.a.createElement("div",{className:z.a.cell,style:{width:"60px",borderRight:"0 none"}},"\u64cd\u4f5c"))}},{key:"_saveConfig",value:function(e,t){var a=this;if(t.page_path_name&&Array.isArray(t.group_rules)&&t.group_rules.length>0&&t.group_rules.every(function(e){return e.group_name})){var n="pageGroup/fetch".concat(t.id?"Update":"Add","PageGroupConfig");this.props.dispatch({type:n,payload:r()({app_id:this.appId},t)}).then(function(n){n.result?(t.id||(t.id=n.data),a._getSyncStatus(),a._updateConfigList(e,t,!0)):a.commiting=!1})}else this._updateConfigList(e,t)}},{key:"_updateConfigList",value:function(e,t){var a=this,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.setState(function(a){var r=a.configList.slice();return r[e]=t,{editKey:"",configList:r,saveTip:n?"\u81ea\u52a8\u4fdd\u5b58\u6210\u529f":a.saveTip}},function(){n&&a._updateSaveTip(),a.commiting=!1})}},{key:"_updateSaveTip",value:function(){var e=this,a=q()().format("HH:mm");clearTimeout(this.saveTipTimer),this.saveTipTimer=setTimeout(function(){e.setState({saveTip:"\u6700\u8fd1\u4fdd\u5b58 ".concat(a)})},t.SAVE_TIP_UPDATE_DELAY)}},{key:"_getConfigData",value:function(){var e=this;this.props.dispatch({type:"pageGroup/fetchPageGroupConfigList",payload:this.appId}).then(function(t){t.result&&e.setState({configList:t.data})}),this._getSyncStatus()}},{key:"_getSyncStatus",value:function(){var e=this;this.state.needSync||this.props.dispatch({type:"pageGroup/fetchCheckPageGroupConfigNeedSync",payload:this.appId}).then(function(t){var a=t.result&&t.data;a!==e.state.needSync&&e.setState({needSync:a})})}}]),t}(w["PureComponent"]),D.SAVE_TIP_UPDATE_DELAY=1e3,B=M))||B);t["default"]=$},GpzW:function(e,t,a){e.exports={pageNav:"pageNav___3PPY0",title:"title___3bDmh",subTitle:"subTitle___2n5-j",rightContainer:"rightContainer___2Pgff"}},Kr6O:function(e,t,a){"use strict";a("Pwec");var n,r,o,i,l,c,s,p=a("CtXQ"),u=(a("sPJy"),a("bE4q")),d=a("eHn4"),m=a.n(d),h=a("2Taf"),f=a.n(h),g=a("vZ4D"),_=a.n(g),y=a("l4Ni"),v=a.n(y),E=a("ujKo"),S=a.n(E),C=a("rlhR"),T=a.n(C),w=a("MhPg"),R=a.n(w),I=a("q1tI"),N=a.n(I),k=(a("17x9"),a("utR0")),L=a("O8Rh"),b=(a("OaEy"),a("2fM7")),P=a("MuoO"),x=b["a"].Option,A=(n=Object(P["connect"])(function(e){var t=e.analysis;return{threshold:t.threshold}}),n((o=function(e){function t(){var e,a;f()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=v()(this,(e=S()(t)).call.apply(e,[this].concat(r))),a.handleSelect=function(e){var t=a.props,n=t.dispatch,r=t.thresholdModel,o=t.threshold;o[r]!==e&&n({type:"analysis/updateThreshold",payload:{thresholdModel:r,value:e}})},a}return R()(t,e),_()(t,[{key:"render",value:function(){var e=this.props,t=e.thresholdModel,a=e.threshold;return N.a.createElement("div",{style:{float:"right",marginLeft:"24px"}},"\u9608\u503c\uff1a",N.a.createElement(b["a"],{style:{width:"106px"},dropdownClassName:"page-nav-dropdown",defaultValue:3e3,value:a[t]||3e3,onChange:this.handleSelect},N.a.createElement(x,{value:500},"500ms"),N.a.createElement(x,{value:1e3},"1000ms"),N.a.createElement(x,{value:1500},"1500ms"),N.a.createElement(x,{value:2e3},"2000ms"),N.a.createElement(x,{value:2500},"2500ms"),N.a.createElement(x,{value:3e3},"3000ms"),N.a.createElement(x,{value:3500},"3500ms"),N.a.createElement(x,{value:4e3},"4000ms"),N.a.createElement(x,{value:4500},"4500ms"),N.a.createElement(x,{value:5e3},"5000ms")))}}]),t}(I["PureComponent"]),r=o))||r),G=A,U=b["a"].Option,O=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"userIdentityType",a=[];return a="pageIdentityType"===t?[N.a.createElement(U,{value:"title",key:"indentity-type-option-title"},"\u9875\u9762\u6807\u9898"),N.a.createElement(U,{value:"page_group",key:"indentity-type-option-page_group"},"\u9875\u9762\u5206\u7ec4")]:[N.a.createElement(U,{value:"user_id",key:"indentity-type-option-user_id"},"\u8bbe\u5907\u6807\u8bc6\u7528\u6237"),N.a.createElement(U,{value:"real_user_id",key:"indentity-type-option-real_user_id"},"\u4e1a\u52a1\u7cfb\u7edf\u7528\u6237")],Object(P["connect"])(function(e){var a=e.analysis;return m()({},t,a[t])})((e=function(e){function n(){var e,a;f()(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return a=v()(this,(e=S()(n)).call.apply(e,[this].concat(o))),a.handleSelect=function(e){var n=a.props[t];n!==e&&a.props.dispatch({type:"analysis/".concat(t,"Update"),payload:e})},a}return R()(n,e),_()(n,[{key:"render",value:function(){var e=this.props[t];return N.a.createElement("div",{style:{float:"right",marginLeft:"24px"}},"pageIdentityType"===t?"\u7c7b\u578b\uff1a":null,N.a.createElement(b["a"],{dropdownClassName:"page-nav-dropdown",defaultValue:e,value:e,onChange:this.handleSelect,style:{width:"userIdentityType"===t?"132px":"106px"}},a))}}]),n}(I["PureComponent"]),e))},B=O,D=a("mwIZ"),M=a.n(D),j=b["a"].Option,K=(i=Object(P["connect"])(function(e){var t=e.analysis;return{userGroup:t.userGroup}}),i((s=c=function(e){function t(){var e,a;f()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=v()(this,(e=S()(t)).call.apply(e,[this].concat(r))),a.state={currUserGroup:""},a.handleSelect=function(e){var n=a.props,r=n.dispatch,o=n.analysisModel,i=a.state.currUserGroup,l=e===t.ALL_USER_GROUP_STR?"":e;i!==l&&r({type:"analysis/updateUserGroup",payload:{userGroup:l,analysisModel:o}})},a}return R()(t,e),_()(t,[{key:"render",value:function(){var e=this.state.currentUserGroup;return N.a.createElement(b["a"],{dropdownClassName:"page-nav-dropdown",defaultValue:e||t.ALL_USER_GROUP_STR,value:e||t.ALL_USER_GROUP_STR,onChange:this.handleSelect,style:{width:"132px",float:"right",marginLeft:"24px"}},N.a.createElement(j,{value:t.ALL_USER_GROUP_STR},"\u5168\u90e8\u89d2\u8272"))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=e.analysisModel,n=e.userGroup,r=M()(n,a,"");return r!==t.currUserGroup?{currUserGroup:r}:null}}]),t}(I["PureComponent"]),c.ALL_USER_GROUP_STR="[ALL_USER_GROUP]",l=s))||l),V=K,H=a("GpzW"),q=a.n(H),Y=B(),F=B("pageIdentityType"),W=function(e){function t(){return f()(this,t),v()(this,S()(t).apply(this,arguments))}return R()(t,e),_()(t,[{key:"render",value:function(){var e=this.props,t=e.title,a=e.subTitle,n=e.thresholdModel,r=e.openUserIdentityType,o=e.openUserGroupSelect,i=e.openPageIdentityType;return N.a.createElement("div",{className:q.a.pageNav},N.a.createElement("div",{className:q.a.title},t,a&&N.a.createElement("span",{className:q.a.subTitle},a)),N.a.createElement("div",{className:q.a.rightContainer},n&&N.a.createElement(G,{thresholdModel:n}),o&&N.a.createElement(V,{analysisModel:o}),r&&N.a.createElement(Y,null),i&&N.a.createElement(F,null)))}}]),t}(I["PureComponent"]);W.defatulProps={openUserIdentityType:!1,openUserGroupSelect:!1,openPageIdentityType:!1,thresholdModel:""};var J,Z,Q,z,$=W,X=a("cuOD"),ee=a.n(X),te=(a("kVbL"),a("vjuj"),ee.a),ae=a("usdK"),ne=a("TSYQ"),re=a.n(ne),oe=a("DzJC"),ie=a.n(oe),le=a("s0kW"),ce=a.n(le),se=(J=Object(L["a"])(),Object(k["a"])(Z=J((z=Q=function(e){function t(){var e,a;f()(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return a=v()(this,(e=S()(t)).call.apply(e,[this].concat(r))),a.scrolling=!1,a.state={scrollTopBtnShow:!1},a.handleLinkTo=function(e){if(e.path){var t=e.withQuery,n=e.path,r={};if(Array.isArray(t)){var o=M()(T()(a),"props.location.query",{});t.forEach(function(e){o&&o[e]&&(r[e]=o[e])})}ae["a"].push({pathname:n,query:r})}},a.handleScrollY=ie()(function(){a.scrollRef&&a.scrollRef._container&&a.setState({scrollTopBtnShow:a.scrollRef._container.scrollTop>=160})},500),a.handleScrollToTop=function(){a.scrollRef&&a.scrollRef._container&&!a.scrolling&&a.scrollSmooth(a.scrollRef._container)},a.scrollSmooth=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,n=e.scrollTop||0;if(0!==n){var r=null,o=function o(i){r=r||i;var l=i-r,c=Math.min(1,(i-r)/t);e.scrollTop=n-c*n,l<t?window.requestAnimationFrame(o):a.scrolling=!1};a.scrolling=!0,window.requestAnimationFrame(o)}},a}return R()(t,e),_()(t,[{key:"getSnapshotBeforeUpdate",value:function(e){var t=this.props,a=t.productCode,n=t.appCode,r=t.tenantCode,o=t.userIdentityType,i=t.threshold,l=t.thresholdModel;return a!==e.productCode||n!==e.appCode||r!==e.tenantCode||(o!==e.userIdentityType||!(!l||M()(i,l)===M()(e.threshold,l)))}},{key:"componentDidUpdate",value:function(e,t,a){a&&this.scrollRef&&"function"===typeof this.scrollRef.updateScroll&&(this.scrollRef._container.scrollTop=0,this.scrollRef.updateScroll())}},{key:"render",value:function(){var e=this,t=this.props,a=t.navTitle,n=t.subTitle,r=t.thresholdModel,o=t.openUserIdentityType,i=t.openUserGroupSelect,l=t.openPageIdentityType,c=t.children,s=t.containerStyle,d=this.state.scrollTopBtnShow;return N.a.createElement("div",{className:re()(ce.a.pageView,m()({},ce.a.noNav,!a))},Array.isArray(a)?N.a.createElement(u["a"],{className:ce.a.breadcrumb},a.map(function(t,a){return N.a.createElement(u["a"].Item,{key:"fast-page-nav-breadcrumb-".concat(t.path,"-").concat(a),className:re()(ce.a.breadItem,m()({},ce.a.link,!!t.path)),onClick:e.handleLinkTo.bind(e,t)},t.title)})):N.a.createElement($,{title:a,subTitle:n,thresholdModel:r,openUserIdentityType:o,openUserGroupSelect:i,openPageIdentityType:l}),N.a.createElement(te,{className:ce.a.pageContainer,style:s,ref:function(t){e.scrollRef=t},onScrollY:this.handleScrollY},Array.isArray(c)?c.map(function(e,t){return N.a.createElement("div",{className:ce.a.contentArea,key:"page-view-content-area-".concat(t)},e)}):N.a.createElement("div",{className:ce.a.contentArea},c)),N.a.createElement(p["a"],{type:"up",className:re()(ce.a.scrollTopBtn,m()({},ce.a.show,d)),onClick:this.handleScrollToTop}))}}]),t}(I["PureComponent"]),Q.defaultProps={openUserIdentityType:!1,openUserGroupSelect:!1,openPageIdentityType:!1,thresholdModel:"",containerStyle:{}},Z=z))||Z)||Z);t["a"]=se},O8Rh:function(e,t,a){"use strict";a.d(t,"a",function(){return g});var n=a("2Taf"),r=a.n(n),o=a("vZ4D"),i=a.n(o),l=a("l4Ni"),c=a.n(l),s=a("ujKo"),p=a.n(s),u=a("MhPg"),d=a.n(u),m=a("q1tI"),h=a.n(m),f=a("MuoO");function g(){return function(e){var t,a,n=(t=Object(f["connect"])(function(e){var t=e.common,a=e.analysis;return{isSaasApp:t.isSaasApp,isHybridApp:t.isHybridApp,productCode:t.productCode,appCode:t.appCode,tenantCode:t.tenantCode,userIdentityType:a.userIdentityType,threshold:a.threshold}}),t(a=function(t){function a(){return r()(this,a),c()(this,p()(a).apply(this,arguments))}return d()(a,t),i()(a,[{key:"render",value:function(){return h.a.createElement(e,this.props)}}]),a}(m["PureComponent"]))||a);return n}}},WvCx:function(e,t,a){"use strict";var n=a("jehZ"),r=a.n(n),o=a("Y/ft"),i=a.n(o),l=a("q1tI"),c=a.n(l),s=a("TSYQ"),p=a.n(s),u=function(e){var t=e.className,a=e.type,n=i()(e,["className","type"]),o=p()(t,"fasticon","fasticon-".concat(a));return c.a.createElement("i",r()({className:o},n))};t["a"]=u},aJ0n:function(e,t,a){e.exports={pageGroup:"pageGroup___3E0ll",header:"header___1bA0H",leftTip:"leftTip___M_d1z",rightBtns:"rightBtns___1IkR7",btn:"btn___2-4dy",disabled:"disabled___1yjeW",configList:"configList___22JSQ",row:"row___1ywp3",cell:"cell___26Csw",subRow:"subRow___19ORa",item:"item___2jEu6",delBtn:"delBtn___1sTr3",text:"text___1UOU7",hasSub:"hasSub___p2R8l",addBtn:"addBtn___3iRku",addRowBtn:"addRowBtn___2mNA-",input:"input___1_RRP",title:"title___298O1"}},iHgP:function(e,t,a){e.exports={importConfigContent:"importConfigContent___1dPNM",label:"label___3PUMk"}},s0kW:function(e,t,a){e.exports={pageView:"pageView___6S6HA",breadcrumb:"breadcrumb___1Trz1",breadItem:"breadItem___27cwR",link:"link___2gM-P",pageContainer:"pageContainer___75wnW",contentArea:"contentArea___1nxBu",scrollTopBtn:"scrollTopBtn___3kx-G",show:"show___gsN2G",noNav:"noNav___xXVni"}},vjuj:function(e,t,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"7q6C":function(e,t,a){"use strict";var n=a("TqRt"),r=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,o,i,s=n(a("MVZn")),m=n(a("lwsE")),d=n(a("W8MJ")),u=n(a("a1gu")),c=n(a("Nsbk")),f=n(a("7W2i")),p=r(a("q1tI")),_=n(a("O8Rh")),y=a("cB4r"),b=n(a("Kr6O")),x=n(a("1UQL")),h=n(a("IgyS")),v=n(a("ZfYN")),g=n(a("EGzU")),E=n(a("0O5e")),P=n(a("J2m7")),A=function(){__myWebLogTracker__.reportError(new Error("hahahah"))},F="api_requests",O=(l=(0,_.default)(),l((i=function(e){function t(){var e,a;(0,m.default)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return a=(0,u.default)(this,(e=(0,c.default)(t)).call.apply(e,[this].concat(r))),a.explandRowRender=function(e,t){var n=[{name:"\u79df\u6237TOP10",key:"tenant_top_10",title:"\u79df\u6237API\u54cd\u5e94\u65f6\u95f4TOP10"},{name:"\u8d8b\u52bf",key:"trend",title:"API\u54cd\u5e94\u65f6\u95f4\u8d8b\u52bf"}],r=a.props.isSaasApp,l=t.date_unit,o=t.from_date,i=t.to_date,m=t.order_by,d=t.num_fields,u=t.dim_fields,c=t.tenantCode,f=u[0],_={date_unit:l,from_date:o,to_date:i,order_by:m,filter:["".concat(f.name,"$eq(").concat(e[f.alias],")")]};if(Array.isArray(m)&&m.length>0){var b=m[0].split("$")[0],x=(0,P.default)(d,function(e){return e.alias===b});x&&(n[0].title="\u79df\u6237".concat(x.alias,"TOP10"),_.extra_num_field=(0,s.default)({},x),_.order_by=[m[0]])}return p.default.createElement(E.default,{name:"".concat(F,"_list_detail_").concat(e.key),analysisModel:F,DataModel:y.ApiStatusExplandDetail,params:_,tabPreferKey:"".concat(F,"::tab-prefer"),tabs:r&&!c?n:[n[1]]},p.default.createElement(v.default,{chartHeight:"280px"}))},a}return(0,f.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return p.default.createElement(b.default,{navTitle:"API\u54cd\u5e94\u65f6\u95f4",thresholdModel:F},A(),p.default.createElement(x.default,{title:"API\u54cd\u5e94\u65f6\u95f4TOP10"},p.default.createElement(g.default,{analysisModel:F,name:"".concat(F,"_top_10_filter"),dataModels:[{name:"".concat(F,"_top_10"),DataModel:y.ApiResponseTop10,paginationable:!1,component:p.default.createElement(v.default,null)}],extraParams:y.ApiResponseTop10Sorts})),p.default.createElement(x.default,{title:"API\u54cd\u5e94\u65f6\u95f4\u5217\u8868"},p.default.createElement(g.default,{analysisModel:F,name:"".concat(F,"_list_filter"),searchPlaceHolder:"\u8bf7\u8f93\u5165API",openSearch:!0,disableNoDataStatus:!0,dataModels:[{name:"".concat(F,"_list"),DataModel:y.ApiStatusList,paginationable:!0,component:p.default.createElement(h.default,{explandRowRender:this.explandRowRender})}]})))}}]),t}(p.PureComponent),o=i))||o),w=O;t.default=w},cB4r:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.ApiStatusExplandDetail=t.ApiStatusList=t.ApiResponseTop10=t.ApiResponseTop10Sorts=void 0;var r=n(a("q1tI")),l=n(a("MVZn")),o=n(a("RIqP")),i=n(a("QILm"));a("Pwec");var s=n(a("CtXQ")),m=n(a("lwsE")),d=a("zLPB"),u=a("Zf/7"),c=n(a("mwIZ")),f={hour:"request_hour",day:"request_date"},p="\u79df\u6237",_="\u65f6\u95f4",y="API",b="\u8d85\u8fc7\u9608\u503c\u54cd\u5e94\u6b21\u6570\u5360\u6bd4",x="\u8d85\u8fc7\u9608\u503c\u54cd\u5e94\u6b21\u6570",h="\u54cd\u5e94\u6b21\u6570",v="\u5e73\u5747\u54cd\u5e94\u65f6\u95f4(ms)",g="P90\u54cd\u5e94\u65f6\u95f4(ms)",E="P80\u54cd\u5e94\u65f6\u95f4(ms)",P=[{key:"order_by",text:"\u6309\u7167".concat(v,"\u6392\u5e8f"),data:["".concat(v,"$desc")]},{key:"order_by",text:"\u6309\u7167".concat(h,"\u6392\u5e8f"),data:["".concat(h,"$desc")]},{key:"order_by",text:"\u6309\u7167".concat(b,"\u6392\u5e8f"),data:["".concat(b,"$desc")]},{key:"order_by",text:"\u6309\u7167".concat(x,"\u6392\u5e8f"),data:["".concat(x,"$desc")]}];t.ApiResponseTop10Sorts=P;var A=function e(t){var a=t.threshold;return(0,m.default)(this,e),a="number"!==typeof a?3e3:a,{page:1,page_size:10,model_type:a?u.MODE_TYPES.fct:u.MODE_TYPES.adm,value_axis:[{name:"\u65f6\u957f(ms)"},{name:"\u6b21\u6570",splitLine:{show:!1}}],dim_fields:[{alias:y,name:"api"}],num_fields:[{alias:b,operator:"/",fomula:"count",name:"response_time",filter:"ge(".concat(a,")"),sub_name:"1",sub_fomula:"count",sub_trans:"numeric",hidden:!0},{alias:v,fomula:"avg",name:"response_time",formatter:d.toFix2Formatter},{alias:h,fomula:"count",name:"1",yAxisIndex:1},{alias:x,fomula:"count",name:"response_time",filter:"ge(".concat(a,")"),yAxisIndex:1}]}};t.ApiResponseTop10=A;var F=function e(t){var a=t.keyword,n=t.threshold;(0,m.default)(this,e),n="number"!==typeof n?3e3:n;var l=a?["api$lk(".concat(a,")")]:[];return{filter:l,page:1,page_size:10,model_type:n?u.MODE_TYPES.fct:u.MODE_TYPES.adm,static_sort:"".concat(y,"$asc"),dim_fields:[{alias:y,name:"api"}],num_fields:[{alias:x,fomula:"count",name:"response_time",filter:"ge(".concat(n,")"),sortable:!0,defaultSort:"desc",axisNameObj:{name:"\u6b21\u6570"}},{alias:b,operator:"/",fomula:"count",name:"response_time",filter:"ge(".concat(n,")"),sub_name:"1",sub_fomula:"count",sub_trans:"numeric",sortable:!0,formatter:d.percentFormatter,axisNameObj:{name:""}},{alias:h,fomula:"count",name:"1",sortable:!0,axisNameObj:{name:"\u6b21\u6570"}},{alias:v,fomula:"avg",name:"response_time",sortable:!0,formatter:d.toFix2Formatter,axisNameObj:{name:"\u65f6\u957f(ms)"}},{alias:E,fomula:"percentile_cont",name:"response_time",filter:"apc(0.8)",sortable:!0,render:function(e){return e<n?(0,d.toFix2Formatter)(e):r.default.createElement("div",{style:{color:"#F5222D"}},r.default.createElement(s.default,{type:"warning",style:{marginRight:"12px"},theme:"filled"}),(0,d.toFix2Formatter)(e))},axisNameObj:{name:"\u65f6\u957f(ms)"}},{alias:g,fomula:"percentile_cont",name:"response_time",filter:"apc(0.9)",sortable:!0,axisNameObj:{name:"\u65f6\u957f(ms)"},render:function(e){return e<n?(0,d.toFix2Formatter)(e):r.default.createElement("div",{style:{color:"#F5222D"}},r.default.createElement(s.default,{type:"warning",style:{marginRight:"12px"},theme:"filled"}),(0,d.toFix2Formatter)(Number(e)))}}]}};t.ApiStatusList=F;var O=function e(t,a){var n=t.extra_num_field,r=t.date_unit,s=t.order_by,y=t.filter,b=(0,i.default)(t,["extra_num_field","date_unit","order_by","filter"]);(0,m.default)(this,e);var x={tenant_top_10:{page:1,page_size:10,filter:["tenant$isnet()"].concat((0,o.default)(y)),chart_type:"barlike_horizon",grid:{left:"10%",right:"10%"},dim_fields:[{alias:p,name:"tenant"}],num_fields:[{alias:v,fomula:"avg",name:"response_time"}],order_by:["".concat(v,"$desc")],value_axis:[{name:"\u65f6\u957f(ms)"}]},trend:{filter:y,dim_fields:[{alias:_,name:f[r],data_fill:!0}],num_fields:[{alias:v,fomula:"avg",name:"response_time",type:"line",formatter:d.toFix2Formatter},{alias:h,fomula:"count",name:"1",yAxisIndex:1,type:"line"},{alias:E,fomula:"percentile_cont",name:"response_time",filter:"apc(0.8)",formatter:d.toFix2Formatter,type:"line"},{alias:g,fomula:"percentile_cont",name:"response_time",filter:"apc(0.9)",formatter:d.toFix2Formatter,type:"line"}],order_by:["".concat(_,"$asc")],tooltip:{axisPointer:{type:"line",lineStyle:{color:"#8C9BA5",opacity:.6}}},value_axis:[{name:"\u65f6\u957f(ms)"},{name:"\u6b21\u6570",splitLine:{show:!1}}],category_axis:{axisLabel:{interval:"auto"}}}},P=(0,l.default)({date_unit:r,model_type:u.MODE_TYPES.fct},b,x[a]);if("trend"!==a&&n){P.num_fields=[n],P.order_by=s;var A=(0,c.default)(n,"axisNameObj",(0,c.default)(P,"value_axis[0]",{name:""}));P.value_axis[0]=A}return P};t.ApiStatusExplandDetail=O}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"1z2f":function(e,a,t){"use strict";var d=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.TenantUserAddOverview=a.MapRegional=a.NewUserTrend=a.MonthAddedDataModel=a.DayAddedDataModel=void 0;var l=d(t("lwsE")),n=d(t("wd/R")),r=t("Zf/7"),i={hour:"hour",day:"dt"},o={user_id:"new_user_num",real_user_id:"new_real_user_num"},u="\u65b0\u589e\u7528\u6237",f="\u4eca\u65e5\u65b0\u589e\u7528\u6237",s="\u6708\u65b0\u589e\u7528\u6237(\u8fd130\u5929)",c="\u65f6\u95f4",_="\u79df\u6237",m=function e(a){var t=a.userIdentityType,d=void 0===t?"user_id":t;return(0,l.default)(this,e),{from_date:(0,n.default)().format(r.DATE_FORMAT_STRING),to_date:(0,n.default)().format(r.DATE_FORMAT_STRING),date_unit:"day",num_fields:[{alias:f,fomula:"sum",name:o[d]}]}};a.DayAddedDataModel=m;var p=function e(a){var t=a.userIdentityType,d=void 0===t?"user_id":t;return(0,l.default)(this,e),{from_date:(0,n.default)().subtract(30,"d").format(r.DATE_FORMAT_STRING),to_date:(0,n.default)().format(r.DATE_FORMAT_STRING),date_unit:"day",num_fields:[{alias:s,fomula:"sum",name:o[d]}]}};a.MonthAddedDataModel=p;var v=function e(a){var t=a.date_unit,d=a.userIdentityType,n=void 0===d?"user_id":d;return(0,l.default)(this,e),{dim_fields:[{alias:c,name:i[t],data_fill:!0}],order_by:["".concat(c,"$asc")],num_fields:[{alias:u,fomula:"sum",name:o[n],type:"line"}],value_axis:[{}],category_axis:{axisLabel:{interval:"auto"}},tooltip:{axisPointer:{type:"line",lineStyle:{color:"#8C9BA5",opacity:.6}}}}};a.NewUserTrend=v;var y=function e(a){var t=a.userIdentityType,d=void 0===t?"user_id":t,n=a.through_index,r=void 0===n?0:n,i=a.from_date,f=a.to_date,s=a.filter,c=void 0===s?[]:s;(0,l.default)(this,e);var _=[{alias:"\u7701",name:"province"},{alias:"\u5e02",name:"city"}];return{chart_type:"map",max_through_index:1,from_date:i,to_date:f,date_unit:"day",dim_fields:[_[r]],num_fields:[{alias:u,name:o[d],fomula:"sum"}],order_by:["".concat(u,"$desc")],through_index:r,filter:c}};a.MapRegional=y;var h=function e(a){var t=a.userIdentityType,d=void 0===t?"user_id":t;return(0,l.default)(this,e),{filter:["tenant$isnet()"],dim_fields:[{alias:_,name:"tenant"}],num_fields:[{alias:u,name:o[d],fomula:"sum",type:"bar"}],order_by:["".concat(u,"$desc")],value_axis:[{name:"\u7528\u6237\u6570"}],chart_type:"barlike_horizon",grid:{left:"10%",right:"10%"},data_limit:6}};a.TenantUserAddOverview=h},j4Gd:function(e,a,t){"use strict";var d=t("TqRt"),l=t("284h");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n,r,i,o,u=d(t("lwsE")),f=d(t("W8MJ")),s=d(t("a1gu")),c=d(t("Nsbk")),_=d(t("7W2i")),m=l(t("q1tI")),p=d(t("frMp")),v=d(t("O8Rh")),y=t("1z2f"),h=d(t("Kr6O")),M=d(t("1UQL")),T=d(t("ZfYN")),E=d(t("rjEP")),w=d(t("8xof")),g=d(t("EGzU")),D="new_user",A=(0,p.default)({analysisModel:D,noDataStatus:!1,name:"".concat(D,"_day_added"),DataModel:y.DayAddedDataModel,contentHeight:"64px"})(E.default),x=(0,p.default)({analysisModel:D,noDataStatus:!1,name:"".concat(D,"_month_added"),DataModel:y.MonthAddedDataModel,contentHeight:"64px"})(E.default),R=(n=(0,v.default)(),n((o=i=function(e){function a(){return(0,u.default)(this,a),(0,s.default)(this,(0,c.default)(a).apply(this,arguments))}return(0,_.default)(a,e),(0,f.default)(a,[{key:"render",value:function(){var e=this.props,t=e.isSaasApp,d=e.tenantCode;return m.default.createElement(h.default,{navTitle:"\u65b0\u589e\u7528\u6237",openUserIdentityType:!0},m.default.createElement("div",null,m.default.createElement(M.default,{style:a.STYLES.cardBlock},m.default.createElement(A,{noChart:!0})),m.default.createElement(M.default,{style:a.STYLES.cardBlockLast},m.default.createElement(x,{noChart:!0})),m.default.createElement("div",{style:{clear:"both"}})),m.default.createElement(M.default,{title:"\u65b0\u589e\u7528\u6237\u8d8b\u52bf"},m.default.createElement(g.default,{analysisModel:D,name:"".concat(D,"_trend_filter"),dataModels:[{name:"".concat(D,"_trend"),DataModel:y.NewUserTrend,paginationable:!1,component:m.default.createElement(T.default,{chartHeight:"280px"})}]})),m.default.createElement(M.default,{title:"\u6d4f\u89c8\u5730\u533a\u5206\u5e03"},m.default.createElement(g.default,{analysisModel:D,name:"".concat(D,"_regional_filter"),dataModels:[{name:"".concat(D,"_regional"),DataModel:y.MapRegional,paginationable:!1,component:m.default.createElement(w.default,{showRank:5})}]})),t&&!d&&m.default.createElement(M.default,{title:"\u79df\u6237\u65b0\u589e\u7528\u6237\u6982\u89c8"},m.default.createElement(g.default,{analysisModel:D,name:"".concat(D,"_overview_filter"),dataModels:[{name:"".concat(D,"_overview"),DataModel:y.TenantUserAddOverview,paginationable:!1,component:m.default.createElement(T.default,null)}]})))}}]),a}(m.PureComponent),i.STYLES={cardBlock:{padding:"20px 0",width:"calc(50% - 8px)",float:"left",marginRight:"16px"},cardBlockLast:{padding:"20px 0",width:"calc(50% - 8px)",float:"left"}},r=o))||r),b=R;a.default=b}}]);
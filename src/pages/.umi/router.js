import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  }),
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__404" */'../404.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__index" */'../index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/contract",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__contract__index" */'../finance/contract/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/contract/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__contract__$id__index" */'../finance/contract/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/deposit",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__deposit__index" */'../finance/deposit/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/deposit/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__deposit__$id__index" */'../finance/deposit/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/detail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__detail__index" */'../finance/detail/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/invoice",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__invoice__index" */'../finance/invoice/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/invoice/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__invoice__$id__index" */'../finance/invoice/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/order/childDetail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__order__childDetail__$id__index" */'../finance/order/childDetail/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/order",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__order__index" */'../finance/order/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/order/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__order__$id__index" */'../finance/order/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/recharge",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__recharge__index" */'../finance/recharge/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/recharge/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__recharge__$id__index" */'../finance/recharge/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/refund",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__refund__index" */'../finance/refund/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/finance/refund/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__finance__refund__$id__index" */'../finance/refund/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/friendlink/class",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__friendlink__class__index" */'../friendlink/class/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/friendlink/links",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__friendlink__links__index" */'../friendlink/links/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/admin",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__admin__index" */'../logs/admin/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/admin/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__admin__$id__index" */'../logs/admin/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/system",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__system__index" */'../logs/system/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/system/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__system__$id__index" */'../logs/system/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/users",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__users__index" */'../logs/users/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/logs/users/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__logs__users__$id__index" */'../logs/users/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/me",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__me__index" */'../me/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/me/logs",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__me__logs__index" */'../me/logs/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/me/password",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__me__password__index" */'../me/password/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/member",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__member__index" */'../member/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/menu",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__menu__index" */'../menu/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/power/common/Authorization",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__power__common__Authorization" */'../power/common/Authorization.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/power/plot",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__power__plot__index" */'../power/plot/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/power/admin",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__power__admin__index" */'../power/admin/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/power/plot/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__power__plot__$id__index" */'../power/plot/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/power/role",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__power__role__index" */'../power/role/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/dashboard",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__dashboard__index" */'../dashboard/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/add",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__add" */'../product/add.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/soft/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__soft__$id__index" */'../product/soft/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/download/detail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__download__detail" */'../product/download/detail.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/download",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__download__index" */'../product/download/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/api",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__api__index" */'../product/api/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/api/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__api__$id__index" */'../product/api/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/api/:id/Package",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__api__$id__Package" */'../product/api/$id/Package.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product/soft",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__soft__index" */'../product/soft/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/product",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__product__index" */'../product/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/banner/class",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__banner__class__index" */'../banner/class/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/banner/list",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__banner__list__index" */'../banner/list/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/promotion",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__promotion__index" */'../promotion/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/attachment/list",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__attachment__list__index" */'../attachment/list/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/attachment/node",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__attachment__node__index" */'../attachment/node/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/settings",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__settings__index" */'../settings/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/article/class",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__article__class__index" */'../article/class/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/article/list",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__article__list__index" */'../article/list/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/terminal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__terminal__index" */'../terminal/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/approve/detail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__approve__detail__$id__index" */'../approve/detail/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/approve",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__approve__index" */'../approve/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/approve/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__approve__util" */'../approve/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/detail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__detail__$id__index" */'../user/detail/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__index" */'../user/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/address/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__address__$id__index" */'../user/address/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/address",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__address__index" */'../user/address/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/loginlog",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__loginlog__index" */'../user/loginlog/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/terminal",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__terminal__index" */'../user/terminal/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/user/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__user__util" */'../user/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/aexample/detail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__aexample__detail__$id__index" */'../aexample/detail/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/aexample",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__aexample__index" */'../aexample/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/aexample/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__aexample__util" */'../aexample/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workflow/detail/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workflow__detail__$id__index" */'../workflow/detail/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workflow",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workflow__index" */'../workflow/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workflow/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workflow__util" */'../workflow/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__index" */'../workorder/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__util" */'../workorder/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/complaint/util",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__complaint__util" */'../workorder/complaint/util.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/complaint/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__complaint__$id__index" */'../workorder/complaint/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/feedback",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__feedback__index" */'../workorder/feedback/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/feedback/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__feedback__$id__index" */'../workorder/feedback/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/complaint",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__complaint__index" */'../workorder/complaint/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/list/:id",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__list__$id__index" */'../workorder/list/$id/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/solution/add",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__solution__add" */'../workorder/solution/add.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/solution",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__solution__index" */'../workorder/solution/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/workorder/workorderclass",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__workorder__workorderclass__index" */'../workorder/workorderclass/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "path": "/login",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__login__index" */'../login/index.js'), loading: require('D:/work94-zkeysadmin-umi/branches/origin/src/components/Loader/Loader').default  })
      },
      {
        "component": () => React.createElement(require('D:/work94-zkeysadmin-umi/branches/origin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/work94-zkeysadmin-umi/branches/origin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}

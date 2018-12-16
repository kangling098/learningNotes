import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('../../plugins/onError.js').default);
app.model({ namespace: 'app', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/models/app.js').default) });
app.model({ namespace: 'example', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/models/example.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/contract/model.js').default) });
app.model({ namespace: 'basic', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/models/basic.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/deposit/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/detail/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/invoice/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/order/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/recharge/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/finance/refund/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/friendlink/class/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/friendlink/links/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/admin/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/admin/$id/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/system/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/system/$id/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/users/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/logs/users/$id/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/me/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/member/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/menu/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/power/plot/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/power/admin/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/power/role/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/dashboard/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/product/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/product/soft/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/product/download/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/product/api/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/banner/class/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/banner/list/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/promotion/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/attachment/list/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/attachment/node/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/settings/model.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/article/class/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/article/list/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/terminal/model.js').default) });
app.model({ namespace: 'detail', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/approve/detail/$id/models/detail.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/approve/models/index.js').default) });
app.model({ namespace: 'detail', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/user/detail/$id/models/detail.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/user/models/index.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/user/address/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/user/loginlog/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/user/terminal/model.js').default) });
app.model({ namespace: 'detail', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/aexample/detail/$id/models/detail.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/aexample/models/index.js').default) });
app.model({ namespace: 'detail', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workflow/detail/$id/models/detail.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workflow/models/index.js').default) });
app.model({ namespace: 'index', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/models/index.js').default) });
app.model({ namespace: 'workorderclass', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/models/workorderclass.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/complaint/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/feedback/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/list/$id/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/workorder/solution/model.js').default) });
app.model({ namespace: 'model', ...(require('D:/work94-zkeysadmin-umi/branches/origin/src/pages/login/model.js').default) });

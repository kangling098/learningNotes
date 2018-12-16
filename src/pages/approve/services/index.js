import { request, config } from 'utils'
const APIV1 = config.APIV1

// 请求基本设置
export function query (params) {
  return request({
    url: `${APIV1}/approve_index`,
    method: 'get',
    data: params,
  })
}

// 删除工作流接口
export function remove (params) {
  return request({
    url: `${APIV1}/workflow_remove`,
    method: 'post',
    data: params,
  })
}
// 添加工作流接口
export function create (params) {
  return request({
    url: `${APIV1}/workflow_save`,
    method: 'post',
    data: params,
  })
}
// 编辑工作流接口
export function edit (params) {
  return request({
    url: `${APIV1}/workflow_update`,
    method: 'post',
    data: params,
  })
}



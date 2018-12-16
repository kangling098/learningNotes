import { request, config } from 'utils'
const APIV1 = config.APIV1

// 工作流详情操作接口

// 工作流详情页面请求
export function query (params) {
    return request({
        url: `${APIV1}/workflow_detail`,
        method: 'get',
        data: params,
    })
}
// 删除工作步骤流接口
export function remove (params) {
    return request({
      url: `${APIV1}/workflow_step_remove`,
      method: 'post',
      data: params,
    })
  }
// 添加工作步骤流接口
export function create (params) {
    return request({
        url: `${APIV1}/workflow_step_save`,
        method: 'post',
        data: params,
    })
}
// 编辑工作步骤流接口
export function edit (params) {
    return request({
        url: `${APIV1}/workflow_step_update`,
        method: 'post',
        data: params,
    })
}

// 编辑工作步骤流接口
export function contract (params) {
    return request({
        url: `${APIV1}/workflow_step_update_role`,
        method: 'post',
        data: params,
    })
}
// 工作流步骤排序接口
export function workflowSort (params) {
    return request({
        url: `${APIV1}/workflow_step_sort`,
        method: 'post',
        data: params,
    })
}
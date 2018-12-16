import { request, config } from 'utils'
const APIV1 = config.APIV1

// 审核详情操作接口

// 详情页面请求
export function query (params) {
    return request({
        url: `${APIV1}/approve_detail`,
        method: 'get',
        data: params,
    })
}

// 提交表单
export function approveSubmit (params) {
    return request({
        url: `${APIV1}/approve_audit`,
        method: 'post',
        data: params,
    })
}
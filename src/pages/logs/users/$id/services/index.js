import { request, config } from 'utils'
const APIV1 = config.APIV1
// 请求基本设置
export function queryDetail (params) {
  return request({
    url: `${APIV1}/user_log_detail`,
    method: 'get',
    data: params,
  })
}


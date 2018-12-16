import { request, config } from 'utils'
const APIV1 = config.APIV1

// 请求基本设置
export function query (params) {
  return request({
    url: `${APIV1}/user_log_index`,
    method: 'get',
    data: params,
  })
}

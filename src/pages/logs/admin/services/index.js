import { request, config } from 'utils'
const APIV1 = config.APIV1

// 请求基本设置
export function query (params) {
  return request({
    url: `${APIV1}/log_index`,
    method: 'get',
    data: params,
  })
}

export function queryType (data) {
  return request({
    url: `${APIV1}/get_system_object`,
    data,
  })
}

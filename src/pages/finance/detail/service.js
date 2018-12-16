import { request, config } from 'utils'

const { APIV1 } = config
// 请求基本设置
export function query (params) {
  return request({
    url: `${APIV1}/finance_index`,
    method: 'get',
    data: params,
  })
}

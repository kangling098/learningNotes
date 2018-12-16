import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/terminal_index`,
    method: 'get',
    data: params,
  })
}

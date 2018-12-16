import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/user_terminal`,
    method: 'get',
    data: params,
  })
}

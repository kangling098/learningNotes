import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/user_login_history`,
    method: 'get',
    data: params,
  })
}

export function online (params) {
  return request({
    url: `${APIV1}/user_login_out`,
    method: 'post',
    data: params,
  })
}

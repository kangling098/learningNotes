import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/user_address`,
    method: 'get',
    data: params,
  })
}

export function queryDetail (params) {
  return request({
    url: `${APIV1}/user_address_detail`,
    data: params,
  })
}

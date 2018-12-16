import { request, config } from 'utils'

const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/moneychange_index`,
    method: 'get',
    data: params,
  })
}

export function queryDeail (params) {
  return request({
    url: `${APIV1}/moneychange_detail`,
    method: 'get',
    data: params,
  })
}

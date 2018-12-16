import { request, config } from 'utils'

const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/recharge_index`,
    method: 'get',
    data: params,
  })
}

export function queryDeail (params) {
  return request({
    url: `${APIV1}/recharge_detail`,
    method: 'get',
    data: params,
  })
}

export function complete (params) {
  return request({
    url: `${APIV1}/recharge_mark_complete`,
    method: 'post',
    data: params,
  })
}

export function close (params) {
  return request({
    url: `${APIV1}/recharge_mark_close`,
    method: 'post',
    data: params,
  })
}

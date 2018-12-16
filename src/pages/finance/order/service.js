import { request, config } from 'utils'

const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/child_order_index`,
    method: 'get',
    data: params,
  })
}

export function queryDeail (params) {
  return request({
    url: `${APIV1}/order_detail`,
    method: 'get',
    data: params,
  })
}

export function queryChildren (params) {
  return request({
    url: `${APIV1}/child_order_index`,
    method: 'get',
    data: params,
  })
}


export function queryChildrenDeail (params) {
  return request({
    url: `${APIV1}/child_order_detail`,
    method: 'get',
    data: params,
  })
}

export function changeRefund (params) {
  return request({
    url: `${APIV1}/child_order_refund_status`,
    method: 'post',
    data: params,
  })
}

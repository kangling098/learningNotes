import { request, config } from 'utils'

const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/product_soft_list`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/product_soft_detail?id=${data.id}`,
  })
}

export function getOrder (data) {
  return request({
    url: `${APIV1}/product_soft_refund?id=${data.id}`,
  })
}

export function authorize(data) {
  return request({
    url: `${APIV1}/product_soft_change_bind`,
    method: 'post',
    data,
  })
}

export function renew(data) {
  return request({
    url: `${APIV1}/product_soft_renew`,
    method: 'post',
    data,
  })
}

export function refund(data) {
  return request({
    url: `${APIV1}/product_soft_refund`,
    method: 'post',
    data,
  })
}

export function remove(data) {
  return request({
    url: `${APIV1}/product_soft_remove`,
    method: 'post',
    data,
  })
}

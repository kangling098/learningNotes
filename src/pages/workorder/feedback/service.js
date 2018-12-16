import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/workordersolution_feedbackindex`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/workordersolution_feedbackdetail`,
    data,
  })
}

export function solve (data) {
  return request({
    url: `${APIV1}/workordersolution_feedbacksolve`,
    method: 'post',
    data,
  })
}

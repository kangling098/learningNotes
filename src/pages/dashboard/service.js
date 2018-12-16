import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/index`,
    method: 'get',
    data: params,
  })
}

export function userTotal (params) {
  return request({
    url: `${APIV1}/index_user_total`,
    data: params,
  })
}

export function financeTotal (params) {
  return request({
    url: `${APIV1}/index_finance_total`,
    data: params,
  })
}

export function numTotal (params) {
  return request({
    url: `${APIV1}/index_workorder_num_total`,
    data: params,
  })
}

export function keywordTotal (params) {
  return request({
    url: `${APIV1}/index_workorder_keyword_total`,
    data: params,
  })
}

export function areaTotal (params) {
  return request({
    url: `${APIV1}/index_visitor_area_total`,
    data: params,
  })
}

export function systemTotal (params) {
  return request({
    url: `${APIV1}/index_visitor_system_total`,
    data: params,
  })
}

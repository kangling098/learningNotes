import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/policy_index`,
    method: 'get',
    data: params,
  })
}

export function queryDetail (params) {
  return request({
    url: `${APIV1}/policy_detail`,
    data: params,
  })
}

export function create (params) {
  let url = `${APIV1}/policy_save`
  if(params.id) {
    url = `${APIV1}/policy_update`
  }
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/policy_remove`,
    method: 'post',
    data: params,
  })
}


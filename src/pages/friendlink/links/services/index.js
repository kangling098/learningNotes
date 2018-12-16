import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (params) {
  return request({
    url: `${APIV1}/friendlink_list`,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  let url = `${APIV1}/friendlink_save`
  if(params.id) {
    url = `${APIV1}/friendlink_update`
  }

  params.logo = params.logo[0];// 因为这里要单一附件，原logo数组转为单个值

  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/friendlink_remove`,
    method: 'post',
    data: params,
  })
}

export function getLinkTypes (params) {
  return request({
    url: `${APIV1}/friendlink_class_list`,
    method: 'get',
    data: params,
  })
}

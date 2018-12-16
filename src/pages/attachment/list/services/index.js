import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (params) {
  return request({
    url: `${APIV1}/attachment_index`,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  let url = `${APIV1}/attachment_save`
  if(params.id) {
    url = `${APIV1}/attachment_update`
  }
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/attachment_remove`,
    method: 'post',
    data: params,
  })
}

export function getBizList (params) {
  return request({
    url: `${APIV1}/attachment_mapindex`,
    method: 'get',
    data: params,
  })
}

export function queryNodes (data) {
  return request({
    url: `${APIV1}/attachmentstorage_index`,
    data,
  })
}

export function queryAllNodes (data) {
  return request({
    url: `${APIV1}/attachmentstorage_getall`,
    data,
  })
}
import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (params) {
  return request({
    url: `${APIV1}/article_list`,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  let url = `${APIV1}/article_save`
  if(params.id) {
    url = `${APIV1}/article_update`
  }

  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/article_batch_remove`,
    method: 'post',
    data: params,
  })
}

export function getTypes (params) {
  return request({
    url: `${APIV1}/article_class_list`,
    method: 'get',
    data: params,
  })
}

export function batchSetType (params) {
  return request({
    url: `${APIV1}/article_update_class`,
    method: 'post',
    data: params,
  })
}

export function batchSetState (params) {
  return request({
    url: `${APIV1}/article_update_status`,
    method: 'post',
    data: params,
  })
}

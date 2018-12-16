import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (params) {
  return request({
    url: `${APIV1}/banner_list`,
    method: 'get',
    data: params,
  })
}
export function create (params) {
  let url = `${APIV1}/banner_save`
  if(params.id) {
    url = `${APIV1}/banner_update`
  }

  params.file_id = params.file_id[0];// 因为这里要单一附件，原logo数组转为单个值
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/banner_remove`,
    method: 'post',
    data: params,
  })
}

export function getTypes (params) {
  return request({
    url: `${APIV1}/banner_class_list`,
    method: 'get',
    data: params,
  })
}

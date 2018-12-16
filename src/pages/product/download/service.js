import { request, config } from 'utils'

const APIV1 = config.APIV1

export function queryProduct (data) {
  return request({
    url: `${APIV1}/product_list`,
    data,
  })
}

export function query (data) {
  return request({
    url: `${APIV1}/product_download_list`,
    data,
  })
}

export function queryNodes (data) {
  return request({
    url: `${APIV1}/attachmentstorage_index`,
    data,
  })
}

export function create(data) {
  data.status = data.status ? 1 : 0
  data.attachment_id = data.attachment_id[0]
  let url = `${APIV1}/product_download_save`
  if(data.id) {
    url = `${APIV1}/product_download_update`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function manualUp(data) {
  return request({
    url: `${APIV1}/attachment_save`,
    method: 'post',
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/product_download_detail?id=${data.id}`,
  })
}

export function remove(data) {
  return request({
    url: `${APIV1}/product_download_remove`,
    method: 'post',
    data,
  })
}

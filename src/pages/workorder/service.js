import { request, config } from 'utils'

const APIV1 = config.APIV1

export function queryClass (data) {
  return request({
    url: `${APIV1}/workorderclass_index`,
    data,
  })
}

export function createClass (data) {
  let url = `${APIV1}/workorderclass_save`
  if(data.id) {
    url = `${APIV1}/workorderclass_update`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function removeClass (data) {
  return request({
    url: `${APIV1}/workorderclass_remove`,
    method: 'post',
    data,
  })
}

export function query (data) {
  return request({
    url: `${APIV1}/workorder_index`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/workorder_detail?id=${data.id}`,
  })
}

export function reply (data) {
  return request({
    url: `${APIV1}/workorder_reply`,
    method: 'post',
    data,
  })
}

export function queryKeyword (data) {
  return request({
    url: `${APIV1}/workorder_keyword_list`,
    data,
  })
}

export function setKeyword (data) {
  return request({
    url: `${APIV1}/workorder_save_keyword`,
    method: 'post',
    data,
  })
}

export function setType (data) {
  return request({
    url: `${APIV1}/workorder_transfer`,
    method: 'post',
    data,
  })
}

export function setComplete (data) {
  return request({
    url: `${APIV1}/workorder_solve`,
    method: 'post',
    data,
  })
}

export function receiveOrder (data) {
  return request({
    url: `${APIV1}/workorder_receipt`,
    method: 'post',
    data,
  })
}

import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/workordersolution_index`,
    data,
  })
}

export function queryClass (data) {
  return request({
    url: `${APIV1}/workorderclass_index`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/workordersolution_detail`,
    data,
  })
}


export function create (data) {
  let url = `${APIV1}/workordersolution_save`
  if(data.id) {
    url = `${APIV1}/workordersolution_update`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function remove (data) {
  return request({
    url: `${APIV1}/workordersolution_remove`,
    method: 'post',
    data,
  })
}

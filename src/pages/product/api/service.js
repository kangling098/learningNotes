import { request, config } from 'utils'

const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/product_api_list`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/product_api_detail?id=${data.id}`,
  })
}

export function changeStatus (data) {
  let url = `${APIV1}/product_api_active`
  if(data.status == 0) {
    url = `${APIV1}/product_api_closed`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function remove (data) {
  return request({
    url: `${APIV1}/product_api_remove`,
    method: 'post',
    data,
  })
}

export function changePackage (data) {
  return request({
    url: `${APIV1}/product_api_change_package`,
    method: 'post',
    data,
  })
}

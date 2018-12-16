import { request, config } from 'utils'

const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/product_list`,
    data,
  })
}

export function create (data) {
  let url = `${APIV1}/product_save/type/${data.type}`
  const { id, price, origin_price, renew_price, renew_origin_price } = data

  data[price] = parseInt(price)
  data[origin_price] = parseInt(origin_price)
  data[renew_price] = parseInt(renew_price)
  data[renew_origin_price] = parseInt(renew_origin_price)
  
  if(id) {
    url = `${APIV1}/product_update/type/${data.type}`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function queryDetail (data) {
  const { type, id } = data
  let url = ''
  if(type === 'api') {
    url = '/product_detail/type/api'
  }
  if(type === 'soft') {
    url = '/product_detail/type/soft'
  }
  return request({
    url: `${APIV1}${url}`,
    data,
  })
}

export function remove (data) {
  const { type, id } = data
  let url = ''
  if(type === 'api') {
    url = '/product_remove/type/api'
  }
  if(type === 'soft') {
    url = '/product_remove/type/soft'
  }
  return request({
    url: `${APIV1}${url}`,
    method: 'post',
    data,
  })
}

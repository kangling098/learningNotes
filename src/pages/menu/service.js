import { request, config } from 'utils'

const { APIV1, APIV2 } = config

export function query (data) {
  return request({
    url: `${APIV1}/resource_child_index`,
    data,
  })
}

export function create (data) {
  let url = `${APIV1}/resource_save`
  if(data.id) {
    url = `${APIV1}/resource_update`
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

export function remove (data) {
  return request({
    url: `${APIV1}/resource_remove`,
    method: 'post',
    data,
  })
}

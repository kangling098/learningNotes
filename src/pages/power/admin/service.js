import { request, config } from 'utils'
const { APIV1 } = config

export function query (params) {
  return request({
    url: `${APIV1}/admin_index`,
    method: 'get',
    data: params,
  })
}

export function queryRole (params) {
  return request({
    url: `${APIV1}/roles_index`,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  let url = `${APIV1}/admin_save`
  if(params.id) {
    url = `${APIV1}/admin_update`
  }
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function authUpdate (params) {
  return request({
    url: `${APIV1}/admin_auth_update`,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/admin_remove`,
    method: 'post',
    data: params,
  })
}

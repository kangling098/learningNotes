import { request, config } from 'utils'

const { api, APIV1 } = config
const { user } = api

export function query (params) {
  return request({
    url: `${APIV1}/user_list`,
    method: 'get',
    data: params,
  })
}

export function queryDetail (params) {
  return request({
    url: `${APIV1}/user_detail`,
    data: params,
  })
}

export function create (params) {
  let url = `${APIV1}/user_save`
  if(params.id) {
    url = `${APIV1}/user_update`
  }
  params.is_mobile_check = params.is_mobile_check ? 1 : 0
  params.is_email_check = params.is_email_check ? 1 : 0
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: `${APIV1}/user_remove`,
    method: 'post',
    data: params,
  })
}

export function changeMoney (params) {
  return request({
    url: `${APIV1}/user_change_money`,
    method: 'post',
    data: params,
  })
}

export function changeCredit (params) {
  return request({
    url: `${APIV1}/user_change_credit`,
    method: 'post',
    data: params,
  })
}

export function lock (params) {
  return request({
    url: `${APIV1}/user_lock`,
    method: 'post',
    data: params,
  })
}

export function unlock (params) {
  return request({
    url: `${APIV1}/user_unlock`,
    method: 'post',
    data: params,
  })
}

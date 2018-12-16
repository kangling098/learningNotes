import { request, config } from 'utils'

const { APIV1 } = config

export function query (data) {
  return request({
    url: `${APIV1}/personcenter_adminlog`,
    data,
  })
}

export function queryType (data) {
  return request({
    url: `${APIV1}/get_system_object`,
    data,
  })
}

export function changePassword (data) {
  return request({
    url: `${APIV1}/personcenter_editpass`,
    method: 'post',
    data,
  })
}

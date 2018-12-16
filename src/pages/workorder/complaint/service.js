import { request, config } from 'utils'
const APIV1 = config.APIV1

export function query (data) {
  return request({
    url: `${APIV1}/workordercomplaint_index`,
    data,
  })
}

export function queryDetail (data) {
  return request({
    url: `${APIV1}/workordercomplaint_detail?id=${data.id}`,
    data,
  })
}


export function solve (data) {
  return request({
    url: `${APIV1}/workordercomplaint_solve`,
    method: 'post',
    data,
  })
}

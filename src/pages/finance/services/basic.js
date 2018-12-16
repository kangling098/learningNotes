import { request} from 'utils'


// 请求基本设置
export function getInit () {
  return request({
    url: '/setting/basic/initData',
    method: 'get',
  })
}
// 请求基本设置
export function updateData (params) {
  return request({
    url: '/setting/basic',
    method: 'post',
    data:params,
  })
}


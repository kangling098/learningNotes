import { request, config } from 'utils'

const { APIV1 } = config

export function query (data) {
  return request({
    url: `${APIV1}/setting_index`,
    data,
  })
}

export function create (params) {
  if(params.hasOwnProperty('SiteIsClose')) {
    params.SiteIsClose = params.SiteIsClose ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportZucp')) {
    params.IsSupportZucp = params.IsSupportZucp ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportOffice')) {
    params.IsSupportOffice = params.IsSupportOffice ? 1 : 0
  }
  if(params.hasOwnProperty('IsCloseRegister')) {
    params.IsCloseRegister = params.IsCloseRegister ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportInvoice')) {
    params.IsSupportInvoice = params.IsSupportInvoice ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportWithdraw')) {
    params.IsSupportWithdraw = params.IsSupportWithdraw ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportAlipay')) {
    params.IsSupportAlipay = params.IsSupportAlipay ? 1 : 0
  }
  if(params.hasOwnProperty('IsSupportWxpay')) {
    params.IsSupportWxpay = params.IsSupportWxpay ? 1 : 0
  }
  return request({
    url: `${APIV1}/setting_${params.section}`,
    method: 'post',
    data: params,
  })
}

export function emailTest (data) {
  return request({
    url: `${APIV1}/setting_sendemail`,
    method: 'post',
    data,
  })
}

import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { query, create, emailTest } from './service'

export default modelExtend(pageModel, {
  namespace: 'setting',
  state: {
    type: 'base',
    saving: false,
    webClose: false,
    register: false,
    fileList: [],
    fileList2: [],
    fileList3: [],
    

    defaultData: {
      base: {},
      user: {},
      product: {},
      workorder: {},
      sms: {},
      email: {},
      finance: {},
      recharge: {},
    }
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/settings') {
          const payload = { section: 'base' }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload = {} }, { call, put, select }) {
      const { defaultData } = yield select(_=>_.setting)
      const { section } = payload
      const data = yield call(query, payload)
      if (data) {
        defaultData[section] = data.Data
        const result = {
          defaultData,
          type: section,
        }
        let defaultFileList = []
        let defaultFileList2 = []
        let defaultFileList3 = []

        if(section === 'base') {
          result.defaultData[section].SiteIsClose = result.defaultData[section].SiteIsClose ? true : fasle
          result.webClose = result.defaultData[section].SiteIsClose

          if(data.Data.SiteLogo && data.Data.SiteLogoUrl) {
            defaultFileList = [
              {
                uid: data.Data.SiteLogo,
                status: 'done',
                url: data.Data.SiteLogoUrl,
              }
            ]
          }

          if(data.Data.SiteUserCenterLogo && data.Data.SiteUserCenterLogoUrl) {
            defaultFileList2 = [
              {
                uid: data.Data.SiteUserCenterLogo,
                status: 'done',
                url: data.Data.SiteUserCenterLogoUrl,
              }
            ]
          }
        }

        if(data.Data.WxpayQrcodeLogo && data.Data.WxpayQrcodeLogoUrl) {
          defaultFileList3 = [
            {
              uid: data.Data.WxpayQrcodeLogo,
              status: 'done',
              url: data.Data.WxpayQrcodeLogoUrl,
            }
          ]
        }
        
        yield put({
          type: 'updateState',
          payload: {
            ...result,
            fileList: defaultFileList,
            fileList2: defaultFileList2,
            fileList3: defaultFileList3,
          },
        })
      }
    },
    * infoSave ({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          saving: true,
        },
      })
      const data = yield call(create, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
      }
      yield put({
        type: 'updateState',
        payload: {
          saving: false,
        },
      })
    },

    * emailTest ({ payload }, { call, put }) {
      const data = yield call(emailTest, payload)
      if(data.success) {
        message.success('发送成功！')
      }
    },
  },
})

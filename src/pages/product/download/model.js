import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as downloadService from './service'

const { query, queryDetail, remove, create, queryProduct, manualUp, queryNodes } = downloadService

export default modelExtend(pageModel, {
  namespace: 'download',
  state: {
    currentItem: {},
    saving: false,
    productList: [],
    productData: [],
    storages: [],
    fileList: [],
    manualVisible: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/product/download') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        if (location.pathname.includes('/product/download/detail')) {
          const { id } = location.query
          if(id) {
            dispatch({ type: 'queryDetail', payload: { id, } })
          }else {
            dispatch({
              type: 'queryProduct',
            })
            dispatch({
              type: 'getSuccess',
              payload: {
                currentItem: {
                  status: 1,
                }
              }
            })
          }
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.Data.data,
            pagination: {
              current: Number(payload.page) || 1,
              list_rows: Number(payload.list_rows) || 10,
              total: data.Data.total,
            },
          },
        })
      }
    },

    * queryProduct ({ payload = {} }, { call, put }) {
      const data = yield call(queryProduct, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            productList: data.Data.list,
          },
        })
      }
    },

    * queryNodes ({ payload = {} }, { call, put }) {
      const data = yield call(queryNodes, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            storages: data.Data.list.data,
          },
        })
      }
    },

    * manualUp ({ payload = {} }, { call, put }) {
      const data = yield call(manualUp, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'getSuccess',
          payload: {
            manualVisible: false,
          },
        })
      }
      return data
    },

    * create ({ payload }, { call, put }) {
      yield put({
        type: 'getSuccess',
        payload: {
          saving: true,
        },
      })
      const data = yield call(create, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
      }
      yield put({
        type: 'getSuccess',
        payload: {
          saving: false,
        },
      })
      return data
    },

    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      const pData = yield call(queryProduct, payload)

      if (data.success && pData.success) {
        let defaultFileList = []
        if(data.Data.id && data.Data.attachment_id) {
          defaultFileList = [
            {
              uid: data.Data.attachment_id,
              name: data.Data.attachment_name,
              status: 'done',
              url: data.Data.attachment_url,
            }
          ]
        }
        yield put({
          type: 'getSuccess',
          payload: {
            currentItem: data.Data,
            fileList: defaultFileList,
            productData: pData.Data.list.filter(item => item.type === data.Data.type)
          },
        })
      }
    },

    * remove ({ payload }, { call, put }) {
      const { resolve, id } = payload
      const data = yield call(remove, { id })
      if (data.success) {
        !!resolve && resolve()
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {
            list: data.Data.data,
          },
        })
      }
    },
  },
  reducers: {
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
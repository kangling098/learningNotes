import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as softService from './service'

const { query, queryDetail, authorize, renew, refund, remove, getOrder } = softService

export default modelExtend(pageModel, {
  namespace: 'soft',
  state: {
    currentItem: {},
    authorizeVisible: false,
    renewVisible: false,
    refundVisible: false,
    removeVisible: false,
    packageData: [],
    editingKey: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname

        if (pathname === '/product/soft') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/product/soft/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
          dispatch({ type: 'getOrder', payload: { id: match[1] } })
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

    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data.success) {
        yield put({
          type: 'getDetailSuccess',
          payload: {
            currentItem: data.Data,
          },
        })
      }
    },

    * getOrder ({ payload = {} }, { call, put }) {
      const data = yield call(getOrder, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            packageData: data.Data.order_data,
          },
        })
      }
    },

    * setAuthorize ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.soft)
      const data = yield call(authorize, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'setModal',
          payload: {
            authorizeVisible: false,
          }
        })
        yield put({
          type: 'queryDetail',
          payload: {
            id: currentItem.id,
          }
        })
      }
    },

    * setRenew ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.soft)
      const data = yield call(renew, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'setModal',
          payload: {
            renewVisible: false,
          }
        })
        yield put({
          type: 'queryDetail',
          payload: {
            id: currentItem.id,
          }
        })
      }
    },

    * setRefund ({ payload }, { call, put }) {
      const data = yield call(refund, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'setModal',
          payload: {
            refundVisible: false,
          }
        })
      }
    },

    * setRemove ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'setModal',
          payload: {
            removeVisible: false,
          }
        })
      }
    },

  },
  reducers: {
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
    getDetailSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
    setModal (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})
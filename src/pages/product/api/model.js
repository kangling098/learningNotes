import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as apiService from './service'

const { query, queryDetail, changeStatus, remove, changePackage } = apiService

export default modelExtend(pageModel, {
  namespace: 'api',
  state: {
    currentItem: {},
    removeVisible: false,
    statusVisible: false,
    packageData: [],
    editingKey: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname

        if (location.pathname === '/product/api') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/product/api/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
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
            packageData: data.Data.api_package,
          },
        })
      }
    },

    * changeStatus ({ payload = {} }, { call, put }) {
      const data = yield call(changeStatus, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'getSuccess',
          payload: {
            statusVisible: false,
          },
        })
      }
      return data
    },
    * remove ({ payload = {} }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'getSuccess',
          payload: {
            removeVisible: false,
          },
        })
      }
      return data
    },

    * changePackage ({ payload = {} }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.api)
      const data = yield call(changePackage, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'queryDetail',
          payload: {
            id: currentItem.id,
          },
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
  },
})
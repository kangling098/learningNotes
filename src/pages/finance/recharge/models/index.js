import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { query, queryDeail, complete, close } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'

export default modelExtend(pageModel, {
  namespace: 'financeRecharge',
  state: {
    currentItem: {
      status: 1,
    },
    completeVisible: false,
    closeVisible: false,
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/finance/recharge') {
          const payload = location.query || { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/finance/recharge/:id').exec(pathname)
        if (match) {
          const query = location.query
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
          dispatch({ type: 'updateState', payload: { completeVisible: false, closeVisible: false } })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
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
      const data = yield call(queryDeail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            currentItem: data.Data,
          },
        })
      }
    },

    * complete ({ payload = {} }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.financeRecharge)
      const data = yield call(complete, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'queryDetail',
          payload: {
            id: currentItem.id,
            typ: currentItem.type,
          },
        })
      }
      yield put({
        type: 'updateState',
        payload: {
          completeVisible: false,
        },
      })
    },

    * close ({ payload = {} }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.financeRecharge)
      const data = yield call(close, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'queryDetail',
          payload: {
            id: currentItem.id,
            typ: currentItem.type,
          },
        })
      }
      yield put({
        type: 'updateState',
        payload: {
          closeVisible: false,
        },
      })
    },

  },
  reducers: {
  },
})

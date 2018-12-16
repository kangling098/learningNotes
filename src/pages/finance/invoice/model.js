import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { query, queryDeail } from './service'
import { pageModel } from 'utils/model'
import { message } from 'antd'

export default modelExtend(pageModel, {
  namespace: 'invoice',
  state: {
    currentItem: {
      status: 1,
    },
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/finance/invoice') {
          const payload = location.query || { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/finance/invoice/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
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

  },
  reducers: {
  },
})

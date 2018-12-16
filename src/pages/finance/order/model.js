import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { query, queryDeail, queryChildren, queryChildrenDeail, changeRefund } from './service'
import { pageModel } from 'utils/model'
import { message } from 'antd'

export default modelExtend(pageModel, {
  namespace: 'order',
  state: {
    currentItem: {
      status: 1,
    },
    childOrder: [],
    childOrderDetail: {
      status: 1,
      attr: [],
    },
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/finance/order') {
          const payload = location.query || { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/finance/order/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { order_id: match[1] } })
          dispatch({ type: 'queryChildren', payload: { order_id: match[1], list_rows: 1000, } })
        }
        const matchChild = pathToRegexp('/finance/order/childDetail/:id').exec(pathname)
        if (matchChild) {
          dispatch({ type: 'queryChildrenDeail', payload: { order_id: matchChild[1] } })
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

    * queryChildren ({ payload = {} }, { call, put }) {
      const data = yield call(queryChildren, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            childOrder: data.Data.data,
          },
        })
      }
    },

    * queryChildrenDeail ({ payload = {} }, { call, put }) {
      const data = yield call(queryChildrenDeail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            childOrderDetail: data.Data,
          },
        })
      }
    },

    * changeRefund ({ payload = {} }, { call, put, select }) {
      const { resolve, order_ids, refund_status } = payload
      const { childOrderDetail } = yield select(_=>_.order)
      const data = yield call(changeRefund, { order_ids, refund_status })
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'queryChildrenDeail',
          payload: {
            order_id: childOrderDetail.id,
          },
        })
      }
      !!resolve && resolve()
    },

  },
  reducers: {
  },
})

import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { pageModel } from 'utils/model'
import { query, create, remove, queryDetail } from './service'

export default modelExtend(pageModel, {
  namespace: 'plot',
  state: {
    currentItem: {},
    detailData: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/power/plot') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1}
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/power/plot/:id').exec(pathname)
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
          type: 'updateState',
          payload: {
            detailData: data.Data,
          },
        })
      }
    },

    * remove ({ payload }, { call, put }) {
      const { resolve, id } = payload
      const data = yield call(remove, { id })
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        })
      }
      !!resolve && resolve()
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        })
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        })
      }
    },
  },
})

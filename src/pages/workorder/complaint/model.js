import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as service from './service'

const { query, queryDetail, solve } = service

export default modelExtend(pageModel, {
  namespace: 'complaint',
  state: {
    currentItem: {},
    handleVisible: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/workorder/complaint') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
        const match = pathToRegexp('/workorder/complaint/:id').exec(pathname)
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
          type: 'getSuccess',
          payload: {
            list: data.Data.data,
          },
        })
      }
    },

    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            currentItem: data.Data,
          },
        })
      }
    },

    * solve ({ payload = {} }, { call, put }) {
      const data = yield call(solve, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'getSuccess',
          payload: {
            handleVisible: false,
          },
        })
      }
      return data
    },
  },
  reducers: {
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

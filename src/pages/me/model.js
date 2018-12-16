import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { query, changePassword, queryType } from './service'

export default modelExtend(pageModel, {
  namespace: 'me',
  state: {
    types: [],
    saving: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/me/logs') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'queryType',
            payload,
          })
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data && data.success) {
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

    * queryType ({ payload = {} }, { call, put }) {
      const data = yield call(queryType, payload)
      if (data && data.success) {
        yield put({
          type: 'updateState',
          payload: {
            types: data.Data,
          },
        })
      }
    },

    * changePassword ({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          saving: true,
        },
      })
      const data = yield call(changePassword, payload)
      if(data && data.success) {
        message.success(data.Message || '操作成功!')
      }
      yield put({
        type: 'updateState',
        payload: {
          saving: false,
        },
      })
    },
  },
  reducers: {
  },
})

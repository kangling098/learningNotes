import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { message } from 'antd'
import { pageModel } from 'utils/model'
import { query, online } from './service'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'loginlog',
  state: {
    currentItem: {},
    modalVisible: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user/loginlog') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
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

    * online ({ payload = {} }, { call, put }) {
      const data = yield call(online, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        })
      }
      yield put({ type: 'updateState', payload: { modalVisible: false, } })
    },
  },
})

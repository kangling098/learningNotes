import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { message } from 'antd'
import { pageModel } from 'utils/model'
import { query } from '../service'

const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'financeDetail',
  state: {
    currentItem: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/finance/detail') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1}
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
  },
  reducers: {
  }
})

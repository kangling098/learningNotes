import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import * as workorderService from '../service'

const { query, queryClass } = workorderService

export default modelExtend(pageModel, {
  namespace: 'workorder',
  state: {
    workorderClass: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/workorder') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'queryClass',
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
          type: 'getSuccess',
          payload: {
            list: data.Data.data,
          },
        })
      }
    },

    * queryClass ({ payload = {} }, { call, put }) {
      const data = yield call(queryClass, payload)
        if (data.success) {
          yield put({
            type: 'getSuccess',
            payload: {
              workorderClass: data.Data,
            },
          })
        }
    },

  },
  reducers: {
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

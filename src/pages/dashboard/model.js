import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'
import { query, userTotal, financeTotal, numTotal, keywordTotal, areaTotal, systemTotal } from './service'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    mainData: {
      admin_info: {
        role: [],
      },
      notice: [],
    },
    userTotal: {
      register: [],
      active: [],
      transfer: [],
      timestamp: [],
    },
    financeTotal: {
      income: [],
      recharge: [],
      refund: [],
      timestamp: [],
    },
    numTotal: {},
    keywordTotal: {},
    areaTotal: {},
    systemTotal: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/dashboard') {
          dispatch({
            type: 'query',
            payload: {}
          })
          dispatch({
            type: 'userTotal',
            payload: {
              type: 1,
            }
          })
          dispatch({
            type: 'financeTotal',
            payload: {
              type: 1,
            }
          })
          dispatch({
            type: 'numTotal',
            payload: {}
          })
          dispatch({
            type: 'keywordTotal',
            payload: {}
          })
          dispatch({
            type: 'areaTotal',
            payload: {}
          })
          dispatch({
            type: 'systemTotal',
            payload: {}
          })
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            mainData: data.Data,
          },
        })
      }
    },

    * userTotal ({ payload = {} }, { call, put }) {
      const data = yield call(userTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            userTotal: data.Data
          },
        })
      }
    },

    * financeTotal ({ payload = {} }, { call, put }) {
      const data = yield call(financeTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            financeTotal: data.Data
          },
        })
      }
    },

    * numTotal ({ payload = {} }, { call, put }) {
      const data = yield call(numTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            numTotal: data.Data,
          },
        })
      }
    },

    * keywordTotal ({ payload = {} }, { call, put }) {
      const data = yield call(keywordTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            keywordTotal: data.Data,
          },
        })
      }
    },

    * areaTotal ({ payload = {} }, { call, put }) {
      const data = yield call(areaTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            areaTotal: data.Data,
          },
        })
      }
    },

    * systemTotal ({ payload = {} }, { call, put }) {
      const data = yield call(systemTotal, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            systemTotal: data.Data,
          },
        })
      }
    },

  },
})

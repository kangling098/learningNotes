import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as service from './service'

const { query, queryDetail, remove, queryClass, create } = service

export default modelExtend(pageModel, {
  namespace: 'solution',
  state: {
    currentItem: {},
    workorderClass: [],
    saving: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const pathname = location.pathname
        if (pathname === '/workorder/solution') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'queryClass',
          })
        }
        if (pathname.includes('/workorder/solution/add')) {
          const { id } = location.query
          if(id) {
            dispatch({
              type: 'queryDetail',
              payload: {
                id,
              }
            })
          }else {
            dispatch({
              type: 'getSuccess',
              payload: {
                currentItem: {}
              }
            })
          }
          dispatch({
            type: 'queryClass',
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

    * queryClass ({ payload = {} }, { call, put, select }) {
      const { workorderClass } = yield select(_ => _.solution)
      if(!workorderClass.length) {
        const data = yield call(queryClass, payload)
        if (data.success) {
          yield put({
            type: 'getSuccess',
            payload: {
              workorderClass: data.Data,
            },
          })
        }
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

    * create ({ payload }, { call, put }) {
      yield put({
        type: 'getSuccess',
        payload: {
          saving: true,
        },
      })
      const data = yield call(create, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'getSuccess',
          payload: {
            saving: false,
          },
        })
      }
      return data
    },

    * remove ({ payload }, { call, put }) {
      const { resolve, id } = payload
      const data = yield call(remove, { id, })
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {
            list: data.Data.data,
          },
        })
      }
      !!resolve && resolve()
    },

  },
  reducers: {
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

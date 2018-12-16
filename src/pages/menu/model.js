import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as menuService from './service'

const { query, create, remove } = menuService

export default modelExtend(pageModel, {
  namespace: 'menu',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    sortVisible: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/menu') {
          const payload = location.query || { page: 1, list_rows: 10 }
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
          type: 'getSuccess',
          payload: {
            list: data.Data,
          },
        })
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'hideModal',
        })
        yield put({
          type: 'query',
          payload: {
            list: data.Data,
          },
        })
        yield put({
          type: 'app/query',
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
          payload: {
            list: data.Data,
          },
        })
        yield put({
          type: 'app/query',
        })
      }
      !!resolve && resolve()
    },
  },
  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

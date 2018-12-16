import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as workorderService from '../service'

const { queryClass, createClass, removeClass } = workorderService

export default modelExtend(pageModel, {
  namespace: 'workorderclass',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/workorder/workorderclass') {
          const payload = Object.keys(location.query).length || { page: 1, list_rows: 100 }
          dispatch({
            type: 'queryClass',
            payload,
          })
        }
      })
    },
  },
  effects: {

    * queryClass ({ payload = {} }, { call, put }) {
      const data = yield call(queryClass, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            list: data.Data,
          },
        })
      }
    },
    * createClass ({ payload }, { call, put }) {
      const data = yield call(createClass, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'hideModal',
        })
        yield put({
          type: 'queryClass',
          payload: {
            list: data.Data,
          },
        })
      }
    },

    * removeClass ({ payload }, { call, put }) {
      const { resolve, id } = payload
      const data = yield call(removeClass, { id })
      if (data.success) {
        !!resolve && resolve(true)
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'queryClass',
          payload: {
            list: data.Data,
          },
        })
      }
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

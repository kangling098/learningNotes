import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { message } from 'antd'
import { pageModel } from 'utils/model'
import { query, create, remove, queryRole, authUpdate } from './service'

export default modelExtend(pageModel, {
  namespace: 'admin',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    authModalVisible: false,
    roles: [],
    selectRoles: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/power/admin') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1}
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'queryRole',
            payload: {
              list_rows: 10000,
            }
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

    * queryRole ({ payload = {} }, { call, put }) {
      const data = yield call(queryRole, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            roles: data.Data.data,
          },
        })
      }
    },

    * remove ({ payload }, { call, put, select }) {
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

    * authUpdate ({ payload }, { call, put }) {
      const data = yield call(authUpdate, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        })
        yield put({
          type: 'updateState',
          payload: {
            authModalVisible: false,
          },
        })
      }
    },
  },
})

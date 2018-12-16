/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'

import { query, remove, queryType } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'logsadmin',
  state: {
    currentItem: {},
    types: [],
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/logs/admin') {
          const payload = location.query || { page: 1, list_rows: 10 }
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
      if (data) {
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
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            types: data.Data,
          },
        })
      }
    },
    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.financeOrderList)
      if (data.success) {
        yield put({ type: 'updateState', payload: {
          selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload)
        } })
      } else {
        message.error(data.Message || '删除操作失败')
      }
    },


  },

  reducers: {

    submitLoadingShow (state) {
      return { ...state, submiteLoading: true }
    },
    submitLoadingHide (state) {
      return { ...state, submiteLoading: false }
    },
  },
})

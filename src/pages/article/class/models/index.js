/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'

import { query, remove, create } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'articleClass',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    sortVisible: false,
    selectedRowKeys: [],
    linkTypes: [], 
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/article/class') {
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
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.Data,
            pagination: {
              current: Number(payload.page) || 1,
              list_rows: Number(payload.list_rows) || 10,
              total: data.Data.total,
            },
          },
        })
      }
    },
    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        });
        yield put({
          type: 'hideModal',
          payload: {},
        });

      }
    },
    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload.id })
      const { selectedRowKeys } = yield select(_ => _.articleClass)
      if (data.success) {
        yield put({ type: 'updateState', payload: {
          selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload.id),
        } })
      } else {
        message.error(data.Message || '删除操作失败')
      }
    },

    * getLinkTypes ({ payload = {} }, { call, put }) {
      const data = yield call(getLinkTypes, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            linkTypes: data.Data,
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
  },
})

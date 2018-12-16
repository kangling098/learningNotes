/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'

import { query, remove, create, getTypes, batchSetType, batchSetState, } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'articleList',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    batchStateModalVisible: false,
    batchTypeModalVisible: false,
    articleTypes: [],
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/article/list') {
          const payload = location.query || { page: 1, list_rows: 10 }
          dispatch({
            type: 'query',
            payload,
          })

          dispatch({
            type: 'getTypes',
            payload: {},
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
      const data = yield call(remove, { ids: payload.id }) // 这里取payload.id是由于想单条数据和批量删除用同一个方法

      const { selectedRowKeys } = yield select(_ => _.articleList)
      const idsArr = payload.id.toString().split(',');
      let fileteredSelectedRowKeys = selectedRowKeys.filter(item => !idsArr.find(v => v == item));
      if (data.success) {
        yield put({ type: 'updateState', payload: {
          selectedRowKeys: fileteredSelectedRowKeys,
        } })
      } else {
        message.error(data.Message || '删除操作失败')
      }
    },

    * getTypes ({ payload = {} }, { call, put }) {
      const data = yield call(getTypes, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            articleTypes: data.Data,
          },
        })
      }
    },
    
    * batchEditType ({ payload }, { call, put, select }) {
      const data = yield call(batchSetType, payload) 
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        });
        yield put({
          type: 'hideBatchTypeModal',
          payload: {},
        });
      } else {
        message.error(data.Message || '操作失败')
      }
    },
    * batchEditState ({ payload }, { call, put, select }) {
      const data = yield call(batchSetState, payload) 
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {},
        });
        yield put({
          type: 'hideBatchStateModal',
          payload: {},
        });
      } else {
        message.error(data.Message || '操作失败')
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
    showBatchStateModal (state, { payload }) {
      return { ...state, ...payload, batchStateModalVisible: true }
    },
    hideBatchStateModal (state) {
      return { ...state, batchStateModalVisible: false }
    },
    showBatchTypeModal (state, { payload }) {
      return { ...state, ...payload, batchTypeModalVisible: true }
    },
    hideBatchTypeModal (state) {
      return { ...state, batchTypeModalVisible: false }
    },
  },
})

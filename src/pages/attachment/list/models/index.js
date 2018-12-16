/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'

import { query, remove, create, getBizList, queryNodes, queryAllNodes } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'attachmentList',
  state: {
    bizList: [],
    storages: [],
    allNodes: [],
    currentItem: {},
    modalVisible: false,
    bizModalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/attachment/list') {
          const payload = Object.keys(location.query).length ? location.query : { page: 1, list_rows: 10 }
          // 获取主列表
          dispatch({
            type: 'query',
            payload,
          })
          // 获取手动上传存储节点 
          dispatch({
            type: 'queryNodes',
            payload: {},
          })

          // 获取所有节点数据，用于筛选
          dispatch({
            type: 'queryAllNodes',
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
      const data = yield call(remove, { id: payload.id })
      const { selectedRowKeys } = yield select(_ => _.attachmentList)
      if (data.success) {
        yield put({ type: 'updateState', payload: {
          selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload.id),
        } })
      } else {
        message.error(data.Message || '删除操作失败')
      }
    },

    * getBizList ({ payload = {} }, { call, put }) {
      const data = yield call(getBizList, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            bizList: data.Data,
          },
        })
      }
    },

    * queryNodes ({ payload = {} }, { call, put }) {
      const data = yield call(queryNodes, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            storages: data.Data.list.data,
          },
        })
      }
    },

    * queryAllNodes ({ payload = {} }, { call, put }) {
      const data = yield call(queryAllNodes, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            allNodes: data.Data,
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

    showBizModal (state, { payload }) {
      return { ...state, ...payload, bizModalVisible: true }
    },

    hideBizModal (state) {
      return { ...state, bizModalVisible: false }
    },
  },
})

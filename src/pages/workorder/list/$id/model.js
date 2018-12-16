import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import * as workorderService from '../../service'

const { setKeyword, setType, queryClass, setComplete, receiveOrder, queryDetail, reply, queryKeyword } = workorderService

export default {

  namespace: 'workorderDetail',

  state: {
    currentItem: {
      data: {},
      history_list: [],
      reply_list: [],
      reply_template_list: [],
    },
    fileList: [],
    keywordModelVisible: false,
    keywordSource: [],
    fetching: false,
    typeModelVisible: false,
    infoModelVisible: false,
    moreInfo: [],
    moreInfoTitle: '',
    replying: false,
    classData: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/workorder/list/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
          dispatch({ type: 'queryClass' })
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
            classData: data.Data,
          },
        })
      }
    },

    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            currentItem: data.Data,
            fileList: [],
          },
        })
      }
    },

    * setKeywordSource ({ payload = {} }, { call, put }) {
      const data = yield call(queryKeyword, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            keywordSource: data.Data.length ? data.Data : [{keyword: payload.keyword}],
            fetching: false,
          }
        })
      }
    },

    * reply ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.workorderDetail)
      yield put({
        type: 'getSuccess',
        payload: {
          replying: true,
        },
      })
      const data = yield call(reply, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({ type: 'queryDetail', payload: { id: currentItem.data.id } })
      }
      yield put({
        type: 'getSuccess',
        payload: {
          replying: false,
        },
      })
    },

    * setKeyword ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.workorderDetail)
      const data = yield call(setKeyword, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'hideKeywordModal',
        })
        yield put({ type: 'queryDetail', payload: { id: currentItem.data.id } })
      }
    },
    * setType ({ payload }, { call, put , select}) {
      const { currentItem } = yield select(_=>_.workorderDetail)
      const data = yield call(setType, payload)
      if (data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'hideTypeModal',
        })
        yield put({ type: 'queryDetail', payload: { id: currentItem.data.id } })
      }
    },

    * setComplete ({
      payload,
    }, { call, put, select }) {
      const { resolve, id } = payload
      const { currentItem } = yield select(_=>_.workorderDetail)
      const data = yield call(setComplete, {id,})
      if (data.success) {
        message.success(data.Message)
        yield put({ type: 'queryDetail', payload: { id: currentItem.data.id } })
      }
      !!resolve && resolve()
    },

    * receiveOrder ({
      payload,
    }, { call, put, select }) {
      const { resolve } = payload
      const { currentItem } = yield select(_=>_.workorderDetail)
      const id = currentItem.data.id
      const data = yield call(receiveOrder, {id,})
      if (data.success) {
        message.success(data.Message)
        yield put({ type: 'queryDetail', payload: { id, } })
      }
      !!resolve && resolve()
    },
  },

  reducers: {
    showKeywordModal (state, { payload }) {
      return { ...state, ...payload, keywordModelVisible: true }
    },
    hideKeywordModal (state) {
      return { ...state, keywordModelVisible: false }
    },
    showTypeModal (state, { payload }) {
      return { ...state, ...payload, typeModelVisible: true }
    },
    hideTypeModal (state) {
      return { ...state, typeModelVisible: false }
    },
    showInfoModal (state, { payload }) {
      return { ...state, ...payload, infoModelVisible: true }
    },
    hideInfoModal (state) {
      return { ...state, infoModelVisible: false }
    },
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
  },
}

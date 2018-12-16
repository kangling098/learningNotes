import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { queryDetail, changeMoney, changeCredit, unlock, lock, remove } from '../../../services/user'

export default {

  namespace: 'userDetail',

  state: {
    currentItem: {},
    depositVisible: false,
    creditVisible: false,
    lockVisible: false,
    logoutVisible: false,
    fileList: [],
    isProtect: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/detail/:id').exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    * queryDetail ({
      payload,
    }, { call, put }) {
      const data = yield call(queryDetail, payload)
      const {
        success, message, status, ...other
      } = data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentItem: data.Data,
            fileList: [],
          },
        })
      } else {
        throw data
      }
    },

    * changeMoney ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.userDetail)
      const data = yield call(changeMoney, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'querySuccess',
          payload: {
            depositVisible: false,
          },
        })
        yield put({ type: 'queryDetail', payload: { id: currentItem.id } })
      }
    },
  
    * changeCredit ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.userDetail)
      const data = yield call(changeCredit, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'querySuccess',
          payload: {
            creditVisible: false,
          },
        })
        yield put({ type: 'queryDetail', payload: { id: currentItem.id } })
      }
    },

    * lock ({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_=>_.userDetail)
      const data = yield call(lock, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({ type: 'queryDetail', payload: { id: currentItem.id } })
      }
      yield put({ type: 'querySuccess', payload: { lockVisible: false } })
    },

    * unlock ({ payload }, { call, put, select }) {
      const { resolve, id } = payload
      const { currentItem } = yield select(_=>_.userDetail)
      const data = yield call(unlock, { id, })
      if(data.success) {
        message.success(data.Message || '操作成功!')
        yield put({ type: 'queryDetail', payload: { id: currentItem.id } })
      }
      !!resolve && resolve()
    },

    * remove ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
      if(data.success) {
        message.success(data.Message || '操作成功!')
      }
      yield put({ type: 'querySuccess', payload: { logoutVisible: false } })
      return data
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

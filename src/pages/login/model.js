import { routerRedux } from 'dva/router'
import { login } from './service'
import { setItem, ZKEYS_TOKEN, config } from '../../utils'

const imgUrl = config.verifyImg + '/api/base/verify'

export default {
  namespace: 'login',

  state: {
    loading: false,
    verifyImg: imgUrl,
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      yield put({ type: 'showLoading' })
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        setItem(ZKEYS_TOKEN, data.Data.token)
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      }else {
        yield put({ type: 'changeVerify' })
      }
      yield put({ type: 'hideLoading' })
    },
  },
  reducers: {
    showLoading (state) {
      return {
        ...state,
        loading: true,
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false,
      }
    },
    changeVerify (state) {
      return {
        ...state,
        verifyImg: imgUrl + '?v=' + new Date()
      }
    }
  },
}

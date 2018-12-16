import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import pathToRegexp from 'path-to-regexp'
import { queryDetail } from '../services/index'
import { refund, refundAll, drawnInvoiceAll } from '../../services/index'
import { model } from 'utils/model'
import {message} from 'antd'
export default modelExtend(model, {

  namespace: 'logsUsersDetail',

  state: {
    selectedRowKeys:[],
    detailData: {
    },
    // list:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname,query }) => {
        const match = pathToRegexp(`/logs/users/:id`).exec(pathname)
        if (match) {
          dispatch({ type: 'queryDetail', payload: query ? { user_log_id: match[1],...query } : { user_log_id: match[1],page:1, list_rows: 10 } })
        }
      })
    },
  },

  effects: {
    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            detailData: data.Data,
          },
        })
      }
    },
  },

  reducers: {

  },
})

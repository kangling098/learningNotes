/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'

import { query, remove, create, edit } from '../services/index'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const { prefix } = config
const NAMESPACE = 'aexample'
export default modelExtend(pageModel, {
	namespace: NAMESPACE,
	state: {
		currentItem: {},
		modalVisible: false,
		modalType: 'create',
		selectedRowKeys: [],
		isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
	},

  subscriptions: {
    setup ({ dispatch, history }) {
		history.listen((location) => {
			// if (location.pathname === '/workflow/') {
			// 	const payload = location.query || { page: 1, list_rows: 10 }
			// 	dispatch({
			// 		type: 'query',
			// 		payload,
			// 	})
			// }
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
			* remove ({ payload }, { call, put, select }) {
			const data = yield call(remove, { id: payload })
			return data
			},
			* create ({ payload }, { call, put, select }) {
			const data = yield call(create, { ...payload })
			return data
			},
			* edit ({ payload }, { call, put, select }) {
			const data = yield call(edit, { ...payload })
			return data
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

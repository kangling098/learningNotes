import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { model } from 'utils/model'
import { query, create, remove, edit, contract } from '../../../services/detail'
const NAMESPACE = 'aexampleDetail'
export default modelExtend(model,{

	namespace: NAMESPACE,

	state: {
		currentItem: {}, // 添加编辑工作流步骤步骤
		modalVisible: false,
		modalType: 'create', // create 创建工作流 edit 编辑工作流 contract 关联人员
		contractModalItem: {},
		sortVisible: false,
	},

	subscriptions: {
		setup ({ dispatch, history }) {
			// history.listen(({ pathname }) => {
			// 	const match = pathToRegexp('/workflow/detail/:id').exec(pathname)
			// 	if (match) {
			// 		dispatch({ type: 'query', payload: { id: match[1] } })
			// 	}
			// })
		},
	},

	effects: {
		* query ({
			payload,
		}, { call, put }) {
			const data = yield call(query, payload)
			if (data) {
				yield put({
					type: 'querySuccess',
					payload: {
						list: data.Data.step_info,
						// pagination: {
						// 	current: Number(payload.page) || 1,
						// 	list_rows: Number(payload.list_rows) || 10,
						// 	total: data.Data.total,
						// },
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
		* contract ({ payload }, { call, put, select }) {
			const data = yield call(contract, { ...payload })
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
})

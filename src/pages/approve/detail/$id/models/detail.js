import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { model } from 'utils/model'
import { query, approveSubmit } from '../../../services/detail'
const NAMESPACE = 'approveDetail'
export default modelExtend(model,{

	namespace: NAMESPACE,

	state: {
		currentItem: {}, // 添加编辑工作流步骤步骤
		data: {
			step_list: [],
		},
	},

	subscriptions: {
		setup ({ dispatch, history }) {
			history.listen(({ pathname }) => {
				const match = pathToRegexp('/approve/detail/:id').exec(pathname)
				if (match) {
					dispatch({ type: 'query', payload: { id: match[1] } })
				}
			})
		},
	},

	effects: {
		* query ({
			payload,
		}, { call, put }) {
			const data = yield call(query, payload)
			if (data) {
				yield put({
					type: 'updateState',
					payload: {
						data: data.Data,
					},
				})
			}
		},
		* approveSubmit ({ payload }, { call, put, select }) {
			const data = yield call(approveSubmit, { ...payload })
			return data
		},

  },

  reducers: {
  },
})

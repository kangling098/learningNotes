import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import * as productService from './service'

const { query, create, remove, queryDetail } = productService

export default modelExtend(pageModel, {
  namespace: 'product',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isApi: false,
    seoOpen: false,
    selectedRowKeys: [],
    aide: {},
    packageData: [],
    editingKey: '',
    sortVisible: false,
    saving: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/product') {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        } else if(location.pathname === '/product/add') {
          const { id, type } = location.query
          if(type !== 'api') {
            dispatch({type: 'canceltApi'})
          }
          if(id && type) {
            dispatch({
              type: 'queryDetail',
              payload: {
                id,
                type,
              },
            })
          }else {
            dispatch({
              type: 'getSuccess',
              payload: {
                packageData: [],
                currentItem: {
                  status: 1,
                  type: 'soft',
                }
              },
            })
          }
        } else {
          dispatch({type: 'canceltApi'})
          dispatch({
            type: 'seoChange',
            payload: {
              seoOpen: false,
            }
          })
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'getSuccess',
          payload: {
            list: data.Data.list,
            aide: {
              ...data.Data.num
            },
          },
        })
      }
    },

    * queryDetail ({ payload = {} }, { call, put }) {
      const data = yield call(queryDetail, payload)
      if (data.success) {
        if(data.Data && data.Data.api_package) {
          const packageData = data.Data.api_package.map(item => {
            return {
              ...item,
              key: item.id,
            }
          })
          yield put({
            type: 'getSuccess',
            payload: {
              currentItem: data.Data,
              packageData,
            },
          })
          yield put({type: 'selectApi'})
        }else {
          yield put({
            type: 'getSuccess',
            payload: {
              currentItem: data.Data
            },
          })
        }
      }
    },

    * create ({ payload }, { call, put, select }) {
      yield put({
        type: 'loadingChange',
        payload: {
          saving: true,
        },
      })

      const { type } = payload
      let data
      if(type === 'api') {
        const { packageData } = yield select(_=>_.product)
        data = yield call(create, {
          ...payload,
          api_package: JSON.stringify(packageData)
        })
      }else {
        data = yield call(create, payload) 
      }
      if (data.success) {
        message.success(data.Message || '操作成功!')
      }
      yield put({
        type: 'loadingChange',
        payload: {
          saving: false,
        },
      })
      return data
    },

    * remove ({ payload }, { call, put }) {
      const { resolve, id, type } = payload
      const data = yield call(remove, { id, type })
      if (data.success) {
        !!resolve && resolve()
        message.success(data.Message || '操作成功!')
        yield put({
          type: 'query',
          payload: {
            list: data.list,
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
      return { ...state, modalVisible: false, isApi: false, seoOpen: false, }
    },
    getSuccess (state, { payload }) {
      return { ...state, ...payload }
    },
    selectApi (state) {
      return { ...state, isApi: true }
    },
    canceltApi (state) {
      return { ...state, isApi: false }
    },
    seoChange (state, { payload }) {
      return { ...state, seoOpen: payload.seoOpen }
    },
    loadingChange (state, { payload }) {
      return { ...state, saving: payload.saving }
    },
    packageChange (state, { payload }) {
      return { ...state, ...payload}
    }
  },
})

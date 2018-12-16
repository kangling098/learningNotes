/* global window */
import modelExtend from 'dva-model-extend'
import { getInit, updateData } from '../services/basic'
import { pageModel } from 'utils/model'
import { message } from 'antd'


export default modelExtend(pageModel, {
  namespace: 'financeOrder',

  state: {
    initData: {
    },
    submiteLoading:false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/setting/basic') {
          dispatch({
            type: 'getInit',
          })
        }
      })
    },
  },

  effects: {

    * getInit ({ payload = {} }, { call, put }) {
      const data = yield call(getInit, payload)
      if (data) {
        if(data.success){
          yield put({
            type: 'update',
            payload: data.data,
          })
        }else{
			    message.error(data.Message || '获取初始化数据失败')
        }
        
      }
    },
    updateDataThrottle:[
      function*({ payload = {} }, { call, put }) {
        yield put({
          type: 'submitLoadingShow',
        })
        const data = yield call(updateData, payload)
        yield put({
          type: 'submitLoadingHide',
        })
        if (data) {
          if(data.success){
            yield put({
              type: 'update',
              payload: data.data,
            })
            
            message.success(data.Message)
          }else{
            message.error(data.Message || '操作失败')
          }
        }
      },
      { type: 'throttle', ms: 2000 },
    ],
    *updateDataLoading ({ payload = {} }, { call, put }) {
        console.log('updateDataThrottle')
        yield put({
          type: 'submitLoadingShow',
          payload:{},
        })
        const data = yield call(updateData, payload)
        yield put({
          type: 'submitLoadingHide',
          payload:{},
        })
        if (data) {
          if(data.success){
            yield put({
              type: 'update',
              payload: data.data,
            })
            
            message.success(data.Message)
          }else{
            message.error(data.Message || '操作失败')
          }
        }
    },


  },

  reducers: {
    update (state, {payload}){
      return {
        ...state ,
        initData : payload,
      }
    },
    submitLoadingShow (state) {
      return { ...state, submiteLoading: true }
    },
    submitLoadingHide (state) {
      return { ...state, submiteLoading: false }
    },
  },
})

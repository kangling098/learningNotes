import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import { Page } from 'components'
import Filter from '@/components/Filters/MediumFilter'
import Sort from '@/components/Sort'
import List from './components/List'
import Modal from './components/classModal'
import {handleRefreshCreator, sortDataFormat} from 'utils'
const NAMESPACE = 'bannerClass'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list,currentItem, modalVisible, modalType, sortVisible,
    } = modelState

    const listProps = {
        dataSource: list,
        loading,
        location,
        pagination: false,
        handleRefresh,
        onDeleteItem (id) {
            dispatch({
                type: `${NAMESPACE}/delete`,
                payload: id,
            })
            .then(()=>{
                handleRefresh({
                })
            })
        },
        onEditItem (item) {
            dispatch({
              type: `${NAMESPACE}/showModal`,
              payload: {
                modalType: 'edit',
                currentItem: {
                  ...item,
                  modalType: 'edit',
                },
              },
            })
          },
    }
      const modalProps = {
        item: modalType === 'create' ? {status: 1} : currentItem,
        visible: modalVisible,
        maskClosable: false,
        list,
        title: `${modalType === 'create' ? '新增分类' : '修改分类'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `${NAMESPACE}/create`,
            payload: {
              ...data,
            },
          })
        },
        onCancel () {
            dispatch({ type: `${NAMESPACE}/hideModal` })
        },
      }

    const createHandle = () => {
     dispatch({ type: `${NAMESPACE}/showModal`, payload: { modalType: 'create' } })
    }
    const sortHandler = () => {
        dispatch({
          type: `${NAMESPACE}/updateState`,
          payload: {
            sortVisible: true,
          },
        })
      }
    const sortProps = {
        visible: sortVisible,
        maskClosable: false,
        title: '分类排序',
        data: sortDataFormat(list),
        //confirmLoading: loading.effects['app/sort'],
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: 'app/sort',
            payload: {
              module: 'bnr',
              sequence: JSON.stringify(data),
            },
          }).then(res => {
            if(res && res.success) {
              dispatch({
                type: `${NAMESPACE}/updateState`,
                payload: {
                  sortVisible: false,
                },
              })
              dispatch({
                type: 'app/query',
              })
              dispatch({
                type: `${NAMESPACE}/query`,
              })
            }
          })
        },
        onCancel () {
          dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
              sortVisible: false,
            },
          })
        },
      }

    return (
        <Page inner>
            <div style={{ paddingBottom: 10 }}>
                <Button type="ghost" onClick={createHandle}>新增</Button>
                <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>排序</Button>
            </div>
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
            {sortVisible && <Sort {...sortProps} />}
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
  }
  
export default connect(({[NAMESPACE]:modelState, loading})=>({modelState, loading: loading.models[NAMESPACE] }))(PageCom)



import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import { Page } from 'components'
import Filter from '@/components/Filters/MediumFilter'
import Sort from '@/components/Sort'
import List from './components/List'
import Modal from './components/EditModal'
import {handleRefreshCreator, sortDataFormat} from 'utils'
const NAMESPACE = 'attachmentNodeList'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list,currentItem, modalVisible, modalType, pagination, module_list, type_list, isLocal, sortVisible,
    } = modelState
    
    const listProps = {
        dataSource: list,
        module_list,
        type_list,
        pagination,
        loading,
        location,
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
                isLocal: item.type === 'Local' ? true : false,
                currentItem: {
                  ...item,
                  modalType: 'edit',
                },
              },
            })
          },
    }

    const modalProps = {
        dispatch,
        NAMESPACE,
        item: modalType === 'create' ? {type: ''} : currentItem,
        isLocal,
        module_list, 
        type_list,
        visible: modalVisible,
        maskClosable: false,
        width: 600,
        //confirmLoading: true,
        title: `${modalType === 'create' ? '添加节点' : '修改节点'}`,
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
        dispatch({ type: `${NAMESPACE}/showModal`, payload: { modalType: 'create',fileList: [] } })
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
        title: '节点排序',
        data: sortDataFormat(list),
        //confirmLoading: loading.effects['app/sort'],
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: 'app/sort',
            payload: {
              module: 'att_node',
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
                <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>排序</Button></div>
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



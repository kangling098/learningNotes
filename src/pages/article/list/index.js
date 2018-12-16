import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import { Page } from 'components'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/EditModal'
import BatchStateModal from './components/BatchSetStateModal'
import BatchTypeModal from './components/BatchSetTypeModal'
import {handleRefreshCreator} from 'utils'
const NAMESPACE = 'articleList'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list,currentItem, modalVisible, modalType, batchStateModalVisible, batchTypeModalVisible, pagination,selectedRowKeys, articleTypes,
    } = modelState
    const options = [
        { key: 'id', value: 'ID' },
        { key: 'title', value: '标题' },
      ]
    const createHandle = () => {
        dispatch({ type: `${NAMESPACE}/showModal`, payload: { modalType: 'create',fileList: [] } })
    }
    const showBatchStateModal = () => {
        dispatch({ type: `${NAMESPACE}/showBatchStateModal`, payload: { } })
    }
    const showBatchTypeModal = () => {
        dispatch({ type: `${NAMESPACE}/showBatchTypeModal`, payload: { } })
    }

    const filterProps = {
        filter: {
          ...query,
        },
        createHandle,
        showBatchStateModal,
        showBatchTypeModal,
        options,
        selectedRowKeys,
        onFilterChange (value) {
          handleRefresh({
            ...value,
            page: 1,
          })
        },
        onDeleteItem (ids) {
            dispatch({
                type: `${NAMESPACE}/delete`,
                payload: ids,
            })
            .then(()=>{
                handleRefresh({
                })
            })
        },
      }
    const listProps = {
        dataSource: list,
        pagination,
        loading,
        location,
        handleRefresh,
        selectedRowKeys,
        onSelectChange (selectedRowKeys) {
            // 更新复选框
            dispatch({
                type: `${NAMESPACE}/updateState`,
                payload: {selectedRowKeys},
            })
        },
        onDeleteItem (ids) {
            dispatch({
                type: `${NAMESPACE}/delete`,
                payload: ids,
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
        item: modalType === 'create' ? {type: 1} : currentItem,
        articleTypes,
        visible: modalVisible,
        maskClosable: false,
        width: 800,
        //confirmLoading: true,
        title: `${modalType === 'create' ? '添加文章' : '修改文章'}`,
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
      const batchTypeModalProps = {
        articleTypes,
        visible: batchTypeModalVisible,
        maskClosable: false,
        width: 500,
        //confirmLoading: true,
        title: `批量修改文章分类`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `${NAMESPACE}/batchEditType`,
            payload: {
              ...data,
              ids: selectedRowKeys.join(","),
            },
          })
        },
        onCancel () {
          dispatch({ type: `${NAMESPACE}/hideBatchTypeModal` })
        },
      }
      const batchStateModalProps = {
        visible: batchStateModalVisible,
        maskClosable: false,
        width: 500,
        //confirmLoading: true,
        title: `批量修改文章状态`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `${NAMESPACE}/batchEditState`,
            payload: {
              ...data,
              ids: selectedRowKeys.join(","),
            },
          })
        },
        onCancel () {
          dispatch({ type: `${NAMESPACE}/hideBatchStateModal` })
        },
      }
      
    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
            {batchTypeModalVisible && <BatchTypeModal {...batchTypeModalProps} />}
            {batchStateModalVisible && <BatchStateModal {...batchStateModalProps} />}

            
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



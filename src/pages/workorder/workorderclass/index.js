import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Button } from 'antd'

import List from '../components/classList'
import Modal from '../components/classModal'

const WorkOrderClass = ({
  location, dispatch, workorderclass, loading,
}) => {
  const {
    list, modalType, modalVisible, currentItem, isMotion, selectedRowKeys,
  } = workorderclass

  const modalProps = {
    item: modalType === 'create' ? {status: 1} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`workorderclass/createClass`],
    list,
    title: `${modalType === 'create' ? '新增分类' : '修改分类'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'workorderclass/createClass',
        payload: {
          ...data,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'workorderclass/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['workorderclass/queryClass'],
    pagination: false,
    location,
    isMotion,
    onChange (data) {
      dispatch({
        type: 'workorderclass/queryClass',
        payload: {
          ...data,
        },
      })
    },
    onDeleteItem (id, resolve) {
      dispatch({
        type: 'workorderclass/removeClass',
        payload: {
          id,
          resolve,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'workorderclass/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: () => {
        
      },
    },
  }

  const createClass = () => {
    dispatch({
      type: 'workorderclass/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
      <Button type="ghost" onClick={createClass}>新增</Button>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

WorkOrderClass.propTypes = {
  
}

export default connect(({ workorderclass, loading }) => ({ workorderclass, loading }))(Form.create()(WorkOrderClass))

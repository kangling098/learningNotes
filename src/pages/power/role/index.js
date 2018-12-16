import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Modal } from 'antd'
import Filter from '@/components/Filters/SimpleFilter'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import EditModal from './components/Modal'
import Authorization from '../common/Authorization'

const { confirm } = Modal

const Role = ({
  location, dispatch, role, loading,
}) => {
  const {
    list, isMotion, pagination, modalVisible, modalType, currentItem, authModalVisible,
  } = role

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const createHandle = () => {
    dispatch({ type: 'role/updateState', payload: { modalType: 'create', modalVisible: true } })
  }
  const editHandle = currentItem => {
    dispatch({ type: 'role/updateState', payload: { modalType: 'edit', modalVisible: true, currentItem, } })
  }

  const authHandle = currentItem => {
    dispatch({ type: 'role/updateState', payload: { authModalVisible: true, currentItem, } })
  }

  const removeRole = currentItem => {
    confirm({
      title: '确定删除此角色?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'role/remove',
            payload: {
              id: currentItem.id,
              resolve,
            },
          })
        })
      },
    })
  }

  const tableProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['role/query'],
    location,
    isMotion,
    onChange: onListChange,
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      filters: [
        { text: '正常', value: 1 },
        { text: '禁用', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        if(text == 1) {
          return <span style={{color: 'green'}}>正常</span>
        }
        return <span style={{color: 'red'}}>禁用</span>
      }
    },
    {
      title: '管理',
      key: 'action',
      width: 180,
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => authHandle(record)} style={{marginRight: 8}}>权限设置</a>
            <a onClick={() => editHandle(record)} style={{marginRight: 8}}>编辑</a>
            <a onClick={() => removeRole(record)}>删除</a>
          </div>
        )
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'name', value: '角色名称' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
    options,
    createHandle,
    createText: '新增角色',
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  const modalProps = {
    item: modalType === 'create' ? {status: 0} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`role/create`],
    title: `${modalType === 'create' ? '添加角色' : '修改角色'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'role/create',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'role/updateState',
        payload: {
          modalVisible: false,
        }
      })
    },
  }

  const authModalProps = {
    item: currentItem,
    visible: authModalVisible,
    maskClosable: false,
    title: "角色授权",
    confirmLoading: loading.effects[`role/authUpdate`],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'role/authUpdate',
        payload: {
          id: currentItem.id,
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'role/updateState',
        payload: {
          authModalVisible: false,
        }
      })
    },
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Filter {...filterProps} />
      </div>
      <Table
        {...tableProps}
        columns={columns}
        simple
        rowSelection={null}
        expandAll
        defaultExpandAllRows
        rowKey={record => record.id}
        components={{
          body: { wrapper: isMotion ? AnimateBody : CommonBody },
        }}
      />
      {modalVisible && <EditModal {...modalProps} />}
      {authModalVisible && <Authorization {...authModalProps} />}
    </Page>
  )
}

Role.propTypes = {
  
}

export default connect(({ role, loading }) => ({ role, loading }))(Form.create()(Role))

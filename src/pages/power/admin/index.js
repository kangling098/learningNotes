import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Modal } from 'antd'
import Filter from '@/components/Filters/SimpleFilter'
import { handleRefreshCreator, listOnChangeCreator, getFieldValue, filteredValueCreator } from 'utils'
import EditModal from './components/Modal'
import Authorization from '../common/Authorization'

const { confirm } = Modal

const Admin = ({
  location, dispatch, admin, loading,
}) => {
  const {
    list, isMotion, pagination, modalVisible, modalType, currentItem, authModalVisible, roles, selectRoles,
  } = admin

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const createHandle = () => {
    dispatch({ type: 'admin/updateState', payload: { modalType: 'create', modalVisible: true, selectRoles: [] } })
  }
  const editHandle = currentItem => {
    const myRoles = getFieldValue(currentItem.role, 'id')
    dispatch({ type: 'admin/updateState', payload: { modalType: 'edit', modalVisible: true, currentItem, selectRoles: myRoles } })
  }

  const authHandle = currentItem => {
    dispatch({ type: 'admin/updateState', payload: { authModalVisible: true, currentItem, } })
  }

  const removeAdmin = currentItem => {
    confirm({
      title: '确定删除此管理员?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'admin/remove',
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
    loading: loading.effects['admin/query'],
    location,
    isMotion,
    onChange: onListChange,
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: query.order_key === 'id' ? query.order_type : '',
    },
    {
      title: '管理员名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '最后登录时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => authHandle(record)} style={{marginRight: 8}}>权限设置</a>
            <a onClick={() => editHandle(record)} style={{marginRight: 8}}>编辑</a>
            <a onClick={() => removeAdmin(record)}>删除</a>
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
    { key: 'mobile', value: '手机号码' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
    options,
    createHandle,
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
    roles,
    selectRoles,
    confirmLoading: loading.effects[`admin/create`],
    title: `${modalType === 'create' ? '添加管理员' : '修改管理员'}`,
    wrapClassName: 'vertical-center-modal',
    width: 600,
    onOk (data) {
      dispatch({
        type: 'admin/create',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'admin/updateState',
        payload: {
          modalVisible: false,
        }
      })
    },
    roleHandleChange (nextTargetKeys, direction, moveKeys) {
      dispatch({
        type: 'admin/updateState',
        payload: {
          selectRoles: nextTargetKeys,
        }
      })
    }
  }

  const authModalProps = {
    item: currentItem,
    visible: authModalVisible,
    maskClosable: false,
    title: "管理员授权",
    confirmLoading: loading.effects[`admin/authUpdate`],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'admin/authUpdate',
        payload: {
          id: currentItem.id,
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'admin/updateState',
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

Admin.propTypes = {
  
}

export default connect(({ admin, loading }) => ({ admin, loading }))(Form.create()(Admin))

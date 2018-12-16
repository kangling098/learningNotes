import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Modal } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/SimpleFilter'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import EditModal from './components/Modal'

const { confirm } = Modal

const Plot = ({
  location, dispatch, plot, loading,
}) => {
  const {
    list, isMotion, pagination, modalVisible, modalType, currentItem,
  } = plot

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const createHandle = () => {
    dispatch({ type: 'plot/updateState', payload: { modalType: 'create', modalVisible: true } })
  }
  const editHandle = currentItem => {
    dispatch({ type: 'plot/updateState', payload: { modalType: 'edit', modalVisible: true, currentItem, } })
  }

  const removePlot = currentItem => {
    confirm({
      title: '确定删除此策略?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'plot/remove',
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
    loading: loading.effects['plot/query'],
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
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '策略描述',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: '创建者',
      dataIndex: 'admin_id',
      key: 'admin_id',
      sorter: true,
      sortOrder: query.order_key === 'admin_id' ? query.order_type : '',
      render: text => {
        if(text == 1) {
          return text
        }else {
          return '管理员'
        }
      },
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
            <Link to={`/power/plot/${record.id}`} style={{marginRight: 8}}>查看</Link>
            <a onClick={() => editHandle(record)} style={{marginRight: 8}}>编辑</a>
            <a onClick={() => removePlot(record)}>删除</a>
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
    { key: 'name', value: '策略名称' },
    { key: 'remarks', value: '策略描述' },
    { key: 'admin_name', value: '创建者' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
    options,
    createHandle,
    createText: '新增策略',
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
    confirmLoading: loading.effects[`plot/create`],
    title: `${modalType === 'create' ? '添加策略' : '修改策略'}`,
    width: 700,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'plot/create',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'plot/updateState',
        payload: {
          modalVisible: false,
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
    </Page>
  )
}

Plot.propTypes = {
  
}

export default connect(({ plot, loading }) => ({ plot, loading }))(Form.create()(Plot))

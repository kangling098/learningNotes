import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Row, Col, Input, Select, Modal, Button } from 'antd'
import { DropOption } from 'components'
import Link from 'umi/link'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

import Filter from '@/components/Filters/SimpleFilter'

const Option = Select.Option
const FormItem = Form.Item
const { confirm } = Modal

const ColProps = {
  xs: 24,
  sm: 12,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Download = ({
  location, dispatch, download, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = download
  const { query } = location
  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['product/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange
  }

  const createHandle = () => {
    dispatch({
      type: 'download/updateState',
      payload: {
        fileList: [],
      },
    })
    dispatch(
      routerRedux.push({
      pathname: '/product/download/detail',
    }))
  }

  const handleMenuClick = (record, e) => {
    const { id } = record
    if (e.key === '1') {
      dispatch(
        routerRedux.push({
        pathname: '/product/download/detail',
        query: {
          id,
        }
      }))
    } else if (e.key === '2') {
      confirm({
        title: '确定删除此记录?',
        okType: 'danger',
        onOk () {
          return new Promise(resolve => {
            dispatch({
              type: 'download/remove',
              payload: {
                id,
                resolve,
              },
            })
          })
        },
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: '软件', value: 'soft' },
        { text: 'API', value: 'api' },
      ],
      filteredValue: filteredValueCreator(query.type),
      render: text => {
        if(text == 'soft') {
          return '软件'
        }
        return 'API'
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/product/${record.type}/${record.id}`}>{text}</Link>,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '最后更新时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
    {
      title: '下载次数',
      dataIndex: 'download_times',
      key: 'download_times',
      sorter: true,
      sortOrder: query.order_key === 'download_times' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '隐藏', value: 0 },
        { text: '显示', value: 1 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        if(text == 1) {
          return <span style={{color: 'green'}}>显示</span>
        }
        return <span style={{color: 'red'}}>隐藏</span>
      }
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
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
    { key: 'title', value: '标题' },
    { key: 'name', value: '产品名称' },
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
    </Page>
  )
}

Download.propTypes = {
  
}

export default connect(({ download, loading }) => ({ download, loading }))(Form.create()(Download))

import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Row, Col, Input, Select, } from 'antd'
import Link from 'umi/link'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'

import Filter from '@/components/Filters/SimpleFilter'

const Option = Select.Option
const FormItem = Form.Item

const ColProps = {
  xs: 24,
  sm: 12,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Soft = ({
  location, dispatch, soft, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = soft
  
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: query.order_key === 'id' ? query.order_type : '',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '绑定对象',
      dataIndex: 'bind_object',
      key: 'bind_object',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '正常', value: 1 },
        { text: '已过期', value: 3 },
        { text: '已失效', value: 5 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        if(text == 3) {
          return <span style={{color: 'red'}}>已过期</span>
        }
        if(text == 5) {
          return <span style={{color: 'gray'}}>已失效</span>
        }
        return <span style={{color: 'green'}}>正常</span>
      }
    },
    {
      title: '购买时间',
      dataIndex: 'buy_time',
      key: 'buy_time',
      sorter: true,
      sortOrder: query.order_key === 'buy_time' ? query.order_type : '',
    },
    {
      title: '到期时间',
      dataIndex: 'end_time',
      key: 'end_time',
      sorter: true,
      sortOrder: query.order_key === 'end_time' ? query.order_type : '',
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => <Link to={`/product/soft/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'bind_object', value: '绑定对象' },
    { key: 'user_id', value: '会员ID' },
  ]

  const filterProps = {
    filter: {
      ...query,
    },
    options,
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

Soft.propTypes = {
  
}

export default connect(({ soft, loading }) => ({ soft, loading }))(Form.create()(Soft))

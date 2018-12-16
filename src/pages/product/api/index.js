import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Tag } from 'antd'
import Link from 'umi/link'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

import UserInfo from '@/components/UserInfo'
import Filter from '@/components/Filters/SimpleFilter'

const Api = ({
  location, dispatch, api, loading,
}) => {
  const {
    list, isMotion, pagination
  } = api
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
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '调用码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '购买总次数',
      dataIndex: 'total_times',
      key: 'total_times',
      sorter: true,
      sortOrder: query.order_key === 'total_times' ? query.order_type : '',
      render: text => <span>{text}次</span>,
    },
    {
      title: '剩余次数',
      dataIndex: 'last_times',
      key: 'last_times',
      sorter: true,
      sortOrder: query.order_key === 'last_times' ? query.order_type : '',
      render: text => <span>{text}次</span>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        if(text == 1) {
          return <Tag color="#87d068">启用</Tag>
        }
        return <Tag color="#f50">禁用</Tag>
      },
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => <Link to={`/product/api/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }
  const options = [
    { key: 'code', value: '调用码' },
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

Api.propTypes = {
  
}

export default connect(({ api, loading }) => ({ api, loading }))(Form.create()(Api))

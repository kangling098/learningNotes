import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'

const Userterminal = ({
  location, dispatch, userterminal, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = userterminal

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['userterminal/query'],
    location,
    isMotion,
    onChange: onListChange
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '终端信息',
      dataIndex: 'terminal_id',
      key: 'terminal_id',
      render: text => <TerminalInfo id={text} />,
    },
    {
      title: '登录次数',
      dataIndex: 'login_count',
      key: 'login_count',
      sorter: true,
      sortOrder: query.order_key === 'login_count' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '显示', value: 1 },
        { text: '隐藏', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.type),
      render: text => {
        if(text == 0) {
          return <span style={{color: 'red'}}>隐藏</span>
        }
        return <span style={{color: 'green'}}>显示</span>
      }
    },
    {
      title: '首次访问时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '最后访问时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
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

Userterminal.propTypes = {
  
}

export default connect(({ userterminal, loading }) => ({ userterminal, loading }))(Form.create()(Userterminal))

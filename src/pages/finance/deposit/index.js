import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import AdminInfo from '@/components/AdminInfo'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

const Deposit = ({
  location, dispatch, deposit, loading, app,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = deposit

  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['deposit/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
			key: 'id',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />
    },
    {
      title: '入款管理员ID',
      dataIndex: 'admin_id',
      key: 'admin_id',
      render: text => <AdminInfo id={text} />
    },
    {
      title: '入款类型',
      dataIndex: 'money_type',
      key: 'money_type',
      render: text => {
        if(text == 'money') {
          return '现金'
        }
        return virtualMoneyName
      },
      filters: [
        {
          text: '现金',
          value: 'money',
        },
        {
          text: virtualMoneyName,
          value: 'virtual',
        }
      ],
      filteredValue: filteredValueCreator(query.money_type),
    },
    {
      title: '入款金额',
      dataIndex: 'money',
      key: 'money',
      render: (text, record) => {
        if(record.money_type == 'money') {
          return `￥ ${text}`
        }
        return text
      },
      sorter: true,
      sortOrder: query.order_key === 'money' ? query.order_type : '',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '入款时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => <Link to={`/finance/deposit/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'id', value: '编号' },
    { key: 'user_id', value: '会员ID' },
    { key: 'remark', value: '备注' },
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

Deposit.propTypes = {
  
}

export default connect(({ deposit, loading, app }) => ({ deposit, loading, app }))(Form.create()(Deposit))

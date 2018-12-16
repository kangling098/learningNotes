import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import { statusMap } from '@/utils/status/finance/invoice'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterStatus = []
for(let item in statusMap) {
	filterStatus.push({
		text: statusMap[item].text,
		value: item,
	})
}

const Invoice = ({
  location, dispatch, invoice, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = invoice

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['invoice/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'number',
			key: 'number',
			align: 'left',
		},
		{
      title: '会员ID',
      dataIndex: 'user_id',
			key: 'user_id',
			render: text => <UserInfo id={text} />
    },
    {
      title: '发票抬头',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '发票金额',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '申请时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '审核进度',
      dataIndex: 'handle_step',
      key: 'handle_step',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: filterStatus,
			filteredValue: filteredValueCreator(query.status),
      render: text => {
        return <span style={{color: statusMap[text].color}}>{statusMap[text].text}</span>
      }
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => <Link to={`/finance/invoice/${record.id}`}>查看</Link>,
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
    { key: 'number', value: '发票编号' },
    { key: 'title', value: '发票抬头' },
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

Invoice.propTypes = {
  
}

export default connect(({ invoice, loading }) => ({ invoice, loading }))(Form.create()(Invoice))

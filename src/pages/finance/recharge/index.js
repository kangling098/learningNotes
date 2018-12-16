import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import { rechargeTypes, rechargeStatus } from '@/utils/status/finance/recharge'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterType = []
for(let item in rechargeTypes) {
	filterType.push({
		text: rechargeTypes[item],
		value: item,
	})
}

let filterStatus = []
for(let item in rechargeStatus) {
	filterStatus.push({
		text: rechargeStatus[item].text,
		value: item,
	})
}

const Recharge = ({
  location, dispatch, financeRecharge, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = financeRecharge

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['financeRecharge/query'],
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
      title: '充值方式',
      dataIndex: 'type',
      key: 'type',
      filters: filterType,
			filteredValue: filteredValueCreator(query.type),
			render: text => rechargeTypes[text]
    },
    {
      title: '充值金额',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '交易号',
      dataIndex: 'trade_number',
      key: 'trade_number',
    },
    {
      title: '充值完成时间',
      dataIndex: 'finish_time',
      key: 'finish_time',
      sorter: true,
      sortOrder: query.order_key === 'finish_time' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
			key: 'status',
			filters: filterStatus,
			filteredValue: filteredValueCreator(query.status),
			render: (text, record) => {
				return <span style={{color: rechargeStatus[text].color}}>{rechargeStatus[text].text}</span>
			},
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => <Link to={`/finance/recharge/${record.id}`}>查看</Link>,
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
    { key: 'number', value: '编号' },
    { key: 'trade_number', value: '交易号' },
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

Recharge.propTypes = {
  
}

export default connect(({ financeRecharge, loading }) => ({ financeRecharge, loading }))(Form.create()(Recharge))

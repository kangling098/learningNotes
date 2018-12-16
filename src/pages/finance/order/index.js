import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import { orderStatus } from '@/utils/status/finance/order'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterStatus = []
for(let item in orderStatus) {
	filterStatus.push({
		text: orderStatus[item].text,
		value: item,
	})
}

const Contract = ({
  location, dispatch, order, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = order

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['order/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'order_number',
      align: 'left',
      render: (text, record) => <Link to={`/finance/order/${record.order_id}`}>{text}</Link>,
    },
    {
      title: '子订单编号',
      dataIndex: 'number',
      align: 'left',
      render: (text, record) => <Link to={`/finance/order/childDetail/${record.id}`}>{text}</Link>,
		},
		{
      title: '会员ID',
      dataIndex: 'user_id',
			render: text => <UserInfo id={text} />
    },
    {
      title: '数量',
      dataIndex: 'num',
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
    },
    {
      title: '下单时间',
      dataIndex: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: filterStatus,
			filteredValue: filteredValueCreator(query.status),
      render: text => {
        return <span style={{color: orderStatus[text].color}}>{orderStatus[text].text}</span>
      }
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => <Link to={`/finance/order/childDetail/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'number', value: '订单编号' },
    { key: 'user_id', value: '会员ID' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
    options,
    datePlaceHolder: ['支付开始时间', '支付结束时间'],
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

Contract.propTypes = {
  
}

export default connect(({ order, loading }) => ({ order, loading }))(Form.create()(Contract))

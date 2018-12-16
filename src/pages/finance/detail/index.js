import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import { detailTypes } from '@/utils/status/finance/detail'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterType = []
for(let item in detailTypes) {
	filterType.push({
		text: detailTypes[item],
		value: item,
	})
}

const Detail = ({
  location, dispatch, financeDetail, loading, app,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = financeDetail
  const { commonTag } = app.user
  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const virtualMoneyName = commonTag.virtualMoneyName

  const tableProps = {
    dataSource: list,
    loading: loading.effects['financeDetail/query'],
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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: filterType,
			filteredValue: filteredValueCreator(query.type),
			render: text => detailTypes[text]
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
			key: 'user_id',
			render: text => <UserInfo id={text} />
    },
    {
      title: '账户类型',
      dataIndex: 'money_type',
      key: 'money_type',
      filters: [
        {
          text: '现金账户',
          value: 'money'
        },
        {
          text: virtualMoneyName,
          value: 'virtual'
        }
      ],
      filteredValue: filteredValueCreator(query.money_type),
      render: text => {
        if(text == 'money') {
          return '现金账户'
        }
        return virtualMoneyName + '账户'
      }
    },
    {
      title: '变更金额',
      dataIndex: 'money',
      key: 'money',
      render: (text, record) => {
        if(record.money_type == 'money') {
          return '￥' + text
        }
        return text
      }
    },
    {
      title: '现金余额',
      dataIndex: 'balance_money',
      key: 'balance_money',
      render: text => '￥' + (text || 0)
    },
    {
      title: virtualMoneyName + '余额',
      dataIndex: 'balance_virtual',
      key: 'balance_virtual',
    },
    {
      title: '变更时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
    {
      title: '描述',
      dataIndex: 'description',
			key: 'description',
			align: 'left',
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => {
				if(record.type == 'recharge') {
          return <Link to={`/finance/recharge/${record.assoc_id}`}>查看</Link>
        }
        if(record.type == 'order') {
          return <Link to={`/finance/order/childDetail/${record.assoc_id}`}>查看</Link>
        }
        if(record.type == 'money_change') {
          return <Link to={`/finance/deposit/${record.assoc_id}`}>查看</Link>
        }
				return '-'
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
    { key: 'user_id', value: '会员ID' },
    { key: 'number', value: '流水编号' },
    { key: 'description', value: '描述' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
		options,
		datePlaceHolder: ['变更开始日期', '变更结束日期'],
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

Detail.propTypes = {
  
}

export default connect(({ financeDetail, loading, app }) => ({ financeDetail, loading, app }))(Form.create()(Detail))

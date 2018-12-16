import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import AdminInfo from '@/components/AdminInfo'
import { statusMap } from '@/utils/status/finance/refund'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterStatus = []
for(let item in statusMap) {
	filterStatus.push({
		text: statusMap[item].text,
		value: item,
	})
}

const Refund = ({
  location, dispatch, refund, loading, app,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = refund

  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['refund/query'],
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
      title: '申请人',
      dataIndex: 'user_id',
			key: 'user_id',
			render: (text, record) => {
        return (
          <div style={{marginBottom: 0}}>
            {record.user_type == 2 ? '会员' : '管理员'}
            {
              record.user_type == 2 ? (
                <UserInfo id={text}> [{text}]</UserInfo>
              ) : (
                <AdminInfo id={text}> [{text}]</AdminInfo>
              )
            }
          </div>
        )
      }
    },
    {
      title: '现金退款',
      dataIndex: 'money',
      key: 'money',
      render: text => `￥ ${text}`
    },
    {
      title: virtualMoneyName + '退款',
      dataIndex: 'virtual',
      key: 'virtual',
    },
    {
      title: '退款原因',
      dataIndex: 'remark',
      key: 'remark',
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
			render: (text, record) => <Link to={`/finance/refund/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'number', value: '编号' },
    { key: 'user_id', value: '申请人' },
    { key: 'remark', value: '退款原因' },
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

Refund.propTypes = {
  
}

export default connect(({ refund, loading, app }) => ({ refund, loading, app }))(Form.create()(Refund))

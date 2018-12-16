import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import UserInfo from '@/components/UserInfo'
import { statusMap } from '@/utils/status/finance/contract'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

let filterStatus = []
for(let item in statusMap) {
	filterStatus.push({
		text: statusMap[item].text,
		value: item,
	})
}

const Contract = ({
  location, dispatch, contract, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = contract

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['contract/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange
  }

  const columns = [
    {
      title: '合同编号',
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
      title: '甲方名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: '联系人',
      dataIndex: 'customer_contact_name',
      key: 'customer_contact_name',
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
			render: (text, record) => <Link to={`/finance/contract/${record.id}`}>查看</Link>,
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
    { key: 'number', value: '合同编号' },
    { key: 'customer_name', value: '甲方名称' },
    { key: 'customer_contact_name', value: '联系人' },
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

Contract.propTypes = {
  
}

export default connect(({ contract, loading }) => ({ contract, loading }))(Form.create()(Contract))

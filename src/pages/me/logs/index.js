import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Table, Input } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import { handleRefreshCreator, listOnChangeCreator } from 'utils'
import TerminalInfo from '@/components/TerminalInfo'

const logs = ({
  location, dispatch, me, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination, types
  } = me

  const { query } = location

  const filters = []
  for(let item in types) {
    filters.push({
      text: types[item],
		  value: item,
    })
  }

  const handleRefresh = handleRefreshCreator(location, dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    pagination,
    loading: false,
    location,
    isMotion,
    onChange: onListChange
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '操作类型',
      dataIndex: 'object_name',
      filters: filters,
      render: text =>  types[text],
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'left',
    },
    {
      title: '终端信息',
      dataIndex: 'from_ip',
      render: (text, record) => <TerminalInfo id={record.terminal_id}>{text}</TerminalInfo>,
    },
    {
      title: '操作时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => {
        if(record.content) {
          return <Link to={`/logs/admin/${record.id}`}>详情</Link>
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

logs.propTypes = {
  
}

export default connect(({ me, loading }) => ({ me, loading }))(Form.create()(logs))

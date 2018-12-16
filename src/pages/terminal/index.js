import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import TerminalInfo from '@/components/TerminalInfo'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'

const Terminal = ({
  location, dispatch, terminal, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = terminal

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['terminal/query'],
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
      render: text => <TerminalInfo id={text} />
    },
    {
      title: 'HASH',
      dataIndex: 'info_hash',
      key: 'info_hash',
    },
    {
      title: '操作系统',
      dataIndex: 'system',
      key: 'system',
      filters: [
        { text: 'Windows', value: 1 },
        { text: 'OS', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.system),
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      filters: [
        { text: 'chrome', value: 1 },
        { text: '360', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.browser),
    },
    {
      title: '分辨率',
      dataIndex: 'screen',
      key: 'screen',
    },
    {
      title: 'IP',
      dataIndex: 'from_ip',
      key: 'from_ip',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '访问总数',
      dataIndex: 'visit_count',
      key: 'visit_count',
      sorter: true,
      sortOrder: query.order_key === 'visit_count' ? query.order_type : '',
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
    { key: 'from_ip', value: 'IP' },
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
        scroll={{ x: 1250 }}
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

Terminal.propTypes = {
  
}

export default connect(({ terminal, loading }) => ({ terminal, loading }))(Form.create()(Terminal))

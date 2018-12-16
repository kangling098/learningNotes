import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Row, Col, Input, Select, } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'

const Option = Select.Option
const FormItem = Form.Item
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Feedback = ({
  location, dispatch, feedback, loading,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination
  } = feedback

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const tableProps = {
    dataSource: list,
    loading: loading.effects['feedback/query'],
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
      sorter: true,
      sortOrder: query.order_key === 'id' ? query.order_type : '',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '解决方案',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '是否处理',
      dataIndex: 'is_handle',
      key: 'is_handle',
      filters: [
        { text: '已处理', value: 1 },
        { text: '未处理', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.is_handle),
      render: text => {
        if(text == 0) {
          return <span style={{color: 'red'}}>未处理</span>
        }
        return <span style={{color: 'green'}}>已处理</span>
      }
    },
    {
      title: '反馈时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '处理时间',
      dataIndex: 'handle_time',
      key: 'handle_time',
      sorter: true,
      sortOrder: query.order_key === 'handle_time' ? query.order_type : '',
    },
    {
      title: '处理人',
      dataIndex: 'handle_name',
      key: 'handle_name',
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => <Link to={`/workorder/feedback/${record.id}`}>查看</Link>,
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
    { key: 'title', value: '解决方案' },
    { key: 'content', value: '返回内容' },
    { key: 'handle_name', value: '处理人' },
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

Feedback.propTypes = {
  
}

export default connect(({ feedback, loading }) => ({ feedback, loading }))(Form.create()(Feedback))

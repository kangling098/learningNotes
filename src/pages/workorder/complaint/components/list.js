import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import Link from 'umi/link'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import { typeMap, statusMap } from '../util'
import { filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'

const List = ({
  location, isMotion, ...tableProps
}) => {
  const { query } = location
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
      render: text => <span>{typeMap[text]}</span>,
      filters: [
        { text: '服务投诉', value: 1 },
        { text: '产品投诉', value: 2 },
        { text: '流程投诉', value: 3 },
        { text: '建议意见', value: 4 },
        { text: '其他', value: 5 },
      ],
      filteredValue: filteredValueCreator(query.type),
    },
    {
      title: '标题',
      dataIndex: 'workorder_title',
      key: 'workorder_title',
      render: (text, record) => <Link to={`/workorder/list/${record.id}`}>{text}</Link>,
    },
    {
      title: '投诉内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span style={{color: statusMap[text].color}}>{statusMap[text].text}</span>,
      filters: [
        { text: '已删除', value: -1 },
        { text: '待处理', value: 1 },
        { text: '已处理', value: 2 },
      ],
      filteredValue: filteredValueCreator(query.status),
    },
    {
      title: '投诉时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => <Link to={`/workorder/complaint/${record.id}`}>查看</Link>,
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      columns={columns}
      simple
      rowSelection={null}
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List

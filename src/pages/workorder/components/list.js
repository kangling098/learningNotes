import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import Link from 'umi/link'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import { statusMap } from '../util'
import { filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'

const typeFilters = []
for(let item in statusMap) {
  typeFilters.push({
    text: statusMap[item].text,
    value: item,
  })
}

const List = ({
  onDeleteItem, onEditItem, isMotion, location, workorderClass, ...tableProps
}) => {
  const { query } = location
  const getFilters = workorderClass => {
    const results = []
    for(let i = 0; i < workorderClass.length; i++) {
      const item = workorderClass[i]
      if(item.children) {
        results.push({
          text: item.name,
          value: item.id,
          children: getFilters(item.children)
        })
      }else {
        results.push({
          text: item.name,
          value: item.id,
        })
      }
    }
    return results
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record) => <Link to={`/workorder/list/${record.id}`}>{text}</Link>,
    },
    {
      title: '工单类别',
      dataIndex: 'class_id',
      key: 'class_id',
      render: (text, record) => {
        return record.class_name
      },
      filters: getFilters(workorderClass),
      filteredValue: filteredValueCreator(query.class_id),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: typeFilters,
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        const statusObj = statusMap[text]
        return <span style={{color: statusObj.color}}>{statusObj.text}</span>
      },
    },
    {
      title: '是否解决',
      dataIndex: 'is_solve',
      key: 'is_solve',
      width: '10%',
      filters: [
        { text: '未解决', value: 0 },
        { text: '已解决', value: 1 },
      ],
      filteredValue: filteredValueCreator(query.is_solve),
      render: (text, record) => {
        if(record.is_solve == 0) {
          return <Tag color="#87d068">未解决</Tag>
        }
        return <Tag color="#f50">已解决</Tag>
      },
    },
    {
      title: '提交时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '最后更新时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
    {
      title: '接单人',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => <Link to={`/workorder/list/${record.id}`}>查看</Link>,
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

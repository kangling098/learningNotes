import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Modal } from 'antd'
import Link from 'umi/link'
import { DropOption } from 'components'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import { filteredValueCreator } from 'utils' 

const { confirm } = Modal

const List = ({
  location, isMotion, onEditItem, onDeleteItem, workorderClass, ...tableProps
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

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除此记录?',
        okType: 'danger',
        onOk () {
          return new Promise((resolve) => {
            onDeleteItem({
              id: record.id,
            }, resolve)
          })
        },
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '工单类别',
      dataIndex: 'class_id',
      key: 'class_id',
      render: (text, record) => {
        return record.class_name
      },
      filteredValue: filteredValueCreator(query.class_id),
      filters: getFilters(workorderClass),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/workorder/list/${record.id}`}>{text}</Link>,
    },
    {
      title: '阅读数',
      dataIndex: 'hit_count',
      key: 'hit_count',
      sorter: true,
      sortOrder: query.order_key === 'hit_count' ? query.order_type : '',
    },
    {
      title: '觉得有用',
      dataIndex: 'valid_count',
      key: 'valid_count',
      sorter: true,
      sortOrder: query.order_key === 'valid_count' ? query.order_type : '',
    },
    {
      title: '觉得没用',
      dataIndex: 'invalid_count',
      key: 'invalid_count',
      sorter: true,
      sortOrder: query.order_key === 'invalid_count' ? query.order_type : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        if(text == 1) {
          return <Tag color="#87d068">显示</Tag>
        }else {
          return <Tag color="#f50">隐藏</Tag>
        }
      },
      filters: [
        { text: '显示', value: 1 },
        { text: '隐藏', value: 0 },
      ],
    },
    {
      title: '最后更新时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      }
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

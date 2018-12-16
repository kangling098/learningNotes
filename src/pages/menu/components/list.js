import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import AnimTableBody from 'components/DataTable/AnimTableBody'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除此菜单?',
        okType: 'danger',
        onOk () {
          return new Promise((resolve) => {
            onDeleteItem(record.id, resolve)
          })
        },
      })
    }
  }

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '30%',
    },
    {
      title: '菜单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      width: '10%',
      render: (text, record) => {
        if(record.status == 1) {
          return <Tag color="#87d068">启用</Tag>
        }
        return <Tag color="#f50">禁用</Tag>
      },
    },
    {
      title: '路由',
      dataIndex: 'action',
      key: 'action',
      align: 'left',
    },
    {
      title: '操作',
      key: 'action2',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
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

import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import Link from 'umi/link'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import UserInfo from '@/components/UserInfo'
import { typeMap, statusMap, lockMap, authMap } from '../util'
import { filteredValueCreator } from 'utils'
import styles from './List.less'

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {

  const { query } = location

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: query.order_key === 'id' ? query.order_type : '',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      sorter: true,
      sortOrder: query.order_key === 'number' ? query.order_type : '',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: '合作商', value: 2 },
        { text: '普通会员', value: 1 },
      ],
      filteredValue: filteredValueCreator(query.type),
      render: text => typeMap[text],
    },
    {
      title: '帐号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '余额',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '正常', value: 1 },
        { text: '禁用', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => statusMap(text),
    },
    {
      title: '实名状态',
      dataIndex: 'auth_status',
      key: 'auth_status',
      filters: [
        { text: '已实名', value: 1 },
        { text: '未实名', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.auth_status),
      render: text => authMap(text),
    },
    {
      title: '锁定状态',
      dataIndex: 'lock_status',
      key: 'lock_status',
      filters: [
        { text: '已锁定', value: 1 },
        { text: '未锁定', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.lock_status),
      render: text => lockMap(text),
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      sortOrder: query.order_key === 'create_time' ? query.order_type : '',
    },
    {
      title: '最后登录时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      sorter: true,
      sortOrder: query.order_key === 'modified_time' ? query.order_type : '',
    },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (text, record) => {
        return <p className={styles.action}>
          <a onClick={() => onEditItem(record)}>编辑</a>
          <Link to={`/user/detail/${record.id}`}>查看</Link>
        </p>
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
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      scroll={{ x: 1250 }}
      columns={columns}
      simple
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

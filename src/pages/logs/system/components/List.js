import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'
import AdminInfo from '@/components/AdminInfo'  
const {confirm} = Modal

const List = ({
    onDeleteItem, onEditItem, location,handleRefresh, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法
    const handleMenuClick = (record, e) => {
        if(e.key === '1'){
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: '确定删除这条记录？',
                onOk () {
                    onDeleteItem(record.id)
                },
            })
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            sortOrder: query.order_key === 'id' && query.order_type,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            filters: [
              { text: '客户端异常', value: 'client' },
              { text: '服务端异常', value: 'server' },
            ],
            render: (text, record) => {
                if(text == 1) {
                  return '系统'
                }
                if(text == 2) {
                  return  (
                      <React.Fragment>
                          {'会员'}
                          [<UserInfo id={record.id} />]
                      </React.Fragment>
                  )
                }
                if(text == 3) {
                  return  (
                      <React.Fragment>
                          {'管理'}
                          [<AdminInfo id={record.id} />]
                      </React.Fragment>
                  )
                }
  
                return '会员类型'
              },
        },
        {
            title: '报告人',
            dataIndex: 'user_type',
            key: 'user_type',
            filters: [
              { text: '系统', value: 1 },
              { text: '会员', value: 2 },
              { text: '管理', value: 3 },
            ],
            render: text => {
              if(text == 1) {
                return '系统'
              }
              if(text == 2) {
                return '会员'
              }
              if(text == 3) {
                return '管理'
              }

              return '报告人'
            },
        },
        {
            title: '会员ID',
            dataIndex: 'user_id',
            key: 'user_id',
            render: text => <UserInfo id={text} />,
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '终端信息',
            dataIndex: 'terminal_id',
            key: 'terminal_id',
            render: text => <TerminalInfo id={text} />,
        },
        {
            title: '管理',
            key: 'operation',
            fixed: 'right',
            width: 130,
            render: (text, record) => {
              return <Link to={`/logs/system/${record.id}`}>查看</Link>
            },
        },
    ]
    const AnimateBody = (props) => {
        return <AnimTableBody {...props} />
    }

    return (
        <Table
            {...tableProps}
            className={styles.table}
            scroll={{ x: 1250 }}
            columns={columns}
            rowSelection={null}
            onChange={onChange}
            simple
            rowKey={record => record.id}
            components={{
                body:AnimateBody,
            }}
        />
    )
}
List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    location: PropTypes.object,
}
export default List

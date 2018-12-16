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
import {orderStatus} from 'utils/status/finance/order' // 获取订单状态映射对象
const {confirm} = Modal
const statusRender = mapObjCreator(orderStatus)
const statusFilterObj = filterObjCreator(orderStatus) // 格式[{text:'待支付',value:'1'}]

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
            width: 40,
        },
        {
            title: '会员ID',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 120,
            render: text => <UserInfo id={text} />,
        },
        {
            title: '操作对象',
            dataIndex: 'object_name',
            key: 'object_name',
            width: 120,
            render: (text, record) => {
                return (
                    <div>
                        {record.object_name}
                        <Link to={`/logs/admin/${record.object_id}`}>[{record.object_id}]</Link>
                    </div>
                )
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 120,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            width: 120,
        },
        {
            title: '终端信息',
            dataIndex: 'terminal_id',
            key: 'terminal_id',
            width: 120,
            render: text => <TerminalInfo id={text}/>,
        },
        {
            title: '操作时间',
            dataIndex: 'modified_time',
            key: 'modified_time',
            width: 120,
        },
        {
            title: '管理',
            key: 'operation',
            width: 100,
            fixed: 'right',
            render: (text, record) => {
              return <Link to={`/logs/users/${record.id}`}>查看</Link>
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

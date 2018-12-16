import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import { routerRedux } from 'dva/router'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,mapAttr2ArrCreator ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'
import AdminInfo from '@/components/AdminInfo'
import {statusMap, auditStatusMap, auditResultMap, userTypeMap} from '../util' // 获取工作流状态映射
const {confirm} = Modal

const List = ({
    onDeleteItem, onEditItem, location, handleRefresh, dispatch, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法

    const columns = [
        {
            title: '审核类别',
            dataIndex: 'workflow_name',
            key: 'workflow_name',
        },
        {
            title: '发起人类型',
            dataIndex: 'user_type',
            key: 'user_type',
            filters: mapAttr2ArrCreator(userTypeMap),
            filteredValue: filteredValueCreator(query.user_type),
            render: (text) => {
                return (
                    <span>{userTypeMap[text]['text']}</span>
                )
            },
        },
        {
            title: '发起人',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: '审核状态',
            dataIndex: 'audit_status',
            key: 'audit_status',
            filters: mapAttr2ArrCreator(auditStatusMap),
            filteredValue: filteredValueCreator(query.audit_status),
            render: (text) => {
                return (
                    <span style={{color:auditStatusMap[text]['color']}}>{auditStatusMap[text]['text']}</span>
                )
            },
        },
        {
            title: '审核结果',
            dataIndex: 'audit_result',
            key: 'audit_result',  
            filters: mapAttr2ArrCreator(auditResultMap),
            filteredValue: filteredValueCreator(query.audit_result),       
            render: (text) => {
                return (
                    <span style={{color:auditResultMap[text]['color']}}>{auditResultMap[text]['text']}</span>
                )
            },
        },
        {
            title: '申请时间',
            dataIndex: 'create_time',
            key: 'create_time',
            sortOrder: query.order_key === 'create_time' ? query.order_type : '',
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
                return (
                    <Link to={`/approve/detail/${record.id}`}>详情</Link>
                )
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
            scroll={{ x: 940 }}
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

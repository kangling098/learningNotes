import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import { routerRedux } from 'dva/router'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'
import AdminInfo from '@/components/AdminInfo'
import {statusMap} from '../util' // 获取工作流状态映射
const {confirm} = Modal

const List = ({
    onDeleteItem, onEditItem, location, handleRefresh, dispatch, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法
    const handleMenuClick = (record, e) => {
        if(e.key === '1'){
            onEditItem(record)
        } else if (e.key === '2') {
            dispatch(routerRedux.push({
                pathname: `/workflow/detail/${record.id}`,
            }))
        } else if (e.key === '3') {
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
            title: '调用代码',
            dataIndex: 'code',
            key: 'code',
            // sorter: true,
            // sortOrder: query.order_key === 'code' && query.order_type,
            // width: 60,
        },
        {
            title: '工作流名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                return (
                    <span style={{color:statusMap[text]['color']}}>{statusMap[text]['text']}</span>
                )
            },
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (text, record) => {
              return (
                <DropOption 
                    onMenuClick={e => handleMenuClick(record, e)} 
                    menuOptions={[
                        { key: '1', name: '编辑' }, 
                        { key: '2', name: '流程' }, 
                        { key: '3', name: '删除' },
                    ]} 
                />)
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

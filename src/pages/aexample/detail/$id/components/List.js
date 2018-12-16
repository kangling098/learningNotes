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
import {isAllowBackMap} from '../../../util' // 获取工作流状态映射
const {confirm} = Modal

const List = ({
    onDeleteItem, onEditItem, location, handleRefresh, dispatch, onContractClick, ...tableProps
}) => {
    const { query } = location
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
            title: '工作流步骤名字',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '关联人员',
            dataIndex: 'people',
            key: 'people',
            render: (text,record) => {
                return (
                    <span onClick={()=>{ onContractClick(record) }} style={{color: '#1890ff', cursor: 'pointer'}}>选择</span>
                )
            },
        },
        {
            title: '允许回退',
            dataIndex: 'is_allow_back',
            key: 'is_allow_back',
            render: (text,record) => {
                return (
                    <span style={{color:isAllowBackMap[text]['color']}}>{isAllowBackMap[text]['text']}</span>
                )
            },
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
                        { key: '2', name: '删除' },
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
            scroll={{ x: 1250 }}
            columns={columns}
            rowSelection={null}
            onChange={onChange}
            simple
            pagination={false}
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Popconfirm, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,fileSizeUnitFormat ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
const {confirm} = Modal

const List = ({
     ...tableProps
}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '所属会员',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (text, record) => <UserInfo id={text}/>, 
        },
        {
            title: '表名称',
            dataIndex: 'table_name',
            key: 'table_name',
        },
        {
            title: '记录ID',
            dataIndex: 'table_id',
            key: 'table_id',
        },
        {
            title: '上传时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: text => {
                return text == 1 ? <span style={{color: 'green'}}>启用</span> : <span style={{color: 'red'}}>禁用</span>
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
            scroll={{ y: 0 }}
            columns={columns}
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

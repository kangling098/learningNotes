import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Popconfirm, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
import AdminInfo from '@/components/AdminInfo'
const {confirm} = Modal

const List = ({
    onSelectChange, onDeleteItem, onEditItem, location,handleRefresh,selectedRowKeys, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    // 操作下拉处理
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
            width: 100,
        },
        {
            title: '分类',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: '正常', value: 1 },
                { text: '隐藏', value: 0 },
            ],
            filteredValue: filteredValueCreator(query.status),
            render: text => {
                if (text == -1) {
                    return <span style={{color: 'gray'}}>删除</span>
                }
                if (text == 0) {
                    return <span style={{color: 'red'}}>禁用</span>
                }

                return <span style={{color: 'green'}}>启用</span>
            },
        },
        {
            title: '发布人',
            dataIndex: 'publish_admin_id',
            key: 'publish_admin_id',
            render: text => <AdminInfo id={text} />
        },
        {
            title: '发布时间',
            dataIndex: 'publish_time',
            key: 'publish_time',
            sorter: true,
            sortOrder: query.order_key === 'publish_time' ? query.order_type : '',
        },
        {
            title: '操作',
            key: 'operation',
            width: 120,
            fixed: 'right',
            render: (text, record) => {
                return <React.Fragment>
                  <a style={{ marginRight: 10 }} onClick={() => onEditItem(record)}>编辑</a>
                  <Popconfirm title={`是否确认删除本文章？`} placement="left" onConfirm={()=>onDeleteItem(record)}>
                    <a style={{ marginLeft: 8 }}>删除</a>
                  </Popconfirm>
                </React.Fragment>
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
            rowSelection={rowSelection}
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

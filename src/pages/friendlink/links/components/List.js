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
const {confirm} = Modal

const List = ({
    onDeleteItem, onEditItem, location,handleRefresh, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法
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
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '所属分类',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'LOGO',
            dataIndex: 'logo',
            key: 'logo',
            render: (text, record) => <img src={record.logo_url} style={{height:50}} alt={record.name} />,
        },
        {
            title: '链接',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '打开方式',
            dataIndex: 'target',
            key: 'target',
            render: text => text == "blank" ? "新标签" : "当前窗口",
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '最后修改时间',
            dataIndex: 'modified_time',
            key: 'modified_time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: text => {
                return text == 1 ? <span style={{color: 'green'}}>启用</span> : <span style={{color: 'red'}}>禁用</span>
            },
        },
        {
            title: '操作',
            key: 'operation',
            width: 120,
            fixed: 'right',
            render: (text, record) => {
                return <React.Fragment>
                  <a style={{ marginRight: 10 }} onClick={() => onEditItem(record)}>编辑</a>
                  <Popconfirm title={`是否确认删除本条友情链接？`} placement="left" onConfirm={()=>onDeleteItem(record)}>
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

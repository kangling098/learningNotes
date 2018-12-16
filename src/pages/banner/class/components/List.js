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

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
        },
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '父级ID',
            dataIndex: 'parent_id',
            key: 'parent_id',
            width: 100,
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
            title: '操作',
            key: 'operation',
            width: 120,
            render: (text, record) => {
                return <React.Fragment>
                  <a style={{ marginRight: 10 }} onClick={() => onEditItem(record)}>编辑</a>
                  <Popconfirm title={`是否确认删除本条Banner分类？`} placement="left" onConfirm={()=>onDeleteItem(record)}>
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
            columns={columns}
            simple
            rowSelection={null}
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

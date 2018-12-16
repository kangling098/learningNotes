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
    onDeleteItem, onEditItem, location,handleRefresh, module_list, type_list, ...tableProps
}) => {
    const {query} = location

    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '模块',
            dataIndex: 'module',
            key: 'module',
            filters: filterObjCreator(module_list),
            filteredValue: filteredValueCreator(query.module),
            render: (text, record) => record.module_name, 
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            filters: filterObjCreator(type_list),
            filteredValue: filteredValueCreator(query.type),
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '访问地址',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: '启用', value: 1 },
                { text: '禁用', value: 0 },
            ],
            filteredValue: filteredValueCreator(query.status),
            render: text => {
                return text == 1 ? <span style={{color: 'green'}}>启用</span> : <span style={{color: 'red'}}>禁用</span>
            },
        },
        {
            title: '管理',
            key: 'operation',
            width: 120,
            fixed: 'right',
            render: (text, record) => {
                return <React.Fragment>
                  <a style={{ marginRight: 10 }} onClick={() => onEditItem(record)}>编辑</a>
                  <Popconfirm title={`是否确认删除本条节点？`} placement="left" onConfirm={()=>onDeleteItem(record)}>
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

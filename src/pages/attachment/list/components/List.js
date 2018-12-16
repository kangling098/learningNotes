import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Popconfirm, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,fileSizeUnitFormat} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
const {confirm} = Modal

const List = ({
    viewBizList, onDeleteItem, onEditItem, location,handleRefresh,allNodes, ...tableProps
}) => {
    const {query} = location
    const onChange = listOnChangeCreator(handleRefresh) //生成列表筛选方法

    const storageNodes = allNodes && allNodes.map(item => {
        return {
            text: item.name, value: item.id,
        }
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: '存储节点',
            dataIndex: 'storage_id',
            key: 'storage_id',
            filters: storageNodes,
        },
        {
            title: '存储路径',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '所属业务',
            dataIndex: 'count',
            key: 'count',
            render: (text, record) => {
                return <a onClick={() => viewBizList(record.id)}>查看[{text}]</a>
            },
        },
        {
            title: '附件大小',
            dataIndex: 'size',
            key: 'size',
            sorter: true,
            sortOrder: query.order_key === 'size' ? query.order_type : '',
            render: text => {
                return <span>{fileSizeUnitFormat(text)}</span>
            },
        },
        {
            title: '上传时间',
            sorter: true,
            sortOrder: query.order_key === 'create_time' ? query.order_type : '',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: '正常', value: 1 },
                { text: '无效', value: 0 },
            ],
            render: text => {
                return text == 1 ? <span style={{color: 'green'}}>正常</span> : <span style={{color: 'red'}}>无效</span>
            },
        },
        {
            title: '管理',
            key: 'operation',
            width: 120,
            fixed: 'right',
            render: (text, record) => {
                return <React.Fragment>
                  <a href={record.real_url} target="_blank">预览</a>
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

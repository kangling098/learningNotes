import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import Link from 'umi/link'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import {mapObjCreator, filterObjCreator, number2RMB ,listOnChangeCreator ,filteredValueCreator} from 'utils'
import styles from './List.less'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'
import AdminInfo from '@/components/AdminInfo'
import {orderStatus} from 'utils/status/finance/order' // 获取订单状态映射对象
const {confirm} = Modal
const statusRender = mapObjCreator(orderStatus)
const statusFilterObj = filterObjCreator(orderStatus) // 格式[{text:'待支付',value:'1'}]

const List = ({
    onDeleteItem, onEditItem, location,handleRefresh, types, ...tableProps
}) => {

		const filters = []
		for(let item in types) {
			filters.push({
				text: types[item],
				value: item,
			})
		}

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
            width: 60,
        },
        {
            title: '会员类型',
            dataIndex: 'user_type',
            key: 'user_type',
            filters: [
              { text: '系统', value: 1 },
              { text: '会员', value: 2 },
              { text: '管理', value: 3 },
            ],
            render: (text, record) => {
              if(text == 1) {
                return '系统'
              }
              if(text == 2) {
                return  (
                    <React.Fragment>
                        {'会员'}
                        [<UserInfo id={record.user_id} />]
                    </React.Fragment>
                )
              }
              if(text == 3) {
                return  (
                    <React.Fragment>
                        {'管理'}
                        [<AdminInfo id={record.user_id} />]
                    </React.Fragment>
                )
              }

              return '会员类型'
            },
        },
        {
            title: '操作对象',
            dataIndex: 'object_name',
						key: 'object_name',
						filters: filters,
            render: (text, record) => {
                return (
                    <div>{types[text]}[<Link to={`/logs/admin/${record.object_id}`}>{record.object_id}</Link>]
                    </div>
                )
            },
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '终端信息',
            dataIndex: 'terminal_id',
            key: 'terminal_id',
            render: text => <TerminalInfo id={text} />,
        },
        {
            title: '操作时间',
            dataIndex: 'modified_time',
            key: 'modified_time',
        },
        {
            title: '管理',
            key: 'operation',
            width: 100,
            fixed: 'right',
            render: (text, record) => {
              return <Link to={`/logs/admin/${record.id}`}>查看</Link>
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

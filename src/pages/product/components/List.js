import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import { getFieldValue } from 'utils'
import styles from '../index.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, aide, isMotion, location, ...tableProps
}) => {
  // 此参数记录 每个分类的第一条
  const aideFlag = {
    soft: true,
    api: true,
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除此产品?',
        okType: 'danger',
        onOk () {
          return new Promise((resolve) => {
            onDeleteItem({
              id: record.id,
              type: record.type,
            }, resolve)
          })
        },
      })
    }
  }

  const columns = [
    {
      title: '类别',
      dataIndex: 'type',
      render: (value, row, index) => {
        const products = {
          soft: '软件',
          api: 'API',
        }
        const obj = {
          children: products[value],
          props: {},
        }
        if(value === 'soft') {
          if(aideFlag.soft) {
            obj.props.rowSpan = aide.soft
            aideFlag.soft = false
          }else {
            obj.props.rowSpan = 0
          }
        }

        if(value === 'api') {
          if(aideFlag.api) {
            obj.props.rowSpan = aide.api
            aideFlag.api = false
          }else {
            obj.props.rowSpan = 0
          }
        }

        return obj
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'left',
      render: (text, record) => {
        return <p className={styles.productName}>{text} {
          record.status == 1 ? (<span style={{color: 'green'}}>正常</span>) : (<span style={{color: 'red'}}>未上架</span>)
        }</p>
      }
    },
    {
      title: '属性',
      dataIndex: 'max_number',
      align: 'left',
      render: (text, record) => {
        if(record.type === 'api') {
          return <p className={styles.productName}>{getFieldValue(record.api_package, 'name')}</p>
        }else {
          return <p className={styles.productName}>购买：￥{record.price}个/年，续费：￥{record.renew_price}个/年</p>
        }
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      columns={columns}
      simple
      rowSelection={null}
      expandAll
      defaultExpandAllRows
      rowKey={record => record.key}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List

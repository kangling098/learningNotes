import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Table } from 'antd'
import { lockTypeMap } from '../../../util'

const Lockmodal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  currentItem,
  ...modalProps
}) => {

  const columns = [
    {
      title: '锁定类型',
      dataIndex: 'lock_type',
      render: text => lockTypeMap[text]
    },
    {
      title: '锁定时间',
      dataIndex: 'lock_time',
    },
    {
      title: '解锁时间',
      dataIndex: 'lock_end_time',
    },
    {
      title: '锁定原因',
      dataIndex: 'lock_reason',
    },
  ]

  const handleOk = () => {
    onOk()
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Table
        style={{ marginBottom: 24 }}
        pagination={false}
        dataSource={currentItem.lock_info || []}
        columns={columns}
        rowKey="lock_time"
      />
    </Modal>
  )
}

Lockmodal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(Lockmodal)

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Row, Col, Checkbox, Upload, Button, Icon, TreeSelect } from 'antd'
import { normFile, config, arrayToTreeData } from 'utils'
import List from './BizList'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  xs: 24,
  sm: 12,
}

const modal = ({
  bizList,
  ...modalProps
}) => {
  const listProps = {
    dataSource: bizList,
    pagination: false,
  }
  const modalOpts = {
    ...modalProps,
  }

  return (
    <Modal {...modalOpts}>
    <List {...listProps} />
    </Modal>
  )
}

modal.propTypes = {
}

export default Form.create()(modal)

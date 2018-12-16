import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Row, Col, Checkbox, DatePicker, Button, Icon, TreeSelect } from 'antd'
import moment from 'moment'
import MarkDown from '@/components/Editor/Markdown'
import { normFile, config, arrayToTreeData } from 'utils'
import styles from './Modal.less'

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
  item,
  handleUploadChange,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
          <FormItem label="发布状态" {...formItemLayout}  labelCol={{span:8}}>
              {getFieldDecorator('status', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Radio.Group>
                <Radio value={1}>发布</Radio>
                <Radio value={0}>不发布</Radio>
              </Radio.Group>)}
          </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

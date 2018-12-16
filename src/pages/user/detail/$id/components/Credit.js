import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'
import { config, normFile } from 'utils'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Credit = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  currentItem,
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.id,
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
        <FormItem label="会员ID" {...formItemLayout} style={{marginBottom: 10}}>
          <a>{currentItem.id}</a>
        </FormItem>
        <FormItem label="当前授信额度" {...formItemLayout} style={{marginBottom: 10}}>￥ {currentItem.credit}</FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label="新授信额度"
        >
          {getFieldDecorator('credit', {
            rules: [
              {
                required: true,
                message: '授信额度必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="备注说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            rules: [
              {
                required: true,
                message: '备注说明必须填写',
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

Credit.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(Credit)

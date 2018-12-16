import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Upload, Button } from 'antd'
import { config, normFile } from 'utils'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Deposit = ({
  onOk,
  handleChange,
  fileList,
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
        <FormItem label="注销原因" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remove_type', {
            initialValue: 'user_apply',
            rules: [
              {
                required: true,
                message: '注销原因必须选择',
              },
            ],
          })(
            <Select>
              <Option value='user_apply'>会员主动申请</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="注销说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            rules: [
              {
                required: true,
                message: '注销说明必须填写',
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>
        <FormItem label="附件上传" {...formItemLayout}>
            {getFieldDecorator('file_ids', {
              valuePropName: 'file_ids',
              getValueFromEvent: normFile,
            })(
              <Upload name="file" action={config.APIV1 + '/upload'} fileList={fileList} onChange={handleChange}>
                <Button>上传附件</Button>
              </Upload>
            )}
          </FormItem>
      </Form>
    </Modal>
  )
}

Deposit.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(Deposit)

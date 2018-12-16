import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Tooltip, Icon, Upload, Button } from 'antd'
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
  virtualMoneyName,
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
        <FormItem label="当前余额" {...formItemLayout} style={{marginBottom: 10}}>￥ {currentItem.money}</FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label={(
            <span>
              入款类型&nbsp;
              <Tooltip title={`${virtualMoneyName}账户消费不支持开票`}>
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('money_type', {
            initialValue: 1,
            rules: [
              {
                required: true,
                message: '入款类型必须选择',
              },
            ],
          })(
            <Select>
              <Option value={1}>现金账户</Option>
              <Option value={0}>{virtualMoneyName}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label={(
            <span>
              入款金额&nbsp;
              <Tooltip title="正数标识增加，负数表示减少">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('money', {
            rules: [
              {
                required: true,
                message: '入款金额必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="入款说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            rules: [
              {
                required: true,
                message: '入款说明必须填写',
              },
            ],
          })(<TextArea rows={4} />)}
        </FormItem>
        <FormItem label="入款凭证" {...formItemLayout}>
            {getFieldDecorator('file_ids', {
              valuePropName: 'file_ids',
              getValueFromEvent: normFile,
            })(
              <Upload name="file" action={config.APIV1 + '/upload'} fileList={fileList} onChange={handleChange}>
                <Button>上传凭证</Button>
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

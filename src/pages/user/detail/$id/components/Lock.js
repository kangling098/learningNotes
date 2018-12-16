import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Modal, Radio, DatePicker, Tooltip, Icon } from 'antd'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'
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
  isProtect,
  onChange,
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
      if(data.lock_time) {
        data.lock_time = data['lock_time'].format(dateFormat)
      }
      onOk(data)
    })
  }

  const disabledDate = current => {
    return current && current < moment().endOf('day')
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              是否锁定保护&nbsp;
              <Tooltip title="选择锁定保护，默认锁定时间1年">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('lock_protection', {
              initialValue: 0,
            })(<Radio.Group onChange={onChange}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>)}
        </FormItem>
        {
          isProtect ? null : (
            <FormItem label="锁定截至日期" {...formItemLayout}>
              {getFieldDecorator('lock_time', {
                rules: [
                  {
                    required: true,
                    message: '锁定截至日期必须选择',
                  },
                ],
              })(
                <DatePicker showTime format={dateFormat} disabledDate={disabledDate} placeholder="选择时间" />
              )}
            </FormItem>
          )
        }
        <FormItem label="锁定原因" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lock_reason', {
            rules: [
              {
                required: true,
                message: '锁定原因必须填写',
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

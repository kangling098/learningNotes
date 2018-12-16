import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

let focusItem = ''
const customizeData = {}

const modal = ({
  item,
  onOk,
  saving,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        section: 'workorder',
        ...customizeData,
      }
      onOk(data)
    })
  }

  const inputChange = e => {
    const value = e.target.value
    customizeData[focusItem] = value
  }
  const onFocus = item => {
    focusItem = item
  }

  const customizeOpt = name => {
    return {
      onChange: inputChange,
      onFocus: () => onFocus(name),
      defaultValue: item[name],
    }
  }

  const noticeTypeOptions = [
    { label: '短信', value: 'sms' },
    { label: '邮箱', value: 'email' },
    { label: '站内信', value: 'mail' },
  ]

  return (
    <div>
      <Form>
        <FormItem label="工单关闭规则" {...formItemLayout}>
          工单已完成，客户超过
          <Input {...customizeOpt('DoneTimeoutCloseDay')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          天未确认，自动关闭工单并默认5分好评
        </FormItem>
        <FormItem label="工单提醒规则" {...formItemLayout}>
          工单已回复，客户超过
          <Input {...customizeOpt('ReplyTimeoutNoticeMinute')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          分钟未响应，根据设置提醒方式提醒客户
        </FormItem>
        <FormItem label="工单提醒方式" {...formItemLayout}>
        {getFieldDecorator('NoticeType', {
          initialValue: item.NoticeType ? item.NoticeType.split(',') : [],
          rules: [
            {
              required: true,
              message: '工单提醒方式必须选择',
            },
          ],
        })(
          <CheckboxGroup options={noticeTypeOptions} />
        )}
        </FormItem>
        <FormItem label="过滤关键词" {...formItemLayout}>
          {getFieldDecorator('FilterKeywords', {
            initialValue: item.FilterKeywords,
          })(<TextArea rows={4} placeholder="多个关键词用英文逗号隔开" />)}
        </FormItem>
        <FormItem wrapperCol={{xs: {offset: 4}}}>
          <Button type="primary" onClick={handleOk} loading={saving}>立即提交</Button>
        </FormItem>
      </Form>
    </div>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

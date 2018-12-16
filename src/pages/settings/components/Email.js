import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Search = Input.Search

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  item,
  onOk,
  saving,
  emailSend,
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
        section: 'email',
      }
      onOk(data)
    })
  }

  const emailTest = value => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        TestEmail: value,
      }
      emailSend(data)
    })
  }
  return (
    <Form>
      <FormItem label="SMTP服务器" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SmtpServer', {
          initialValue: item.SmtpServer,
          rules: [
            {
              required: true,
              message: 'SMTP服务器必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="发送方式" {...formItemLayout}>
        {getFieldDecorator('SendType', {
          initialValue: item.SendType || 'ssl',
        })(
          <RadioGroup>
            <Radio value='tls'>TLS</Radio>
            <Radio value='ssl'>SSL</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem label="端口" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SendPort', {
          initialValue: item.SendPort,
          rules: [
            {
              required: true,
              message: '端口必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="显示名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SendName', {
          initialValue: item.SendName,
          rules: [
            {
              required: true,
              message: '显示名称必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="发送邮箱" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SendEmail', {
          initialValue: item.SendEmail,
          rules: [
            {
              required: true,
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
              message: '发送邮箱必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      {
        item.SendName ? (
          <FormItem label="邮箱密码" {...formItemLayout}>
            {getFieldDecorator('SendPassword')(<Input type="password" placeholder="为空则表示不修改" />)}
          </FormItem>
        ) : (
          <FormItem label="邮箱密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('SendPassword', {
              initialValue: item.SendPassword,
              rules: [
                {
                  required: true,
                  message: '邮箱密码必须填写',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
        )
      }
      <FormItem label="测试收件" {...formItemLayout}>
          <Search
            placeholder="请输入接收测试邮件的邮箱地址"
            enterButton="测试发件"
            onSearch={emailTest}
          />
      </FormItem>
      <FormItem wrapperCol={{xs: {offset: 4}}}>
        <Button type="primary" onClick={handleOk} loading={saving}>立即提交</Button>
      </FormItem>
    </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

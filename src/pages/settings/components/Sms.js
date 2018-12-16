import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Switch, Select } from 'antd'
import Divider from './Divider'

const FormItem = Form.Item
const Option = Select.Option

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
  firstSms,
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
        section: 'sms',
      }
      onOk(data)
    })
  }
  return (
    <Form>
      <FormItem label="首选通道" hasFeedback {...formItemLayout}>
        {getFieldDecorator('FirstChannel', {
          initialValue: item.FirstChannel ? parseInt(item.FirstChannel) : 1,
          rules: [
            {
              required: true,
              message: '首选通道必须填写',
            },
          ],
        })(
          <Select>
            <Option value={1}>漫道</Option>
            <Option value={2}>二办</Option>
          </Select>
        )}
      </FormItem>
      <Divider>漫道接口配置</Divider>
      <FormItem label="登录帐号" hasFeedback {...formItemLayout}>
        {getFieldDecorator('ZucpAccount', {
          initialValue: item.ZucpAccount,
          rules: [
            {
              required: true,
              message: '登录帐号必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      {
        item.ZucpAccount ? (
          <FormItem label="登录密码" {...formItemLayout}>
            {getFieldDecorator('ZucpPassword')(<Input type="password" placeholder="为空则表示不修改" />)}
          </FormItem>
        ) : (
          <FormItem label="登录密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('ZucpPassword', {
              initialValue: item.ZucpPassword,
              rules: [
                {
                  required: true,
                  message: '登录密码必须填写',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
        )
      }
      <FormItem label="短信签名" hasFeedback {...formItemLayout}>
        {getFieldDecorator('ZucpSignature', {
          initialValue: item.ZucpSignature,
          rules: [
            {
              required: true,
              message: '短信签名必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="是否启用" {...formItemLayout}>
        {getFieldDecorator('IsSupportZucp', {
          initialValue: item.IsSupportZucp == 1,
          valuePropName: 'checked',
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </FormItem>
      <Divider>二办接口配置</Divider>
      <FormItem label="登录帐号" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeAccount', {
          initialValue: item.OfficeAccount,
          rules: [
            {
              required: true,
              message: '登录帐号必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      {
        item.OfficeAccount ? (
          <FormItem label="登录密码" {...formItemLayout}>
            {getFieldDecorator('OfficePassword')(<Input type="password" placeholder="为空则表示不修改" />)}
          </FormItem>
        ) : (
          <FormItem label="登录密码" hasFeedback {...formItemLayout}>
            {getFieldDecorator('OfficePassword', {
              initialValue: item.OfficePassword,
              rules: [
                {
                  required: true,
                  message: '登录密码必须填写',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
        )
      }
      <FormItem label="短信授权码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeSmsCode', {
          initialValue: item.OfficeSmsCode,
          rules: [
            {
              required: true,
              message: '短信授权码必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="语音授权码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeVoiceCode', {
          initialValue: item.OfficeVoiceCode,
          rules: [
            {
              required: true,
              message: '语音授权码必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="接口白名单IP" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeWhitelistIP', {
          initialValue: item.OfficeWhitelistIP,
          rules: [
            {
              required: true,
              message: '接口白名单IP必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="通道编码" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeChannelID', {
          initialValue: item.OfficeChannelID,
          rules: [
            {
              required: true,
              message: '通道编码必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="短信签名" hasFeedback {...formItemLayout}>
        {getFieldDecorator('OfficeSignature', {
          initialValue: item.OfficeSignature,
          rules: [
            {
              required: true,
              message: '短信签名必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="是否启用" {...formItemLayout}>
        {getFieldDecorator('IsSupportOffice', {
          initialValue: item.IsSupportOffice == 1,
          valuePropName: 'checked',
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
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

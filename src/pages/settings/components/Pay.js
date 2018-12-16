import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Upload, Button, Icon, Switch, Select, Checkbox } from 'antd'
import { config, normFile } from 'utils'
import Divider from './Divider'

const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group

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
  fileList3,
  handleChange,
  saving,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const payTypeOptions = [
    { label: 'PC端', value: 'pc' },
    { label: '移动端', value: 'mobile' },
    { label: '银行支付', value: 'bank' },
  ]

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        section: 'recharge',
      }
      onOk(data)
    })
  }

  return (
    <Form>
      <FormItem label="首选充值方式" {...formItemLayout}>
        {getFieldDecorator('FirstType', {
          initialValue: item.FirstType ? parseInt(item.FirstType) : 1,
          rules: [
            {
              required: true,
              message: '首选通道必须填写',
            },
          ],
        })(
          <Select>
            <Option value={1}>支付宝</Option>
            <Option value={2}>微信</Option>
          </Select>
        )}
      </FormItem>
      <Divider>支付宝接口配置</Divider>
      <FormItem label="支付宝合作ID" hasFeedback {...formItemLayout}>
        {getFieldDecorator('AlipayId', {
          initialValue: item.AlipayId,
          rules: [
            {
              required: true,
              message: '支付宝合作ID必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      {
        item.AlipayId ? (
          <FormItem label="支付宝密钥" {...formItemLayout}>
            {getFieldDecorator('AlipayKey')(<Input placeholder="为空则表示不修改" />)}
          </FormItem>
        ) : (
          <FormItem label="支付宝密钥" hasFeedback {...formItemLayout}>
            {getFieldDecorator('AlipayKey', {
              initialValue: item.AlipayKey,
              rules: [
                {
                  required: true,
                  message: '支付宝密钥必须填写',
                },
              ],
            })(<Input />)}
          </FormItem>
        )
      }
      <FormItem label="支付类型" {...formItemLayout}>
        {getFieldDecorator('AlipayType', {
          initialValue: item.AlipayType ? item.AlipayType.split(',') : [],
          rules: [
            {
              required: true,
              message: '支付类型必须选择',
            },
          ],
        })(
          <CheckboxGroup options={payTypeOptions} />
        )}
      </FormItem>
      <FormItem label="是否启用" {...formItemLayout}>
        {getFieldDecorator('IsSupportAlipay', {
          initialValue: item.IsSupportAlipay == 1,
          valuePropName: 'checked',
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </FormItem>
      <Divider>微信支付接口配置</Divider>
      <FormItem label="微信商户号" hasFeedback {...formItemLayout}>
        {getFieldDecorator('WxpayComId', {
          initialValue: item.WxpayComId,
          rules: [
            {
              required: true,
              message: '微信商户号必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      {
        item.WxpayComId ? (
          <FormItem label="微信密钥" {...formItemLayout}>
            {getFieldDecorator('WxpayKey')(<Input placeholder="为空则表示不修改" />)}
          </FormItem>
        ) : (
          <FormItem label="微信密钥" hasFeedback {...formItemLayout}>
            {getFieldDecorator('WxpayKey', {
              initialValue: item.WxpayKey,
              rules: [
                {
                  required: true,
                  message: '微信密钥必须填写',
                },
              ],
            })(<Input />)}
          </FormItem>
        )
      }
      <FormItem label="微信AppID" hasFeedback {...formItemLayout}>
        {getFieldDecorator('WxpayAppID', {
          initialValue: item.WxpayAppID,
          rules: [
            {
              required: true,
              message: '微信AppID必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="微信Secret" hasFeedback {...formItemLayout}>
        {getFieldDecorator('WxpaySecret', {
          initialValue: item.WxpaySecret,
          rules: [
            {
              required: true,
              message: '微信Secret必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="二维码中央小LOGO" hasFeedback {...formItemLayout} extra="仅限图片格式：jpg,jpeg,png,gif">
        {getFieldDecorator('WxpayQrcodeLogo', {
          valuePropName: 'WxpayQrcodeLogo',
          getValueFromEvent: normFile,
        })(
          <Upload name="file" action={config.APIV1 + '/upload?type=image'} listType="picture" accept=".jpg,.jpeg,.png,.gif" fileList={fileList3} onChange={handleChange}>
            <Button>
              <Icon type="upload" /> 上传附件
            </Button>
          </Upload>
        )}
      </FormItem>
      <FormItem label="是否启用" {...formItemLayout}>
        {getFieldDecorator('IsSupportWxpay', {
          initialValue: item.IsSupportWxpay == 1,
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

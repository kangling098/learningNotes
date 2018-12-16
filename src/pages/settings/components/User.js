import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Switch } from 'antd'

const FormItem = Form.Item

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
  register,
  registerChange,
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
        section: 'user',
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

  return (
    <div>
      <Form>
        <FormItem label="是否关闭注册" {...formItemLayout}>
          {getFieldDecorator('IsCloseRegister', {
            initialValue: item.IsCloseRegister == 1,
          })(
            <Switch checkedChildren="是" unCheckedChildren="否" onChange={registerChange} />
          )}
        </FormItem>
        <FormItem label="IP注册限制" {...formItemLayout}>
          每IP
          <Input disabled={register} {...customizeOpt('IpRegisterLimitInterval')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时内，最多可注册
          <Input disabled={register} {...customizeOpt('IpRegisterLimitTimes')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          个会员
        </FormItem>
        <FormItem label="终端注册限制" {...formItemLayout}>
          每终端
          <Input disabled={register} {...customizeOpt('TerminalRegisterLimitInterval')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时内，最多可注册
          <Input disabled={register} {...customizeOpt('TerminalRegisterLimitTimes')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          个会员
        </FormItem>
        <FormItem label="IP锁定规则" {...formItemLayout}>
          同一IP在
          <Input disabled={register} {...customizeOpt('IpLockRuleInterval')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时内，密码连续错误
          <Input disabled={register} {...customizeOpt('IpLockRuleTimes')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          次，锁定
          <Input disabled={register} {...customizeOpt('IpLockRuleHour')}style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时
        </FormItem>
        <FormItem label="会员锁定规则" {...formItemLayout}>
          同一会员在
          <Input disabled={register} {...customizeOpt('UserLockRuleInterval')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时内，密码连续错误
          <Input disabled={register} {...customizeOpt('UserLockRuleTimes')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          次，锁定
          <Input disabled={register} {...customizeOpt('UserLockRuleHour')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时
        </FormItem>
        <FormItem label="会员安全策略" {...formItemLayout}>
          同一会员在
          <Input disabled={register} {...customizeOpt('UserSecurityPolicyInterval')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时内，安全效验连续错误
          <Input disabled={register} {...customizeOpt('UserSecurityPolicyTimes')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          次，锁定
          <Input disabled={register} {...customizeOpt('UserSecurityPolicyHour')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          小时
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

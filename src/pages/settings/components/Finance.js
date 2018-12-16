import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Switch } from 'antd'
import Divider from './Divider'

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
        section: 'finance',
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
        <Divider>发票</Divider>
        <FormItem label="是否开启发票" {...formItemLayout}>
          {getFieldDecorator('IsSupportInvoice', {
            valuePropName: 'checked',
            initialValue: item.IsSupportInvoice == 1,
          })(
            <Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem label="发票申请限制" {...formItemLayout}>
          仅
          <Input {...customizeOpt('InvoiceLimitMonth')} style={{width: 50, marginLeft: 5, marginRight: 5,}} />
          个月内的订单支持申请发票
        </FormItem>
        <Divider>提现</Divider>
        <FormItem label="是否开启提现" {...formItemLayout}>
          {getFieldDecorator('IsSupportWithdraw', {
            valuePropName: 'checked',
            initialValue: item.IsSupportWithdraw == 1,
          })(
            <Switch checkedChildren="是" unCheckedChildren="否" />
          )}
        </FormItem>
        <FormItem label="最低提现金额" {...formItemLayout}>
          {getFieldDecorator('WithdrawMin', {
            initialValue: item.WithdrawMin,
            rules: [
              {
                required: true,
                message: '最低提现金额必须填写',
              },
            ],
          })(<Input suffix={'元'} />)}
        </FormItem>
        <FormItem label="提现手续费率" {...formItemLayout}>
          {getFieldDecorator('WithdrawRate', {
            initialValue: item.WithdrawRate,
            rules: [
              {
                required: true,
                message: '提现手续费率必须填写',
              },
            ],
          })(<Input suffix={'%'} />)}
        </FormItem>
        <FormItem label="最低手续费" {...formItemLayout}>
          {getFieldDecorator('WithdrawMinFee', {
            initialValue: item.WithdrawMinFee,
            rules: [
              {
                required: true,
                message: '最低手续费必须填写',
              },
            ],
          })(<Input suffix={'元'} />)}
        </FormItem>
        <FormItem label="虚拟账号名称" {...formItemLayout}>
          {getFieldDecorator('virtualMoneyName', {
            initialValue: item.virtualMoneyName,
            rules: [
              {
                required: true,
                message: '虚拟账号名称必须填写',
              },
            ],
          })(<Input />)}
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

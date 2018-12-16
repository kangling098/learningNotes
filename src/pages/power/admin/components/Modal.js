import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Tooltip, Icon, Transfer } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item,
  onOk,
  roles,
  selectRoles,
  roleHandleChange,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const sourceData = roles && roles.map(item => {
    return {
      key: item.id,
      title: item.name,
    }
  })

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        roles: selectRoles,
        id: item.id,
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
      <FormItem label="名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('name', {
          initialValue: item.name,
          rules: [
            {
              required: true,
              message: '名称必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
        <FormItem
          hasFeedback
          {...formItemLayout}
          label={(
            <span>
              手机号码&nbsp;
              <Tooltip title="说明文字">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: true,
                message: '手机号码必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                message: '邮箱必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        {
          item.id ? (
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('password')(<Input placeholder="为空则不修改密码" />)}
            </FormItem>
          ) : (
            <FormItem label="密码" hasFeedback {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: true,
                    message: '密码必须填写',
                  },
                ],
              })(<Input />)}
            </FormItem>
          )
        }
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="角色" {...formItemLayout} wrapperCol={{span: 18}}>
          <Transfer
            dataSource={sourceData}
            targetKeys={selectRoles}
            onChange={roleHandleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

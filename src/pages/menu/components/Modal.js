import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, TreeSelect, Radio } from 'antd'

import { arrayToTreeData } from 'utils'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  list,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const menuParent = {
    treeData: arrayToTreeData(list),
    treeDefaultExpandAll: false,
    placeholder: "为空为顶级菜单",
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem
          {...formItemLayout}
          label="父级菜单"
        >
          {getFieldDecorator('parent_id', {
            initialValue: item.parent_id,
          })(
            <TreeSelect {...menuParent} />
          )}
        </FormItem>
        <FormItem label="ICON" {...formItemLayout}>
          {getFieldDecorator('icon', {
            initialValue: item.icon,
          })(<Input />)}
        </FormItem>
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '菜单名称必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="路由" {...formItemLayout}>
          {getFieldDecorator('action', {
            initialValue: item.action,
          })(<Input />)}
        </FormItem>
        <FormItem label="菜单栏位置" {...formItemLayout}>
          {getFieldDecorator('is_nav', {
            initialValue: item.is_nav,
          })(
            <RadioGroup>
              <Radio value={1}>显示</Radio>
              <Radio value={0}>隐藏</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
          })(
            <RadioGroup>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </RadioGroup>
          )}
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

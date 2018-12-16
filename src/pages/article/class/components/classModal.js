import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, TreeSelect, Radio, Select } from 'antd'

import { arrayToTreeData } from 'utils'
const Option = Select.Option
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

  const classParent = {
    treeData: arrayToTreeData(list),
    treeDefaultExpandAll: true,
    placeholder: "为空为顶级分类",
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
          label="父级分类"
        >
          {getFieldDecorator('parent_id', {
            initialValue: item.parent_id,
          })(
            <TreeSelect {...classParent} />
          )}
        </FormItem>
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
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message: '类型必须填写',
              },
            ],
          })(
            <Select placeholder="选择类型">
              <Option value={'admin_notice'}>后台通知公告</Option>
              <Option value={'user_notice'}>会员通知公告</Option>
              <Option value={'agreement'}>各类协议</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="路由名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('route_name', {
            initialValue: item.route_name,
            rules: [
              {
                required: true,
                message: '路由名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: item.sort,
            rules: [
              {
                required: true,
                message: '排序序号必须填写',
              },
            ],
          })(<Input />)}
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

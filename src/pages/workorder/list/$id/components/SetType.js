import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, TreeSelect } from 'antd'

import { arrayToTreeData } from 'utils'

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

const modal = ({
  classData,
  currentItem,
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
        id: currentItem.data.id,
      }
      onOk(data)
    })
  }

  const classParent = {
    treeData: arrayToTreeData(classData),
    treeDefaultExpandAll: true,
    placeholder: "选择分类",
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
          label="选择分类"
        >
          {getFieldDecorator('class_id', {
            initialValue: currentItem.data.class_id,
          })(
            <TreeSelect {...classParent} />
          )}
        </FormItem>
        <FormItem label="备注" {...formItemLayout}>
          {getFieldDecorator('content')(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

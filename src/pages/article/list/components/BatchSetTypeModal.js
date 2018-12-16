import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Row, Col, Checkbox, DatePicker, Button, Icon, TreeSelect } from 'antd'
import moment from 'moment'
import MarkDown from '@/components/Editor/Markdown'
import { normFile, config, arrayToTreeData } from 'utils'
import styles from './Modal.less'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
}
const ColProps = {
  xs: 24,
  sm: 12,
}

const modal = ({
  item,
  articleTypes,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const classParent = {
    treeData: arrayToTreeData(articleTypes),
    treeDefaultExpandAll: true,
    placeholder: "请选择分类",
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
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
      <FormItem {...formItemLayout} label="分类">
          {getFieldDecorator('class_id', {
            rules: [
              {
                required: true,
                message: '请选择分类',
              },
            ],
          })(
            <TreeSelect {...classParent} />
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

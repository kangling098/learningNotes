import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Row, Col, Checkbox, Upload, Button, Icon, TreeSelect } from 'antd'
import { normFile, config, arrayToTreeData } from 'utils'
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
  storages,
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
        <FormItem {...formItemLayout} label="存储节点">
          {getFieldDecorator('storage_id', {
            rules: [
              {
                required: true,
                message: '存储节点必须填写',
              },
            ],
          })(
            <Select placeholder="选择存储节点">
              {
                storages && storages.map(item => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="存储路径">
          {getFieldDecorator('path', {
            rules: [
              {
                required: true,
                message: '存储路径必须填写',
              },
            ],
          })(
            <Input placeholder="输入存储路径" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="附件大小">
          {getFieldDecorator('size', {
            rules: [
              {
                required: true,
                message: '附件大小必须填写',
              },
            ],
          })(
            <Input placeholder="输入附件大小" suffix={'b'} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="附件MD5">
          {getFieldDecorator('md5', {
            rules: [
              {
                required: true,
                message: '附件MD5必须填写',
              },
            ],
          })(
            <Input placeholder="输入附件MD5" />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

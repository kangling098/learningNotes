import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Row, Col, Select, Tooltip, Icon } from 'antd'
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  let defaultJSON = item.content || ''

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
        content: defaultJSON,
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
        <FormItem
            hasFeedback
            {...formItemLayout}
            label={(
              <span>
                名称&nbsp;
                <Tooltip title="长度为1-50个字符，允许英文字母、数字或'-'">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
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
        <FormItem label="策略描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            initialValue: item.remarks,
            rules: [
              {
                required: true,
                message: '策略描述必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="版本" hasFeedback {...formItemLayout}>
          {getFieldDecorator('version', {
            initialValue: item.version,
            rules: [
              {
                required: true,
                message: '版本必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
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
        <Row gutter={24} style={{padding: 24}}>
          <Col xl={{ span: 5 }} md={{ span: 5 }} style={{textAlign: 'right'}}>
            <div className="ant-form-item-label"><label title="策略规则">策略规则</label></div>
          </Col>
          <Col xl={{ span: 18 }} md={{ span: 18 }} style={{marginLeft: -12, paddingLeft: 0}}>
            <CodeMirror
              value={defaultJSON}
              options={{
                mode: 'javascript',
                json: true,
                theme: 'material',
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                defaultJSON = value
              }}
            />
          </Col>
        </Row>
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

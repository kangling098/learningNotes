import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Modal, Select, Row, Col, Checkbox } from 'antd'

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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
      <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message: '帐号类型必须填写',
              },
            ],
          })(
            <Select>
              <Option value={1}>普通会员</Option>
            </Select>
          )}
        </FormItem>
        {
          item.id ? (
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
          ) : null
        }
        <FormItem label="帐号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('account', {
            initialValue: item.account,
            rules: [
              {
                required: true,
                message: '帐号必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nick_name', {
            initialValue: item.nick_name,
            rules: [
              {
                required: true,
                message: '姓名必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 14 }} md={{ span: 14 }}>
            <FormItem label="手机" hasFeedback labelCol={{span: 9}} wrapperCol={{span: 13}}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: '手机号码必须填写',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps} xl={{ span: 10 }} md={{ span: 10 }}>
            <FormItem label="是否验证" labelCol={{span: 9}} wrapperCol={{span: 13}}>
              {getFieldDecorator('is_mobile_check', {
                initialValue: item.is_mobile_check,
                valuePropName: 'checked',
              })(
                <Checkbox />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 14 }} md={{ span: 14 }}>
            <FormItem label="邮箱" hasFeedback labelCol={{span: 9}} wrapperCol={{span: 13}}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: '邮箱必须填写',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col {...ColProps} xl={{ span: 10 }} md={{ span: 10 }}>
            <FormItem label="是否验证" labelCol={{span: 9}} wrapperCol={{span: 13}}>
              {getFieldDecorator('is_email_check', {
                initialValue: item.is_email_check,
                valuePropName: 'checked',
              })(
                <Checkbox />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="QQ" hasFeedback {...formItemLayout}>
          {getFieldDecorator('qq', {
            initialValue: item.qq,
            rules: [
              {
                required: true,
                message: 'qq必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        {
          item.id ? (
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('password')(<Input placeholder="留空则不修改" />)}
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
        <FormItem label="操作备注" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remarks', {
            initialValue: item.remarks,
            rules: [
              {
                required: true,
                message: '备注必须填写',
              },
            ],
          })(<TextArea rows={4} />)}
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

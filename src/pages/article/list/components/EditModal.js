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

let markdown = '';

const modal = ({
  item,
  articleTypes,
  handleUploadChange,
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
        id: item.id,
        content: markdown,
      }
      onOk(data)
    })
  }
  const handleChange = value => {
    markdown = value
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
      <FormItem {...formItemLayout} label="分类" labelCol={{span:4}}>
          {getFieldDecorator('class_id', {
            initialValue: item.class_id,
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
        <Row  gutter={10} type="flex" justify="left"> 
          <Col span={12}>
            <FormItem className={styles.special} {...formItemLayout} label="标题" labelCol={{span:8}}>
                {getFieldDecorator('title', {
                  initialValue: item.title,
                  rules: [
                    {
                      required: true,
                      message: '请填写标题',
                    },
                  ],
                })(
                  <Input  style={{width: 245}} />
                )}
            </FormItem>
          </Col>
          <Col span={3}>
          <FormItem {...formItemLayout} label="">
                {getFieldDecorator('is_top', {
                  initialValue: item.is_top === undefined ? 1 : item.is_bold,
                })(
                  <Select style={{width: 85}} >
                    <Option value={1}>置顶</Option>
                    <Option value={0}>不置顶</Option>
                  </Select>
                )}
          </FormItem>
        </Col>
        <Col span={3}>
          <FormItem {...formItemLayout} label="">
            {getFieldDecorator('is_bold', {
              initialValue: item.is_bold === undefined ? 1 : item.is_bold,
            })(
              <Select style={{width: 85}}>
                <Option value={1}>加粗</Option>
                <Option value={0}>不加粗</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={3}>
          <FormItem {...formItemLayout} label="">
            {getFieldDecorator('title_color', {
              initialValue: item.title_color === undefined ? '#000' : item.title_color,
            })(
              <Select style={{width: 85}}>
                <Option value={'#000'}>#000</Option>
                <Option value={'#111'}>#111</Option>
                <Option value={'#333'}>#333</Option>
                <Option value={'#666'}>#666</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        </Row>

        <Row gutter={24} style={{padding: 10, paddingLeft: 12}}>
          <Col span={4} style={{textAlign: 'right', paddingRight: 0}}>
            <div className="ant-form-item-label"><label title="内容">内容</label></div>
          </Col>
          <Col xl={{ span: 18 }} md={{ span: 18 }} style={{paddingLeft: 0}}>
            <MarkDown handleChange={handleChange} initialValue={item.content}  />
          </Col>
        </Row>
          <FormItem label="发布状态" {...formItemLayout}  labelCol={{span:4}}>
              {getFieldDecorator('status', {
                initialValue: item.status === undefined ? 1 : item.status,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Radio.Group>
                <Radio value={1}>发布</Radio>
                <Radio value={0}>不发布</Radio>
              </Radio.Group>)}
          </FormItem>
        <FormItem label="分布时间" hasFeedback {...formItemLayout}  labelCol={{span:4}}>
          {getFieldDecorator('publish_time', {
            initialValue: item.publish_time ? moment(item.publish_time, "YYYY-MM-DD HH:mm:ss") : undefined,
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            )}
        </FormItem>
        <FormItem label="路由名" hasFeedback {...formItemLayout}  labelCol={{span:4}}>
          {getFieldDecorator('route_name', {
            initialValue: item.route_name,
            rules: [
              {
                required: true,
                message: '请填写路由名',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="关键词" hasFeedback {...formItemLayout}  labelCol={{span:4}}>
          {getFieldDecorator('keywords', {
            initialValue: item.keywords,
            rules: [
              {
                required: true,
                message: '请填写关键词',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="描述" hasFeedback {...formItemLayout}  labelCol={{span:4}}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: true,
                message: '请填写描述',
              },
            ],
          })(<TextArea />)}
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

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
  item,
  linkTypes,
  handleUploadChange,
  fileList,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const classParent = {
    treeData: arrayToTreeData(linkTypes),
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
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  console.log(fileList)
  const uploadProps = {
    name:"file",
    action: config.APIV1 + '/upload?type=image',
    listType:"picture",
    fileList: fileList,
    onChange: handleUploadChange,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('class_id', {
            initialValue: item.class_id || linkTypes[0].id,
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
        <FormItem label="打开方式" {...formItemLayout}>
              {getFieldDecorator('target', {
                initialValue: item.target || 'blank',
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Radio.Group>
                <Radio value={'blank'}>新标签</Radio>
                <Radio value={'self'}>本页面</Radio>
              </Radio.Group>)}
          </FormItem>
          <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: item.status === "" ? 1 : item.status,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Radio.Group>
                <Radio value={1}>启用</Radio>
                <Radio value={0}>禁用</Radio>
              </Radio.Group>)}
          </FormItem>
        <FormItem label="链接名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请填写链接名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="链接URL" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: item.url,
            rules: [
              {
                required: true,
                message: '请填写链接URL',
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
                pattern: /^\d{1,}$/,
                message: '请填写排序数字',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="文件上传" hasFeedback {...formItemLayout} extra="仅限图片格式：jpg,jpeg,png,gif">
          {getFieldDecorator('file_id', {
            initialValue: item.file_id ? [item.file_id] : undefined,
            valuePropName: 'file_id',
            getValueFromEvent: normFile,
            rules: [
              {
                required: true,
                message: '请上传附件',
              },
            ],
          })(
            <Upload {...uploadProps} >
              <Button>
                <Icon type="upload" /> 上传附件
              </Button>
            </Upload>
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

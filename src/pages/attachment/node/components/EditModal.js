import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio, Select } from 'antd'
const {Option} = Select

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
let fieldNames = [
  'name',
  'module',
  'type',
  'url',
  'config[host]',
  'config[port]',
  'config[timeout]',
  'config[username]',
  'config[password]',
  'status',
  'config[rootPath]',
];
const modal = ({
  dispatch,
  NAMESPACE,
  module_list, 
  type_list,
  item,
  list,
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  isLocal,
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

  const getModuleOptions = () => {
    let arr = [];
    for (const key in module_list) {
      if (module_list.hasOwnProperty(key)) {
        arr.push(
          <Option key={key} value={key}>{module_list[key]}</Option>
        );
      }
    }
    return arr;
  }
  const getTypeOptions = () => {
    let arr = [];
    for (const key in type_list) {
      if (type_list.hasOwnProperty(key)) {
        arr.push(
          <Option key={key} value={key}>{type_list[key]}</Option>
        );
      }
    }
    return arr;
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  // 切换type处理
  function handleTypeChange (value) {
    /* 
    类型是Local时
    config[rootPath] 根目录，必须提交，其他项目隐藏

    类型是非Local时
    config[rootPath] 根目录，非必须提交，其他项目展示且必填
    
    其他项目指config相关字段
    */

    if (value === 'Local') {
      dispatch({
        type: `${NAMESPACE}/updateState`,
        payload: {
          isLocal: true,
        },
      });

      setTimeout(()=>{
        validateFields(['config[rootPath]'], { force: true });
      }, 0);

    }
    else {
      dispatch({
        type: `${NAMESPACE}/updateState`,
        payload: {
          isLocal: false,
        },
      });

      setTimeout(()=>{
        validateFields(['config[rootPath]'], { force: true });
      }, 0);

    }
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="分类名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '分类名称必须填写',
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
        <FormItem label="模块" hasFeedback {...formItemLayout}>
          {getFieldDecorator('module', {
            initialValue: item.module,
            rules: [
              {
                required: true,
                message: '请选择模块',
              },
            ],
          })(
            <Select>
              {getModuleOptions()}
            </Select>
          )}
        </FormItem>
        <FormItem label="类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message: '请选择类型',
              },
            ],
          })(
            <Select onChange={handleTypeChange}>
              {getTypeOptions()}
            </Select>
          )}
        </FormItem>
        <FormItem label="访问地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('url', {
            initialValue: item.url,
            rules: [
              {
                required: true,
                message: '访问地址必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="根目录" hasFeedback {...formItemLayout}>
          {getFieldDecorator('config[rootPath]', {
            initialValue: item.config ? item.config.rootPath : "",
            rules: [
              {
                required: isLocal,
                message: '根目录必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* 仅在type 为 Local 时填写 */}
        {!isLocal ? (
          <React.Fragment>
            <FormItem label="服务器" hasFeedback {...formItemLayout}>
            {getFieldDecorator('config[host]', {
              initialValue: item.config ? item.config.host : "",
              rules: [
                {
                  required: true,
                  message: '服务器必须填写',
                },
              ],
            })(<Input />)}
          </FormItem>
            <FormItem label="端口" hasFeedback {...formItemLayout}>
            {getFieldDecorator('config[port]', {
              initialValue: item.config ? item.config.port : "",
              rules: [
                {
                  required: true,
                  message: '端口必须填写',
                },
              ],
            })(<Input />)}
          </FormItem>
           <FormItem label="超时时间" hasFeedback {...formItemLayout}>
           {getFieldDecorator('config[timeout]', {
             initialValue: item.config ? item.config.timeout : "",
             rules: [
               {
                 required: true,
                 message: '超时时间必须填写',
               },
             ],
           })(<Input />)}
         </FormItem>
         <FormItem label="会员名" hasFeedback {...formItemLayout}>
           {getFieldDecorator('config[username]', {
             initialValue: item.config ? item.config.username : "",
             rules: [
               {
                 required: true,
                 message: '会员名必须填写',
               },
             ],
           })(<Input />)}
         </FormItem>
         <FormItem label="密码" hasFeedback {...formItemLayout}>
           {getFieldDecorator('config[password]', {
             initialValue: item.config ? item.config.password : "",
             rules: [
               {
                 required: true,
                 message: '密码必须填写',
               },
             ],
           })(<Input type="password" />)}
         </FormItem>
         </React.Fragment>
        ) : null
        }
       
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
                message: '请选择状态',
              },
            ],
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

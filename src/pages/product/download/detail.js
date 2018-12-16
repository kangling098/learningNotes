import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Input, Select, Switch, Button, Upload, Icon, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { normFile, config } from 'utils'
import styles from './index.less'

const Option = Select.Option
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
}

const formItemLayoutModal = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
}

const Detail = ({
  dispatch, download, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  const {
    saving, currentItem, productList, productData, manualVisible, storages, fileList,
  } = download
  const manualOpt = {
    title: "手动上传",
    visible: manualVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`download/manualUp`],
    onOk () {
      validateFields(['storage_id', 'path', 'size', 'md5'], (errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(['storage_id', 'path', 'size', 'md5']),
        }
        dispatch({
          type: 'download/manualUp',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            setFieldsValue({
              attachment_id: res.Data[0],
            })
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'download/getSuccess',
        payload: {
          manualVisible: false,
        },
      })
    },
  }

  const manualHandle = () => {
    if(!storages.length) {
      dispatch({
        type: 'download/queryNodes',
      })
    }
    dispatch({
      type: 'download/getSuccess',
      payload: {
        manualVisible: true,
      },
    })
  }

  const typeChange = type => {
    const snap =  productList.filter(item => item.type === type)
    dispatch({
      type: 'download/getSuccess',
      payload: {
        productData: snap,
      },
    })
    setFieldsValue({
      product_id: snap[0].id,
    })
  }
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.id,
      }
      dispatch({
        type: 'download/create',
        payload: {
          ...data,
        },
      }).then(res => {
        if(res && res.success) {
          dispatch(routerRedux.push({
            pathname: '/product/download'
          }))
        }
      })
    })
  }

  const handleChange = info => {
    let fileList = info.fileList
    fileList = fileList.slice(-1)
    dispatch({
      type: 'download/updateState',
      payload: {
        fileList: fileList,
      },
    })
  }

  return (
    <Page inner>
      <Form layout="horizontal">
        <FormItem label="选择产品类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: currentItem.type,
            rules: [
              {
                required: true,
                message: '选择产品类型',
              },
            ],
          })(
            <Select placeholder="选择产品类型" onChange={typeChange}>
              <Option value="soft">软件</Option>
              <Option value="api">API</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="选择所属产品" hasFeedback {...formItemLayout}>
          {getFieldDecorator('product_id', {
            initialValue: currentItem.product_id,
            rules: [
              {
                required: true,
                message: '选择产品',
              },
            ],
          })(
            <Select placeholder="选择产品">
              {
                productData && productData.map(item => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem label="文件标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: currentItem.title,
            rules: [
              {
                required: true,
                message: '文件标题必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="文件上传" hasFeedback {...formItemLayout} extra="允许上传格式：doc、docx、xls、xlsx、pdf、rar、zip">
          {getFieldDecorator('attachment_id', {
            initialValue: currentItem.attachment_id ? [currentItem.attachment_id] : undefined,
            valuePropName: 'attachment_id',
            getValueFromEvent: normFile,
            rules: [
              {
                required: true,
                message: '请上传附件',
              },
            ],
          })(
            <Upload name="file" action={config.APIV1 + '/upload'} listType="text" accept=".doc,.docx,.xls,.xlsx,.pdf,.rar,.zip" fileList={fileList} onChange={handleChange}>
              <Button>
                <Icon type="upload" /> 上传附件
              </Button>
            </Upload>
          )}
        </FormItem>
        <div className={styles.uploadContainer}>
          <Button onClick={manualHandle}>
            <Icon type="cloud" /> 手动上传
          </Button>
        </div>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: currentItem.status ? true : false,
            valuePropName: 'checked',
          })(
            <Switch checkedChildren="显示" unCheckedChildren="隐藏" />
          )}
        </FormItem>
        <FormItem wrapperCol={{xs: {offset: 8}}}>
          <Button type="primary" onClick={handleOk} loading={saving}>确认提交</Button>
        </FormItem>
      </Form>
      {
        manualVisible ? (
          <Modal {...manualOpt}>
            <Form layout="horizontal">
              <FormItem {...formItemLayoutModal} label="存储节点">
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
              <FormItem {...formItemLayoutModal} label="存储路径">
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
              <FormItem {...formItemLayoutModal} label="附件大小">
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
              <FormItem {...formItemLayoutModal} label="附件MD5">
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
        ) : null
      }
    </Page>
  )
}

export default connect(({ download, loading }) => ({ download, loading }))(Form.create()(Detail))

import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Input, Radio, Row, Col, InputNumber, Select, Switch, Button, Tooltip, Icon } from 'antd'
import { routerRedux } from 'dva/router'
import { getRandom } from 'utils'

import EditableTable from './components/Package'

const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
}

const formItemLayoutLine = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
}

const col_12 = {
  style: {
    paddingRight: 0
  }
}

const Add = ({
  location, dispatch, product, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const {
    isApi, seoOpen, saving, packageData, currentItem, editingKey
  } = product

  const packageOpt = {
    packageData,
    dispatch,
    editingKey,
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
        type: 'product/create',
        payload: {
          ...data,
        },
      }).then(res => {
        if(res && res.success) {
          dispatch(routerRedux.push({
            pathname: '/product'
          }))
        }
      })
    })
  }

  const typeChange = type => {
    if(type.target.value === 'api') {
      dispatch({
        type: 'product/selectApi',
      })
    }else {
      dispatch({
        type: 'product/canceltApi',
      })
    }
  }
  const seoChange = seoOpen => {
    dispatch({
      type: 'product/seoChange',
      payload: {
        seoOpen,
      },
    })
  }

  const addPackage = () => {
    const key = getRandom()
    packageData.push({
      key: key,
      name: '',
      times: '',
      month: '',
      price: '',
      origin_price: '',
      status: 1,
    })
    dispatch({
      type: 'product/packageChange',
      payload: {
        packageData,
        editingKey: key,
      },
    })
  }

  return (
    <Page inner>
      <Form layout="horizontal">
        <FormItem label="选择产品类别" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: currentItem.type,
          })(
            <RadioGroup onChange={typeChange}>
              <Radio.Button value="soft" disabled={!!currentItem.id && currentItem.type !== 'soft'}>软件</Radio.Button>
              <Radio.Button value="api" disabled={!!currentItem.id && currentItem.type !== 'api'}>API</Radio.Button>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="产品名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: currentItem.name,
            rules: [
              {
                required: true,
                message: '产品名称必须填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <Row gutter={24}>
          <Col span={12} {...col_12}>
            <FormItem
              hasFeedback
              {...formItemLayoutLine}
              label={(
                <span>
                  产品简称&nbsp;
                  <Tooltip title="说明文字">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('short_name', {
                initialValue: currentItem.short_name,
                rules: [
                  {
                    required: true,
                    message: '产品简称必须填写',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem
              {...formItemLayoutLine}
              label={(
                <span>
                  上架状态&nbsp;
                  <Tooltip title="说明文字">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('status', {
                initialValue: currentItem.status,
              })(
                <RadioGroup>
                  <Radio value={1}>上架</Radio>
                  <Radio value={0}>暂不上架</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12} {...col_12}>
            <FormItem
              {...formItemLayoutLine}
              label={(
                <span>
                  最大购买次数&nbsp;
                  <Tooltip title="说明文字">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('max_number', {
                initialValue: currentItem.max_number,
                rules: [
                  {
                    required: true,
                    message: '最大购买次数必须填写',
                  },
                ],
              })(
                <InputNumber min={1} max={10000000} suffix={'次'} />
              )}
            </FormItem>
          </Col>
          {
            !isApi ? (
              <Col span={11}>
                <FormItem
                  {...formItemLayoutLine}
                  labelCol={{span: 8}}
                  label={(
                    <span>
                      最大有效时长&nbsp;
                      <Tooltip title="说明文字">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('max_years', {
                    initialValue: currentItem.max_years,
                    rules: [
                      {
                        required: true,
                        message: '最大有效时长必须填写',
                      },
                    ],
                  })(<Input suffix={'月'} />)}
                </FormItem>
              </Col>
            ) : null
          }
        </Row>
        {
          !isApi ? (
            <Row gutter={24}>
              <Col span={12} {...col_12}>
                <FormItem
                  {...formItemLayoutLine}
                  label={(
                    <span>
                      购买价格&nbsp;
                      <Tooltip title="说明文字">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('price', {
                    initialValue: currentItem.price,
                    rules: [
                      {
                        required: true,
                        message: '购买价格必须填写',
                      },
                    ],
                  })(<Input suffix={'元'} />)}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayoutLine}
                  label={(
                    <span>
                      购买原价&nbsp;
                      <Tooltip title="说明文字">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('origin_price', {
                    initialValue: currentItem.origin_price,
                    rules: [
                      {
                        required: true,
                        message: '购买原价必须填写',
                      },
                    ],
                  })(<Input suffix={'元'} />)}
                </FormItem>
              </Col>
            </Row>
          ) : null
        }
        {
          !isApi ? (
            <Row gutter={24}>
              <Col span={12} {...col_12}>
                <FormItem
                  {...formItemLayoutLine}
                  label={(
                    <span>
                      续费价格&nbsp;
                      <Tooltip title="说明文字">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('renew_price', {
                    initialValue: currentItem.renew_price,
                    rules: [
                      {
                        required: true,
                        message: '续费价格必须填写',
                      },
                    ],
                  })(<Input suffix={'元'} />)}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayoutLine}
                  label={(
                    <span>
                      续费原价&nbsp;
                      <Tooltip title="说明文字">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                  {getFieldDecorator('renew_origin_price', {
                    initialValue: currentItem.renew_origin_price,
                    rules: [
                      {
                        required: true,
                        message: '续费原价必须填写',
                      },
                    ],
                  })(<Input suffix={'元'} />)}
                </FormItem>
              </Col>
            </Row>
          ) : null
        }
        <FormItem label="产品协议" hasFeedback {...formItemLayout }>
          {getFieldDecorator('protocol_id', {
            initialValue: currentItem.protocol_id,
            rules: [
              {
                required: true,
                message: '协议必须选择',
              },
            ],
          })(
            <Select placeholder="选择协议">
              <Option value={1}>云服务器协议</Option>
              <Option value={2}>托管协议</Option>
            </Select>
          )}
        </FormItem>
        {
          isApi ? (
            <div>
              <FormItem
                {...formItemLayout}
                label="套餐设置"
              >
                {getFieldDecorator('primary')(
                  <Button type="primary" onClick={addPackage} disabled={!!editingKey}>新增</Button>
                )}
              </FormItem>
              <EditableTable packageOpt={packageOpt} />
            </div>   
          ) : null
        }
        <FormItem
          {...formItemLayout}
          label="SEO信息"
        >
          {getFieldDecorator('seo')(
            <Switch checkedChildren="展开" unCheckedChildren="收起" onChange={seoChange} />
          )}
        </FormItem>
        {
          seoOpen ? (
            <div>
              <FormItem label="页面标题" {...formItemLayout }>
                {getFieldDecorator('title', {
                  initialValue: currentItem.title,
                })(<Input />)}
              </FormItem>
              <FormItem label="关键词" {...formItemLayout }>
                {getFieldDecorator('keywords', {
                  initialValue: currentItem.keywords,
                })(<Input />)}
              </FormItem>
              <FormItem label="描述" {...formItemLayout }>
                {getFieldDecorator('description', {
                  initialValue: currentItem.description,
                })(<TextArea rows={4} />)}
              </FormItem>
            </div>
          ) : null
        }
        <FormItem wrapperCol={{xs: {offset: 8}}}>
          <Button type="primary" onClick={handleOk} loading={saving}>保存</Button>
        </FormItem>
      </Form>
    </Page>
  )
}

export default connect(({ product, loading }) => ({ product, loading }))(Form.create()(Add))

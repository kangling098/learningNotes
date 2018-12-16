import React from 'react'
import { Card, Button, Modal, Form, Input, DatePicker } from 'antd'
import moment from 'moment'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Link from 'umi/link'
import UserInfo from '@/components/UserInfo'
import OrderList from '../../components/OrderList'

const { Description } = DescriptionList
const FormItem = Form.Item
const { TextArea } = Input
const dateFormat = 'YYYY-MM-DD'

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const Detail = ({
  dispatch,
  loading,
  soft,
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  },
}) => {

  const { currentItem, authorizeVisible, renewVisible, refundVisible, removeVisible, packageData, editingKey } = soft

  const packageOpt = {
    packageData,
    editingKey,
    dispatchHandle: obj => {
      dispatch({
        type: 'soft/getSuccess',
        payload: {
          ...obj,
        }
      })
    }
  }

  const statusMap = index => {
    if(index == 3) {
      return <span style={{color: 'red'}}>已过期</span>
    }
    if(index == 5) {
      return <span style={{color: 'gray'}}>已失效</span>
    }
    return <span style={{color: 'green'}}>正常</span>
  }

  const showModal = item => {
    const payload = {}
    payload[item] = true
    dispatch({
      type: 'soft/setModal',
      payload,
    })
  }

  const authorizeOpt = {
    title: "修改授权",
    visible: authorizeVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`soft/setAuthorize`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
        }
        dispatch({
          type: 'soft/setAuthorize',
          payload: {
            ...data,
          },
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'soft/setModal',
        payload: {
          authorizeVisible: false,
        },
      })
    },
  }

  const renewOpt = {
    title: "续签",
    visible: renewVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`soft/setRenew`],
    onOk () {
      validateFields((errors, fieldsValue) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
        }
        data.end_time = data['end_time'].format(dateFormat)
        dispatch({
          type: 'soft/setRenew',
          payload: {
            ...data,
          },
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'soft/setModal',
        payload: {
          renewVisible: false,
        },
      })
    },
  }

  const refundOpt = {
    title: "退款",
    visible: refundVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    width: 700,
    confirmLoading: loading.effects[`soft/setRefund`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
        }
        dispatch({
          type: 'soft/setRefund',
          payload: {
            ...data,
            order_data: JSON.stringify(packageData),
          },
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'soft/setModal',
        payload: {
          refundVisible: false,
        },
      })
    },
  }

  const removeOpt = {
    title: "作废",
    visible: removeVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`soft/setRemove`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
        }
        dispatch({
          type: 'soft/setRemove',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            dispatch(routerRedux.push({
              pathname: '/product/soft'
            }))
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'soft/setModal',
        payload: {
          removeVisible: false,
        },
      })
    },
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3}>
          <Description term="授权对象">{currentItem.bind_object}</Description>
          <Description term="产品名称">{currentItem.name}</Description>
          <Description term="状态">{statusMap(currentItem.status)}</Description>
          <Description term="会员ID">
            <UserInfo id={currentItem.user_id} />
          </Description>
          <Description term="购买时间">{currentItem.buy_time}</Description>
          <Description term="到期时间">{currentItem.end_time}</Description>
        </DescriptionList>
        {
          currentItem.status == 5 ? null : (
            <DescriptionList col={1} style={{marginTop: 20}}>
              <Description term="操作">
                <Button type="primary" disabled={currentItem.status == 3} onClick={() => showModal('authorizeVisible')}>修改授权</Button>
                <Button type="primary" onClick={() => showModal('renewVisible')}>续签</Button>
                <Button type="primary" disabled={currentItem.status == 3} onClick={() => showModal('refundVisible')}>退款</Button>
                <Button type="danger" disabled={currentItem.status == 3} onClick={() => showModal('removeVisible')}>作废</Button>
              </Description>
            </DescriptionList>
          )
        }
      </Card>
      {
        authorizeVisible ? (
          <Modal {...authorizeOpt}>
            <Form layout="horizontal">
              <FormItem
                {...formItemLayout}
                label="绑定对象"
              >
                {getFieldDecorator('bind_object', {
                  rules: [
                    {
                      required: true,
                      message: '绑定对象必须填写',
                    },
                  ],
                })(
                  <Input placeholder="输入绑定对象" />
                )}
              </FormItem>
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remarks', {
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
        ) : null
      }
      {
        renewVisible ? (
          <Modal {...renewOpt}>
            <Form layout="horizontal">
              <FormItem
                hasFeedback
                {...formItemLayout}
                label="续签时间"
              >
                {getFieldDecorator('end_time', {
                  initialValue: moment(currentItem.end_time, dateFormat),
                  rules: [
                    {
                      required: true,
                      message: '续签时间必须选择',
                    },
                  ],
                })(
                  <DatePicker placeholder="请选择续签日期" format={dateFormat} />
                )}
              </FormItem>
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remarks', {
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
        ) : null
      }
      {
        refundVisible ? (
          <Modal {...refundOpt}>
            <Form layout="horizontal">
              <FormItem label="确认退款订单" {...formItemLayout2}>
                <OrderList packageOpt={packageOpt} />
              </FormItem>
            </Form>
            <Form layout="horizontal">
              <FormItem label="退款说明" {...formItemLayout2}>
                {getFieldDecorator('remarks')(<TextArea rows={4} />)}
              </FormItem>
            </Form>
          </Modal>
        ) : null
      }
      {
        removeVisible ? (
          <Modal {...removeOpt}>
            <Form layout="horizontal">
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remarks', {
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
        ) : null
      }
    </Page>
  )
}

export default connect(({ soft, loading }) => ({ soft, loading }))(Form.create()(Detail))

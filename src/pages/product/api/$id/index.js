import React from 'react'
import { Card, Button, Modal, Form, Input, Tag } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import Package from './Package'
import UserInfo from '@/components/UserInfo'

const { Description } = DescriptionList
const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Detail = ({
  dispatch,
  loading,
  api,
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  },
}) => {

  const { currentItem, removeVisible, statusVisible, packageData, editingKey } = api

  const packageOpt = {
    packageData,
    editingKey,
    changePackage: obj => {
      dispatch({
        type: 'api/changePackage',
        payload: {
          ...obj,
        }
      })
    },
    dispatchHandle: obj => {
      dispatch({
        type: 'api/getSuccess',
        payload: {
          ...obj,
        }
      })
    }
  }

  const showModal = item => {
    const payload = {}
    payload[item] = true
    dispatch({
      type: 'api/getSuccess',
      payload,
    })
  }

  const statusOpt = {
    title: currentItem.status == 1 ? '禁用' : '启用',
    visible: statusVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`api/changeStatus`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          status: currentItem.status == 1 ? 0 : 1,
          id: currentItem.id,
        }
        dispatch({
          type: 'api/changeStatus',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            dispatch({
              type: 'api/queryDetail',
              payload: {
                id: currentItem.id,
              }
            })
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'api/getSuccess',
        payload: {
          statusVisible: false,
        },
      })
    },
  }

  const removeOpt = {
    title: "作废",
    visible: removeVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`api/remove`],
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
          type: 'api/remove',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            dispatch(routerRedux.push({
              pathname: '/product/api'
            }))
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'api/getSuccess',
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
          <Description term="调用码">{currentItem.code}</Description>
          <Description term="产品名称">{currentItem.name}</Description>
          <Description term="会员ID">
            <UserInfo id={currentItem.user_id} />
          </Description>
          <Description term="购买总次数">{currentItem.total_times}</Description>
          <Description term="剩余次数">{currentItem.last_times}</Description>
          <Description term="状态">
            {
              currentItem.status == 1 ? (
                <Tag color="#87d068">启用</Tag>
              ) : (
                <Tag color="#f50">禁用</Tag>
              )
            }
          </Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop:  20}}>
          <Description term="操作">
            {
              currentItem.status == 1 ? (
                <Button type="danger" onClick={() => showModal('statusVisible')}>禁用</Button>
              ) : (
                <Button type="primary" onClick={() => showModal('statusVisible')}>启用</Button>
              )
            }
            <Button type="danger" onClick={() => showModal('removeVisible')}>作废</Button>
            <Button type="primary">调用记录</Button>
          </Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="套餐包列表" style={{marginTop: 24}}>
        <Package packageOpt={packageOpt} />
      </Card>
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
      {
        statusVisible ? (
          <Modal {...statusOpt}>
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

export default connect(({ api, loading }) => ({ api, loading }))(Form.create()(Detail))

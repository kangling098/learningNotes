import React from 'react'
import { Card, Button, Modal, Form, Input } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import ImageZoom from 'react-medium-image-zoom'
import UserInfo from '@/components/UserInfo'
import { rechargeTypes, rechargeStatus } from '@/utils/status/finance/recharge'
import styles from '../index.less'

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
  financeRecharge,
  form: {
    getFieldDecorator,
    getFieldsValue,
    validateFields,
  },
}) => {

  const { currentItem, completeVisible, closeVisible } = financeRecharge

  const showModal = type => {
    const data = {}
    data[type] = true
    dispatch({
      type: 'financeRecharge/updateState',
      payload: {
        ...data,
      },
    })
  }

  const completeOpt = {
    title: "完成充值",
    visible: completeVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`financeRecharge/complete`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
          type: currentItem.type,
        }
        dispatch({
          type: 'financeRecharge/complete',
          payload: {
            ...data,
          },
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'financeRecharge/updateState',
        payload: {
          completeVisible: false,
        },
      })
    },
  }

  const closeOpt = {
    title: "完成充值",
    visible: closeVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`financeRecharge/close`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
          type: currentItem.type,
        }
        dispatch({
          type: 'financeRecharge/close',
          payload: {
            ...data,
          },
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'financeRecharge/updateState',
        payload: {
          closeVisible: false,
        },
      })
    },
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="编号">{currentItem.number}</Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="状态">
            <span style={{color: rechargeStatus[currentItem.status].color}}>{rechargeStatus[currentItem.status].text}</span>
          </Description>
          <Description term="充值方式">{rechargeTypes[currentItem.type]}</Description>
          <Description term="充值金额">{currentItem.money}</Description>
          <Description term="充值支付账号">{currentItem.account}</Description>
        </DescriptionList>
        {
          currentItem.type == 'remittance' ? (
            <DescriptionList col={3}>
              <Description term="银行名称">{currentItem.account_bank_ame}</Description>
              <Description term="银行账户名">{currentItem.account_name}</Description>
              <Description term="交易凭证">
                <div className={styles.attachment}>
                  <ImageZoom
                    image={{ src: currentItem.attachment_url, }}
                    
                  />
                </div>
              </Description>
              <Description term="提交时间">{currentItem.create_time}</Description>
              <Description term="完成时间">{currentItem.finish_time || '-'}</Description>
              <Description term="审核管理员">
                {
                  currentItem.user_id ? (
                    <UserInfo id={currentItem.user_id}>{currentItem.handle_admin_name || '-'}</UserInfo>
                  ) : '-'
                }
              </Description>
            </DescriptionList>
          ) : (
            <DescriptionList col={3}>
              <Description term="提交时间">{currentItem.create_time}</Description>
              <Description term="完成时间">{currentItem.finish_time || '-'}</Description>
            </DescriptionList>
          )
        }
        <DescriptionList col={1} style={{marginTop:  20}}>
          <Description term="操作">
            <Button type="primary" onClick={() => showModal('completeVisible')} disabled={currentItem.status != 1}>完成充值</Button>
            <Button type="primary" onClick={() => showModal('closeVisible')} disabled={currentItem.status != 1}>关闭充值</Button>
          </Description>
        </DescriptionList>
      </Card>
      {
        completeVisible ? (
          <Modal {...completeOpt}>
            <Form layout="horizontal">
              {
                currentItem.type != 'remittance' ? (
                  <FormItem label="交易号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('trade_no', {
                        rules: [
                          {
                            required: true,
                            message: '交易号必须填写',
                          },
                        ],
                      })(<Input />)}
                  </FormItem>
                ) : null
              }
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remark', {
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
        closeVisible ? (
          <Modal {...closeOpt}>
            <Form layout="horizontal">
              <FormItem label="备注" {...formItemLayout}>
                {getFieldDecorator('remark')(<TextArea rows={4} />)}
              </FormItem>
            </Form>
          </Modal>
        ) : null
      }
    </Page>
  )
}

export default connect(({ financeRecharge, loading }) => ({ financeRecharge, loading }))(Form.create()(Detail))

import React from 'react'
import { Card, Form, Button, Modal } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import UserInfo from '@/components/UserInfo'
import { orderStatus } from '@/utils/status/finance/order'
import { orderType, refundStatus, orderChildType } from 'utils/status/finance/order'
import { filteredValueCreator } from 'utils'

const { Description } = DescriptionList

const Detail = ({
  location,
  dispatch,
  loading,
  order,
  app,
}) => {
  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName
  const { childOrderDetail, isMotion } = order

  const refund = type => {
    Modal.confirm({
      title: '是否更改此订单退款状态?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'order/changeRefund',
            payload: {
              resolve,
              order_ids: [childOrderDetail.id],
              refund_status: type,
            },
          })
        })
      },
    })
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="子订单编号">{childOrderDetail.number}</Description>
          <Description term="订单编号">{childOrderDetail.order_number}</Description>
          <Description term="状态">
            <span style={{color: orderStatus[childOrderDetail.status].color}}>{orderStatus[childOrderDetail.status].text}</span>
          </Description>
          <Description term="会员ID"><UserInfo id={childOrderDetail.user_id} /></Description>
          <Description term="订单类型">{orderChildType[childOrderDetail.sub_type]}</Description>
          <Description term="订单名称">{childOrderDetail.title}</Description>
          <Description term="退款状态">{refundStatus[childOrderDetail.is_refund]}</Description>
          <Description term="数量">{childOrderDetail.num}</Description>
          <Description term="订单金额">{childOrderDetail.amount}</Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginBottom: 16}}>
          {
            childOrderDetail.status == 2 ? (
              <Description term="支付信息">
                已支付￥ {childOrderDetail.amount} = (现金支付：￥ {childOrderDetail.pay_money}) + ({virtualMoneyName}支付：{childOrderDetail.pay_virtual})
              </Description>
            ) : null
          }
          {
            childOrderDetail.discount_info ? (
              <Description term="优惠明细">{childOrderDetail.discount_info}</Description>
            ) : null
          }
          {
            childOrderDetail.is_refund == 2 ? (
              <Description term="退款信息">
                已退款￥ {childOrderDetail.amount} = (现金退款：￥ {childOrderDetail.refund_money}) + ({virtualMoneyName}退款：{childOrderDetail.refund_virtual}) <Link to={childOrderDetail.refund_id}>查看详情</Link>
              </Description>
            ) : null
          }
        </DescriptionList>
        {
          childOrderDetail.is_refund != 2 ? (
            <DescriptionList col={1} style={{marginTop:  20}}>
              <Description term="操作">
                {
                  childOrderDetail.is_refund == 0 ? (
                    <Button type="primary" onClick={() => refund(1)}>允许退款</Button>
                  ) : (
                    <Button type="danger" onClick={() => refund(0)}>禁止退款</Button>
                  )
                }
              </Description>
            </DescriptionList>
          ) : null
        }
      </Card>
      <Card bordered={false} title="订单属性" style={{marginTop: 24}}>
        <DescriptionList>
          {
            childOrderDetail.attr && childOrderDetail.attr.map(item => <Description term={item.attr_name} key={item.attr_name}>{item.attr_value}</Description>)
          }
        </DescriptionList>
      </Card>
    </Page>
  )
}

export default connect(({ order, loading, app }) => ({ order, loading, app }))(Form.create()(Detail))

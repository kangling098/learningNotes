import React from 'react'
import { Card, Form, Timeline, Table } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import UserInfo from '@/components/UserInfo'
import { refundStatus, typeMap, orderChildType, orderType, orderStatus} from 'utils/status/finance/order'
import { filteredValueCreator } from 'utils'

const { Description } = DescriptionList

const filterRefund = []
for(let item in refundStatus) {
	filterRefund.push({
		text: refundStatus[item],
		value: item,
	})
}

const filterType = []
for(let item in orderType) {
	filterType.push({
		text: orderType[item],
		value: item,
	})
}

const Detail = ({
  location,
  dispatch,
  loading,
  order,
  app,
}) => {
  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName
  const { currentItem, isMotion, childOrder } = order
  const { query } = location

  const columns = [
    {
      title: '编号',
      dataIndex: 'number',
      align: 'left',
    },
    {
      title: '订单类别',
      dataIndex: 'type',
      render: text => typeMap[text]
    },
    {
      title: '订单类型',
      dataIndex: 'sub_type',
      render: text => orderChildType[text]
    },
    {
      title: '订单名称',
      dataIndex: 'title',
    },
    {
      title: '数量',
      dataIndex: 'num',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '优惠金额',
      dataIndex: 'discount',
    },
    {
      title: '总价',
      dataIndex: 'amount',
    },
    {
      title: '退款状态',
      dataIndex: 'is_refund',
      render: text => refundStatus[text]
    },
    {
			title: '管理',
			key: 'action',
			render: (text, record) => <Link to={`/finance/order/childDetail/${record.id}`}>查看</Link>,
    },
  ]

  const tableProps = {
    dataSource: childOrder,
    location,
    isMotion,
    pagination: false,
  }

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="订单编号">{currentItem.number}</Description>
          <Description term="总金额">{currentItem.amount}</Description>
          <Description term="状态">
            <span style={{color: orderStatus[currentItem.status].color}}>{orderStatus[currentItem.status].text}</span>
          </Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="下单时间">{currentItem.create_time}</Description>
          <Description term="支付时间">{currentItem.pay_time || '-'}</Description>
        </DescriptionList>
        <DescriptionList col={1}>
          {
            currentItem.status == 2 ? (
              <Description term="支付信息">
                已支付￥ {currentItem.amount} = (现金支付：￥ {currentItem.pay_money}) + ({virtualMoneyName}支付：{currentItem.pay_virtual})
              </Description>
            ) : null
          }
          {
            currentItem.discount_info ? (
              <Description term="优惠明细">{currentItem.discount_info}</Description>
            ) : null
          }
        </DescriptionList>
      </Card>
      <Card bordered={false} title="子订单列表" style={{marginTop: 24}}>
        <Table
          {...tableProps}
          columns={columns}
          simple
          rowSelection={null}
          expandAll
          defaultExpandAllRows
          rowKey={record => record.id}
          components={{
            body: { wrapper: isMotion ? AnimateBody : CommonBody },
          }}
        />
      </Card>
    </Page>
  )
}

export default connect(({ order, loading, app }) => ({ order, loading, app }))(Form.create()(Detail))

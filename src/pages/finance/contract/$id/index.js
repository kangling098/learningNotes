import React from 'react'
import { Card, Form, Timeline, Table } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import UserInfo from '@/components/UserInfo'
import { statusMap } from '@/utils/status/finance/contract'
import { refundStatus, typeMap, orderChildType} from 'utils/status/finance/order' 

const { Description } = DescriptionList

const Detail = ({
  dispatch,
  loading,
  contract,
}) => {

  const { currentItem, isMotion } = contract

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
    dataSource: currentItem.orders,
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
          <Description term="合同编号">{currentItem.number}</Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="状态">
            <span style={{color: statusMap[currentItem.status].color}}>{statusMap[currentItem.status].text}</span>
          </Description>
          <Description term="甲方姓名">{currentItem.customer_name}</Description>
          <Description term="申请时间">{currentItem.check_begin_time}</Description>
          <Description term="完成时间">{currentItem.check_end_time || '-'}</Description>
          <Description term="甲方地址">{currentItem.contact_province + currentItem.contact_city + currentItem.contact_area + currentItem.contact_address}</Description>
          <Description term="联系人姓名">{currentItem.customer_contact_name}</Description>
          <Description term="联系人电话">{currentItem.customer_contact_tel}</Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="订单信息" style={{marginTop: 24}}>
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
      {
        currentItem.back_express && currentItem.back_express.express_name ? (
          <Card bordered={false} title="寄回公司快递信息" style={{marginTop: 24}}>
            <DescriptionList col={3} style={{marginBottom: 16}}>
              <Description term="快递名称">{currentItem.back_express.express_name}</Description>
              <Description term="快递单号">{currentItem.back_express.express_number}</Description>
              <Description term="最新动态">
                {
                  currentItem.back_express.status == -1 ? (
                    <span>删除</span>
                  ) : null
                }
                {
                  currentItem.back_express.status == 0 ? (
                    <span>待寄件</span>
                  ) : null
                }
                {
                  currentItem.back_express.status == 1 ? (
                    <span>已寄件</span>
                  ) : null
                }
              </Description>
            </DescriptionList>
          </Card>
        ) : null
      }
      {
        currentItem.send_express && currentItem.send_express.contact_name ? (
          <Card bordered={false} title="寄回客户快递信息" style={{marginTop: 24}}>
            <DescriptionList col={3} style={{marginBottom: 16}}>
              <Description term="收件人">{currentItem.send_express.contact_name}</Description>
              <Description term="收件人电话">{currentItem.send_express.contact_tel}</Description>
              <Description term="收件地址">{currentItem.send_express.contact_province + currentItem.send_express.contact_city + currentItem.send_express.contact_area + currentItem.send_express.contact_address}</Description>
              <Description term="快递名称">{currentItem.send_express.express_name}</Description>
              <Description term="快递单号">{currentItem.send_express.express_number}</Description>
              <Description term="最新动态">
                {
                  currentItem.send_express.status == -1 ? (
                    <span>删除</span>
                  ) : null
                }
                {
                  currentItem.send_express.status == 0 ? (
                    <span>待寄件</span>
                  ) : null
                }
                {
                  currentItem.send_express.status == 1 ? (
                    <span>已寄件</span>
                  ) : null
                }
              </Description>
            </DescriptionList>
          </Card>
        ) : null
      }
    </Page>
  )
}

export default connect(({ contract, loading }) => ({ contract, loading }))(Form.create()(Detail))

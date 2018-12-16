import React from 'react'
import { Card, Form, Timeline } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import UserInfo from '@/components/UserInfo'
import Order from './components/Order'
import { statusMap } from '@/utils/status/finance/refund'
import { orderType, refundStatus} from 'utils/status/finance/order' 

const { Description } = DescriptionList

const productMap = {
  1: '软件',
  2: '硬件',
  3: 'API',
}

const Detail = ({
  dispatch,
  loading,
  refund,
  app,
}) => {

  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName
  const { currentItem, isMotion, editingKey } = refund

  const packageOpt = {
    packageData: currentItem.orders || [],
    editingKey,
    virtualMoneyName,
    status: currentItem.status,
    changeOrder: obj => {
      dispatch({
        type: 'refund/changeOrder',
        payload: {
          ...obj,
        }
      })
    },
    dispatchHandle: obj => {
      dispatch({
        type: 'refund/updateState',
        payload: {
          ...obj,
        }
      })
    },
    changePackage: obj => {
      console.log(obj)
    },
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="编号">{currentItem.number}</Description>
          <Description term="申请人">
            {currentItem.user_type == 2 ? '会员' : '管理员'}<UserInfo id={currentItem.user_id}> [{currentItem.user_id}]</UserInfo>
          </Description>
          <Description term="状态">
            <span style={{color: statusMap[currentItem.status].color}}>{statusMap[currentItem.status].text}</span>
          </Description>
          <Description term="产品类型">{productMap[currentItem.product_type]}</Description>
          <Description term="产品名称"></Description>
          <Description term="申请时间">{currentItem.create_time}</Description>
          <Description term="现金账户退款">￥ {currentItem.money}</Description>
          <Description term={`${virtualMoneyName}账户退款`}>{currentItem.virtual}</Description>
          <Description term="退款原因">{currentItem.remark}</Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="订单信息" style={{marginTop: 24}}>
        <Order packageOpt={packageOpt} />
      </Card>
      <Card bordered={false} title="审核流程" style={{marginTop: 24}}>
				<Timeline>
          {
            currentItem.audit && currentItem.audit.map(item => {
              return (
                <Timeline.Item key={item.name}>
                  {item.name} <span style={{color: item.audit_result ? (item.audit_result == 1 ? 'green' : 'red') : 'blue'}}>{item.result}</span>
                  <p style={{marginTop: 5, marginBottom: 0}}>{item.audit_user_name}：{item.audit_note} <span stye={{color: 'gray'}}>{item.audit_time}</span></p>
                </Timeline.Item>
              )
            })
          }
				</Timeline>
      </Card>
    </Page>
  )
}

export default connect(({ refund, loading, app }) => ({ refund, loading, app }))(Form.create()(Detail))

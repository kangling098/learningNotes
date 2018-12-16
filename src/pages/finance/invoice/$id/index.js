import React from 'react'
import { Card, Form, Timeline } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import ImageZoom from 'react-medium-image-zoom'
import UserInfo from '@/components/UserInfo'
import { statusMap, issueTypeMap, natureTypeMap, typeMap } from '@/utils/status/finance/invoice'
import styles from '../index.less'

const { Description } = DescriptionList

const Detail = ({
  dispatch,
  loading,
  invoice,
}) => {

  const { currentItem } = invoice

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="编号">{currentItem.number}</Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="状态">
            <span style={{color: statusMap[currentItem.status].color}}>{statusMap[currentItem.status].text}</span>
          </Description>
          <Description term="发票类型">{typeMap[currentItem.type]} [{issueTypeMap[currentItem.issue_type]}]</Description>
          <Description term="发票抬头">{currentItem.title}</Description>
          <Description term="发票金额">{currentItem.money}</Description>
          <Description term="发票性质">{natureTypeMap[currentItem.nature_type]}</Description>
          <Description term="税务登记号">{currentItem.tax_registration_number || '-'}</Description>
        </DescriptionList>
        {
            currentItem.type == 2 ? (
              <DescriptionList col={3} style={{marginBottom: 16}}>
                <Description term="开户银行名称">{currentItem.bank_name}</Description>
                <Description term="开户银行帐号">{currentItem.bank_account}</Description>
                <Description term="注册场地地址">{currentItem.registered_venue_address}</Description>
                <Description term="注册固定电话">{currentItem.registered_landline}</Description>
                <Description term="一般纳税人资格证明">
                  <div className={styles.attachment}>
                    <ImageZoom
                      image={{ src: currentItem.taxpayer_certificate, }}
                    />
                  </div>
                </Description>
                <Description term="增值税专用发票开票信息">
                  <div className={styles.attachment}>
                    <ImageZoom
                      image={{ src: currentItem.vat_invoice_info, }}
                    />
                  </div>
                </Description>
              </DescriptionList>
            ) : null
          }
      </Card>
      {
        currentItem.express && currentItem.express.contact_name ? (
          <Card bordered={false} title="快递信息" style={{marginTop: 24}}>
            <DescriptionList col={3} style={{marginBottom: 16}}>
              <Description term="收件人">{currentItem.express.contact_name}</Description>
              <Description term="收件人电话">{currentItem.express.contact_tel}</Description>
              <Description term="收件地址">{currentItem.express.contact_province + currentItem.express.contact_city + currentItem.express.contact_area + currentItem.express.contact_address}</Description>
              <Description term="快递名称">{currentItem.express.express_name}</Description>
              <Description term="快递单号">{currentItem.express.express_number}</Description>
              <Description term="最新动态">
                {
                  currentItem.express.status == -1 ? (
                    <span>删除</span>
                  ) : null
                }
                {
                  currentItem.express.status == 0 ? (
                    <span>待寄件</span>
                  ) : null
                }
                {
                  currentItem.express.status == 1 ? (
                    <span>已寄件</span>
                  ) : null
                }
              </Description>
            </DescriptionList>
          </Card>
        ) : null
      }
      <Card bordered={false} title="审核流程" style={{marginTop: 24}}>
				<Timeline mode="alternate" pending="等待...">
					<Timeline.Item>客户部审核</Timeline.Item>
					<Timeline.Item color="green">客户部审核通过金凤凰司法局收到货</Timeline.Item>
					<Timeline.Item>财务部审核</Timeline.Item>
				</Timeline>
      </Card>
    </Page>
  )
}

export default connect(({ invoice, loading }) => ({ invoice, loading }))(Form.create()(Detail))

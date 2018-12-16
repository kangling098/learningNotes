import React from 'react'
import { Card, Form, Timeline, Table } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import Link from 'umi/link'
import ImageZoom from 'react-medium-image-zoom'
import UserInfo from '@/components/UserInfo'
import AdminInfo from '@/components/AdminInfo'
import styles from '../index.less'

const { Description } = DescriptionList

const Detail = ({
  dispatch,
  loading,
  deposit,
  app,
}) => {

  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName
  const { currentItem } = deposit

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3} style={{marginBottom: 16}}>
          <Description term="编号">{currentItem.id}</Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="入款管理员ID"><AdminInfo id={currentItem.admin_id} /></Description>
          <Description term="入款类型">{currentItem.money_type == 'money' ? '现金' : virtualMoneyName}</Description>
          <Description term="入款金额">{currentItem.money_type == 'money' ? `￥ ${currentItem.money}` : 'currentItem.money'}</Description>
          <Description term="入款备注">{currentItem.remarks}</Description>
          <Description term="入款时间">{currentItem.create_time}</Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginBottom: 16}}>
          <Description term="入款凭证">
            <div className={styles.attachment}>
              {
                currentItem.attachment && currentItem.attachment.map(item => <ImageZoom image={{ src: item }} key={item} />)
              }
            </div>
          </Description>
        </DescriptionList>
      </Card>
    </Page>
  )
}

export default connect(({ deposit, loading, app }) => ({ deposit, loading, app }))(Form.create()(Detail))

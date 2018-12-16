import React from 'react'
import { Card } from 'antd'
import { Page } from 'components'
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TerminalInfo from '@/components/TerminalInfo'

const { Description } = DescriptionList

const Me = ({ loading, dispatch, app }) => {

  const { user } = app

  return (
    <Page>
      <Card bordered={false} title="个人详情">
        <DescriptionList>
          <Description term="管理ID">{user.id}</Description>
          <Description term="姓名">{user.username}</Description>
          <Description term="手机">{user.mobile}</Description>
          <Description term="邮箱">{user.email}</Description>
          <Description term="上次登录时间">{user.last_login_time}</Description>
          <Description term="上次登录地点">{user.last_login_area} {
            user.login_status ? (
              <em style={{color: 'green', fontStyle: "normal"}}>[正常]</em>
            ) : (
              <em style={{color: 'red', fontStyle: "normal"}}>[异常]</em>
            )
          }</Description>
        </DescriptionList>
      </Card>
    </Page>
  )
}

Me.propTypes = {
}

export default connect(({ loading, app }) => ({ loading, app }))(Me)

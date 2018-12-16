import React from 'react'
import { connect } from 'dva'
import { Form, Tabs } from 'antd'
import { Page } from 'components'

import Base from './components/Base'
import User from './components/User'
import Workorder from './components/Workorder'
import Sms from './components/Sms'
import Email from './components/Email'
import Finance from './components/Finance'
import Pay from './components/Pay'

const TabPane = Tabs.TabPane

const Setting = ({
  setting,
  loading,
  dispatch,
}) => {

  const { defaultData, type, saving, webClose, register, fileList, fileList2, fileList3 } = setting

  const callback = key => {
    dispatch({
      type: 'setting/query',
      payload: {
        section: key,
      },
    })
    dispatch({
      type: 'setting/updateState',
      payload: {
        type: key,
      },
    })
  }

  const handleChange = info => {
    let fileList = info.fileList
    fileList = fileList.slice(-1)
    dispatch({
      type: 'setting/updateState',
      payload: {
        fileList: fileList,
      },
    })
  }

  const handleChange2 = info => {
    let fileList = info.fileList
    fileList = fileList.slice(-1)
    dispatch({
      type: 'setting/updateState',
      payload: {
        fileList2: fileList,
      },
    })
  }

  const onOk = data => {
    dispatch({
      type: 'setting/infoSave',
      payload: {
        ...data,
      }
    })
  }

  const baseOpt = {
    item: defaultData.base,
    saving,
    webClose,
    fileList,
    fileList2,
    handleChange,
    handleChange2,
    onOk,
    webCloseChange(checked) {
      dispatch({
        type: 'setting/updateState',
        payload: {
          webClose: checked,
        },
      })
    },
  }

  const userOpt = {
    item: defaultData.user,
    saving,
    onOk,
    register,
    registerChange(checked) {
      dispatch({
        type: 'setting/updateState',
        payload: {
          register: checked,
        },
      })
    },
  }

  const workorderOpt = {
    item: defaultData.workorder,
    saving,
    onOk,
  }

  const smsOpt = {
    item: defaultData.sms,
    saving,
    onOk,
  }

  const emailOpt = {
    item: defaultData.email,
    saving,
    onOk,
    emailSend(data) {
      dispatch({
        type: 'setting/emailTest',
        payload: {
          ...data,
        },
      })
    }
  }

  const financeOpt = {
    item: defaultData.finance,
    saving,
    onOk,
  }

  const payOpt = {
    item: defaultData.recharge,
    saving,
    fileList3,
    handleChange,
    onOk,
  }

  return (
    <Page inner>
      <Tabs type="card" onChange={callback} activeKey={type}>
        <TabPane tab="基本" key="base">
          <Base {...baseOpt} />
        </TabPane>
        <TabPane tab="会员" key="user">
          <User {...userOpt} />
        </TabPane>
        <TabPane tab="产品" key="product">

        </TabPane>
        <TabPane tab="工单" key="workorder">
          <Workorder {...workorderOpt} />
        </TabPane>
        <TabPane tab="短信" key="sms">
          <Sms {...smsOpt} />
        </TabPane>
        <TabPane tab="邮箱" key="email">
          <Email {...emailOpt} />
        </TabPane>
        <TabPane tab="财务" key="finance">
          <Finance {...financeOpt} />
        </TabPane>
        <TabPane tab="充值" key="recharge">
          <Pay {...payOpt} />
        </TabPane>
      </Tabs>
    </Page>
  )
}

Setting.propTypes = {
}

export default connect(({ setting, loading }) => ({ setting, loading }))(Form.create()(Setting))

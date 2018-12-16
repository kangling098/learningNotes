import React from 'react'
import { Card, Table, Button, Modal } from 'antd'
import { routerRedux } from 'dva/router'
import { Page } from 'components'
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TerminalInfo from '@/components/TerminalInfo'

const { Description } = DescriptionList


import { lockMap, onlineMap, typeMap, statusMap, lockTypeMap } from '../../util'
import Deposit from './components/Deposit'
import Credit from './components/Credit'
import Lock from './components/Lock'
import Logout from './components/Logout'
import Lockmodal from './components/Lockmodal'

const Detail = ({ loading, dispatch, userDetail, app }) => {

  const { currentItem, depositVisible, creditVisible, lockVisible, logoutVisible, fileList, isProtect, locklistVisible } = userDetail

  const { commonTag } = app.user
  const virtualMoneyName = commonTag.virtualMoneyName

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '操作对象',
      dataIndex: 'object_name',
      key: 'object_name',
      render: (text, record) => {
        if(text) {
          return <p style={{marginBottom: 0}}>
            {text} [<Link to={`/logs/admin?keyword=${text}&search_type=object_name`}>查看</Link>]
          </p>
        }else {
          return '-'
        }
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '终端信息',
      dataIndex: 'from_ip',
      key: 'from_ip',
      render: (text, record) => <TerminalInfo id={record.terminal_id} />
    },
    {
      title: '操作时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '管理',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => <Link to={`/logs/admin/${record.id}`}>详细内容</Link>
    },
  ]

  const showModal = item => {

    const payload = {}
    payload[item] = true

    dispatch({
      type: 'userDetail/querySuccess',
      payload,
    })
  }

  const handleChange = info => {
    let fileList = info.fileList
    fileList = fileList.slice(-5)
    dispatch({
      type: 'userDetail/querySuccess',
      payload: {
        fileList: fileList,
      },
    })
  }

  const unlock = () => {
    Modal.confirm({
      title: '您确定要解锁会员么?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'userDetail/unlock',
            payload: {
              id: currentItem.id,
              resolve,
            },
          })
        })
      },
    })
  }

  const depositModalProps = {
    visible: depositVisible,
    maskClosable: false,
    title: '会员入款',
    currentItem,
    handleChange,
    fileList,
    virtualMoneyName,
    confirmLoading: loading.effects['userDetail/changeMoney'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userDetail/changeMoney',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          depositVisible: false,
        }
      })
    },
  }

  const creditModalProps = {
    visible: creditVisible,
    maskClosable: false,
    title: '会员授信变更',
    currentItem,
    confirmLoading: loading.effects['userDetail/changeCredit'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userDetail/changeCredit',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          creditVisible: false,
        }
      })
    },
  }

  const lockModalProps = {
    visible: lockVisible,
    isProtect,
    maskClosable: false,
    title: '会员锁定',
    currentItem,
    confirmLoading: loading.effects['userDetail/lock'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userDetail/lock',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          lockVisible: false,
        }
      })
    },
    onChange (e) {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          isProtect: e.target.value ? true : false,
        }
      })
    }
  }

  const logoutModalProps = {
    visible: logoutVisible,
    maskClosable: false,
    title: '会员注销',
    currentItem,
    handleChange,
    fileList,
    confirmLoading: loading.effects['userDetail/remove'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userDetail/remove',
        payload: {
          ...data,
        }
      }).then(res => {
        if(res && res.success) {
          dispatch(
            routerRedux.push({
            pathname: '/user',
          }))
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          logoutVisible: false,
        }
      })
    },
  }

  const locklistModalProps = {
    title: '锁定历史',
    visible: locklistVisible,
    currentItem,
    width: 600,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          locklistVisible: false,
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'userDetail/querySuccess',
        payload: {
          locklistVisible: false,
        }
      })
    },
  }

  return (
    <Page>
      <Card bordered={false} title="会员详情">
        <DescriptionList size="large">
          <Description term="会员ID">{currentItem.id}</Description>
          <Description term="编号">{currentItem.number}</Description>
          <Description term="状态">
            {statusMap(currentItem.status)}
          </Description>
          <Description term="类型">
            {typeMap[currentItem.type]}
          </Description>
          <Description term="登录帐号">{currentItem.account}</Description>
          <Description term="昵称">{currentItem.nick_name}</Description>
          <Description term="手机">{currentItem.mobile}</Description>
          <Description term="邮箱">{currentItem.email}</Description>
          <Description term="QQ">{currentItem.qq}</Description>
          <Description term="现金账户">￥{currentItem.money}
            <Link to={`/finance/detail?keyword=${currentItem.id}&search_type=user_id&money_type=money`} style={{marginLeft: 10}}>明细</Link>
          </Description>
          <Description term={virtualMoneyName}>{currentItem.virtual}<Link to={`/finance/detail?keyword=${currentItem.id}&search_type=user_id&money_type=virtual`} style={{marginLeft: 10}}>明细</Link></Description>
          <Description term="信用额度">￥{currentItem.credit}</Description>
          <Description term="是否锁定">
            { lockMap(currentItem.lock_status) } <a onClick={() => showModal('locklistVisible')}>锁定历史</a>
          </Description>
          <Description term="是否在线">
            { onlineMap(currentItem.online_status) }
            <Link to={`/user/loginlog?keyword=${currentItem.id}&search_type=user_id`} style={{marginLeft: 10}}>登录日志</Link>
          </Description>
          <Description term="注册时间">
            {currentItem.create_time}
            <Link to={`/logs/admin?search_type=user_id&keyword=${currentItem.id}&user_type=2&object_name=register`} style={{marginLeft: 10}}>注册信息</Link>
          </Description>
        </DescriptionList>
        
        <DescriptionList col={1} style={{marginTop: 20}}>
          <Description term="操作">
            <Button type="primary" onClick={() => showModal('depositVisible')}>会员入款</Button>
            <Button type="primary" onClick={() => showModal('creditVisible')}>调整授信</Button>
            {
              currentItem.lock_status == 1 ? (
                <Button type="primary" onClick={unlock}>解锁</Button>
              ) : (
                <Button type="danger" onClick={() => showModal('lockVisible')}>锁定</Button>
              )
            }
            <Button type="danger" onClick={() => showModal('logoutVisible')}>注销帐号</Button>
            <Button type="primary">进入会员中心</Button>
          </Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="操作日志" style={{marginTop: 24}} extra={<Link to={`/logs/admin?keyword=${currentItem.id}&search_type=user_id`} style={{marginLeft: 10}}>查看全部操作日志</Link>}>
      <Table
        style={{ marginBottom: 24 }}
        pagination={false}
        dataSource={currentItem.user_log || []}
        columns={columns}
        rowKey="id"
      />
      </Card>
      {depositVisible && <Deposit {...depositModalProps} />}
      {creditVisible && <Credit {...creditModalProps} />}
      {lockVisible && <Lock {...lockModalProps} />}
      {logoutVisible && <Logout {...logoutModalProps} />}
      {locklistVisible && <Lockmodal {...locklistModalProps} />}
    </Page>
  )
}

Detail.propTypes = {
  userDetail: PropTypes.object,
}

export default connect(({ userDetail, loading, app }) => ({ userDetail, loading, app }))(Detail)

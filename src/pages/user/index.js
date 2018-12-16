import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './components/List'
import Filter from '@/components/Filters/SimpleFilter'
import Modal from './components/Modal'
import { handleRefreshCreator, listOnChangeCreator } from 'utils'

const User = ({
  location, dispatch, user, loading,
}) => {
  
  const { query, pathname } = location
  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const {
    list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys,
  } = user

  const modalProps = {
    item: modalType === 'create' ? {type: 1} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 600,
    confirmLoading: loading.effects[`user/${modalType}`],
    title: `${modalType === 'create' ? '添加会员' : '修改会员'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'user/create',
        payload: {
          ...data,
        }
      })
    },
    onCancel () {
      dispatch({ type: 'user/hideModal' })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
    isMotion,
    onChange: onListChange,
    onDeleteItem (id) {
      
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'edit',
          currentItem: {
            ...item,
            modalType: 'edit',
          }
        }
      })
    },
  }

  const createHandle = () => {
    dispatch({ type: 'user/showModal', payload: { modalType: 'create' } })
  }


  const options = [
    { key: 'user_id', value: '会员ID' },
    { key: 'number', value: '会员编号' },
    { key: 'account', value: '登录帐号' },
    { key: 'mobile', value: '手机' },
    { key: 'email', value: '邮箱' },
    { key: 'qq', value: 'QQ' },
    { key: 'nick_name', value: '昵称' },
  ]

  const filterProps = {
    filter: {
      ...query,
    },
    options,
    createHandle,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(User)

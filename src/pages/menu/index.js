import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Button } from 'antd'

import Sort from '@/components/Sort'
import List from './components/List'
import Modal from './components/Modal'

import { sortDataFormat } from 'utils'


const Menu = ({
  location, dispatch, menu, loading,
}) => {
  const {
    list, modalType, modalVisible, currentItem, isMotion, selectedRowKeys, sortVisible,
  } = menu

  const modalProps = {
    item: modalType === 'create' ? {status: 1, is_nav: 1,} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`menu/create`],
    list,
    title: `${modalType === 'create' ? '新增菜单' : '修改菜单'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'menu/create',
        payload: {
          ...data,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'menu/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['menu/query'],
    pagination: false,
    location,
    isMotion,
    onChange () {
      dispatch({

      })
    },
    onDeleteItem (id, resolve) {
      dispatch({
        type: 'menu/remove',
        payload: {
          id,
          resolve,
        },
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'menu/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: () => {
        
      },
    },
  }

  const createMenu = () => {
    dispatch({
      type: 'menu/showModal',
      payload: {
        modalType: 'create',
      },
    })
  }

  const sortHandler = () => {
    dispatch({
      type: 'menu/updateState',
      payload: {
        sortVisible: true,
      }
    })
  }
  const sortProps = {
    visible: sortVisible,
    maskClosable: false,
    title: '菜单排序',
    data: sortDataFormat(list),
    confirmLoading: loading.effects['app/sort'],
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'app/sort',
        payload: {
          module: 'res',
          sequence: JSON.stringify(data),
        }
      }).then(res => {
        if(res && res.success) {
          dispatch({
            type: 'menu/updateState',
            payload: {
              sortVisible: false,
            }
          })
          dispatch({
            type: 'app/query',
          })
          dispatch({
            type: 'menu/query',
          })
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'menu/updateState',
        payload: {
          sortVisible: false,
        }
      })
    },
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Button type="ghost" onClick={createMenu}>新增</Button>
        <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>排序</Button>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {sortVisible && <Sort {...sortProps} />}
    </Page>
  )
}

Menu.propTypes = {
  
}

export default connect(({ menu, loading }) => ({ menu, loading }))(Form.create()(Menu))

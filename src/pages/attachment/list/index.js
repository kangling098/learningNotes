import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import { Page } from 'components'
import Filter from '@/components/Filters/MediumFilter'
import List from './components/List'
import Modal from './components/EditModal'
import BizModal from './components/BizModal'
import {handleRefreshCreator} from 'utils'
const NAMESPACE = 'attachmentList'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list,currentItem, modalVisible, bizModalVisible, bizList, storages, allNodes, pagination,
    } = modelState

    const listProps = {
        dataSource: list,
        allNodes,
        loading,
        location,
        pagination,
        handleRefresh,
        viewBizList (id) {
            dispatch({
                type: `${NAMESPACE}/getBizList`,
                payload: { 
                    keyword: id,
                    search_type: 'attachment_id',
                 },
              })
            dispatch({ type: `${NAMESPACE}/showBizModal`, payload: { id } })
        },
    }

    // 上传弹窗
    const modalProps = {
        storages,
        visible: modalVisible,
        maskClosable: false,
        width: 600,
        //confirmLoading: true,
        title: `手动上传`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: `${NAMESPACE}/create`,
            payload: {
              ...data,
            },
          })
        },
        onCancel () {
          dispatch({ type: `${NAMESPACE}/hideModal` })
        },
      }
      const createHandle = () => {
        dispatch({ type: `${NAMESPACE}/showModal`, payload: { modalType: 'create',fileList: [] } })
      }

      // 所属业务弹窗
      const bizModalProps = {
        bizList: bizList,
        visible: bizModalVisible,
        maskClosable: false,
        width: 800,
        //confirmLoading: true,
        title: `所属业务`,
        wrapClassName: 'vertical-center-modal',
        footer: null,
        onCancel () {
            dispatch({ type: `${NAMESPACE}/hideBizModal` })
          },
      }
    return (
        <Page inner>
            <div style={{ paddingBottom: 10 }}>
                <Button type="ghost" onClick={createHandle}>新增</Button>
            </div>
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
            {bizModalVisible && <BizModal {...bizModalProps} />}
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
  }
  
export default connect(({[NAMESPACE]:modelState, loading})=>({modelState, loading: loading.models[NAMESPACE] }))(PageCom)



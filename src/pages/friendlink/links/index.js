import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button } from 'antd'
import { Page } from 'components'
import Filter from '@/components/Filters/MediumFilter'
import List from './components/List'
import Modal from './components/EditLinkModal'
import {handleRefreshCreator} from 'utils'
const NAMESPACE = 'friendlinkLinks'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list,currentItem, modalVisible, modalType, linkTypes, fileList, pagination,
    } = modelState

    const listProps = {
        dataSource: list,
        loading,
        location,
        pagination,
        handleRefresh,
        onDeleteItem (id) {
            dispatch({
                type: `${NAMESPACE}/delete`,
                payload: id,
            })
            .then(()=>{
                handleRefresh({
                })
            })
        },
        onEditItem (item) {
            let defaultFileList = []
            if(item.logo) {
                defaultFileList = [
                    {
                        uid: item.id,
                        name: item.name,
                        status: 'done',
                        url: item.logo_url,
                        thumbUrl: item.logo_url,
                      },
                ]
            }

            dispatch({
              type: 'friendlinkLinks/showModal',
              payload: {
                modalType: 'edit',
                fileList: defaultFileList, // 强烈声明，注意数据层级结构 Σ(｀д′*ノ)ノ 
                currentItem: {
                  ...item,
                  modalType: 'edit',
                },
              },
            })
          },
    }

    // 用于限制上传附件只留1个
    const handleUploadChange = info => {
        let fileList = info.fileList
        fileList = fileList.slice(-1)
        dispatch({
            type: 'friendlinkLinks/updateState',
            payload: {
             fileList: fileList,
            },
        })
    }
    const modalProps = {
        item: modalType === 'create' ? {type: 1} : currentItem,
        linkTypes:linkTypes,
        handleUploadChange,
        fileList,
        visible: modalVisible,
        maskClosable: false,
        width: 600,
        //confirmLoading: true,
        title: `${modalType === 'create' ? '添加友情链接' : '修改友情链接'}`,
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
          dispatch({
            type: 'friendlinkLinks/create',
            payload: {
              ...data,
            },
          })
        },
        onCancel () {
          dispatch({ type: 'friendlinkLinks/hideModal' })
        },
      }
      const createHandle = () => {
        dispatch({ type: 'friendlinkLinks/showModal', payload: { modalType: 'create',fileList: [] } })
      }
    return (
        <Page inner>
            <div style={{ paddingBottom: 10 }}>
                <Button type="ghost" onClick={createHandle}>新增</Button>
            </div>
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
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



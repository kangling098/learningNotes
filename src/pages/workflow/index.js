import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import Filter from '@/components/Filters/SimpleFilter'
import List from './components/List'
import { handleRefreshCreator } from 'utils'
import { message, Modal, Form, Input, Col, Button } from 'antd'
const { Item: FormItem } = Form
const NAMESPACE = 'workflow'

const CreateWorkflowModal = Form.create()(props => {
    const { visible, form, handleAdd, onCancel, loading, onOk, item, modalType, ...otherProps } = props;
    // const okHandle = () => {
    //     form.validateFields((err, fieldsValue) => {
    //         if (err) return;
    //         form.resetFields();
    //         handleAdd(fieldsValue);
    //     });
    // };
    const okHandle = () => {
        form.validateFields((errors, fieldsValue) => {
            if (errors) {
                return
            }
            const data = {
                ...fieldsValue,
                // id: item.id,
            }
            onOk(data)
        })
    }
    return (
        <Modal
            destroyOnClose
            visible={visible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            confirmLoading={loading}
            {...otherProps}
        >
            <Form>
                {form.getFieldDecorator('id', {
                    initialValue: item.id,
                })(<Input type="hidden" />)}
                {modalType === 'create' &&(
                    <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="调用代码">
                        {form.getFieldDecorator('code', {
                            rules: [{ required: true, message: '请填写调用代码！' }],
                            initialValue: item.code,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                )}
               
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
                {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: '请填写名称！' }],
                    initialValue: item.name,
                })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('description', {
                    rules: [{ required: true, message: '请填写描述！' }],
                    initialValue: item.description, 
                })(<Input.TextArea placeholder="请输入" />)}
                </FormItem>
            </Form>
            
        </Modal>
    );
});



const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list, pagination, selectedRowKeys, modalVisible, modalType, currentItem,
    } = modelState

    const options = [
        { key: 'code', value: '调用代码' },
        { key: 'name', value: '工作流名称' },
        { key: 'status', value: '状态' },
    ]
    const handleModalVisible = () => {
        dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
                modalVisible: false,
            },
        });
    };
    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        modalType,
        visible: modalVisible,
        maskClosable: false,
        // confirmLoading: loading.effects[`${NAMESPACE}/remove`],
        title: `${modalType === 'create' ? '工作流添加' : '工作流编辑'}`,
        wrapClassName: 'vertical-center-modal',
        loading: loading.effects[`${NAMESPACE}/${modalType}`],
        onOk (data) {
            dispatch({
                type: `${NAMESPACE}/${modalType}`,
                payload: data,
            })
            .then((data) => {
                if(data.success){
                    message.success(data.Message || `${modalType === 'create' ? '添加' : '编辑'}操作成功`)
                    dispatch({
                        type: `${NAMESPACE}/updateState`,
                        payload: {
                            modalVisible: false,
                        },
                    })
                    handleRefresh()
                }
            })
        },
        onCancel : handleModalVisible,
    }
    const onHandleCreateWorkflowBtnClick = () => {
        dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
                modalType: 'create',
                modalVisible: true,
            },
        })
        // .then(() => {
        //     handleRefresh()
        // })
    }
    
    const filterProps = {
        filter: {
            ...query,
        },
        options,
        createHandle: onHandleCreateWorkflowBtnClick,
        onFilterChange (value) {
            handleRefresh({
                ...value,
                page: 1,
            })
        },
    }
    const listProps = {
        dataSource: list,
        loading: loading.effects[`${NAMESPACE}/query`],
        pagination,
        location,
        dispatch,
        handleRefresh,
        onDeleteItem (id) {
            dispatch({
                type: `${NAMESPACE}/remove`,
                payload: id,
            })
            .then((data)=>{
                if(data.success){
                    handleRefresh({
                        page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
                    })
                }else{
                    message.error(data.Message || '删除操作失败')
                }
            })
        },
        onEditItem (item) {
            dispatch({
                type: `${NAMESPACE}/updateState`,
                payload: {
                    modalType: 'edit',
                    modalVisible: true,
                    currentItem: item,
                },
            })
        },
        rowSelection: {
            selectedRowKeys,
            onChange: (keys) => {
                dispatch({
                    type: `${NAMESPACE}/updateState`,
                    payload: {
                        selectedRowKeys: keys,
                    },
                })
            },
        },
    }
    return (
        <Page inner>
            <Filter { ...filterProps } />
            <List { ...listProps } />
            {
                modalVisible && <CreateWorkflowModal { ...modalProps } />
            }
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
  }
  
export default connect(({[NAMESPACE]:modelState, loading})=>({modelState, loading }))(PageCom)



import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message, Modal, Form, Input, Col, Row, Button, Radio } from 'antd'
import { Page } from 'components'
import Filter from '@/components/Filters/SimpleFilter'
import Sort from '@/components/Sort'
import { handleRefreshCreator, sortDataFormat} from 'utils'
import ContractModal from './components/ContractModal'
import List from './components/List'
const { Item: FormItem } = Form
const { Group: RadioGroup }  = Radio
const NAMESPACE = 'workflowDetail'


const CreateModal = Form.create()(props => {
    const { visible, form, handleAdd, modalType, onCancel, loading, onOk, item, workflow_id, ...otherProps } = props;
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
    const formItemLayout = {
        labelCol:{ span: 5 },
        wrapperCol:{ span: 15 },
    }
    return (
        <Modal
            destroyOnClose
            visible={visible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            loading={loading}
            {...otherProps}
        >
            <Form>
                {modalType === 'create' && form.getFieldDecorator('workflow_id', {
                    initialValue: workflow_id,
                })(<Input type="hidden" />)}
                {modalType === 'edit' && form.getFieldDecorator('id', {
                    initialValue: item.id,
                })(<Input type="hidden" />)}
                <FormItem { ...formItemLayout } label="步骤名称">
                    {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: '请填写步骤名称！' }],
                        initialValue: item.name,
                    })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem { ...formItemLayout } label="允许回退">
                    {form.getFieldDecorator('is_allow_back',{
                        rules: [{ required: true, message: '请选择是否允许允许回退！' }],
                        initialValue: item.is_allow_back || 0,

                    })(
                        <RadioGroup>
                            <Radio value={0}>不允许</Radio>
                            <Radio value={1}>允许</Radio>
                        </RadioGroup>
                    )}
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
        sortVisible, list, pagination, selectedRowKeys, modalVisible,  modalType, currentItem, contractModalItem,
    } = modelState
    // 创建工作流步骤
    const onHandleCreateBtnClick = () => {
        dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
                modalType: 'create',
                modalVisible: true,
            },
        })
    }
    // 删除工作流步骤
    const onDeleteItem = (id) => {
        dispatch({
            type: `${NAMESPACE}/remove`,
            payload: id,
        })
        .then((data)=>{
            if(data.success){
                message.success(data.Message || '删除操作成功')
                handleRefresh({
                })
            }else{
                message.error(data.Message || '删除操作失败')
            }
        })
    }
    // 工作流弹窗隐藏
    const handleModalVisible = () => {
        dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
                modalVisible: false,
                currentItem: {},
            },
        });
    };
    // 工作流步骤添加修改
    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        modalType,
        visible: modalVisible,
        maskClosable: false,
        workflow_id: props.match.params.id,
        title: `${modalType === 'create' ? '创建工作流步骤' : '编辑工作流步骤'}`,
        wrapClassName: 'vertical-center-modal',
        confirmLoading: loading.effects[`${NAMESPACE}/${modalType}`],
        onOk (data) { // 修改工作流步骤
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
    const sortHandler = () => {
        dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
                sortVisible: true,
            },
        })
    }
    const sortProps = {
        visible: sortVisible,
        maskClosable: false,
        title: '工作流步骤排序',
        data: sortDataFormat(list),
        // types: [{value: 'soft', text: '软件'}, {value: 'api', text: 'API'}],
        confirmLoading: loading.effects[`${NAMESPACE}/workflowSort`],
        wrapClassName: 'vertical-center-modal',
        onOk (data) {
            dispatch({
                type: `${NAMESPACE}/workflowSort`,
                payload: {
                    ids: data.map(val=>val.id),
                    workflow_id: props.match.params.id,
                },
            }).then(res => {
                if(res && res.success) {
                    dispatch({
                        type: `${NAMESPACE}/updateState`,
                        payload: {
                            sortVisible: false,
                        },
                    })
                    message.success(data.Message || '操作成功')
                    handleRefresh()
                }
            })
        },
        onCancel () {
            dispatch({
                type: `${NAMESPACE}/updateState`,
                payload: {
                    sortVisible: false,
                },
            })
        },
    }




    // 关联人员弹窗属性
    const contractModalProps = {
        item: contractModalItem,
        modalType,
        visible: modalVisible,
        maskClosable: false,
        title: `关联人员`,
        wrapClassName: 'vertical-center-modal',
        loading: loading.effects[`${NAMESPACE}/${modalType}`],
        onOk (data) { // 修改工作流步骤
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
    // 列表属性
    const listProps = {
        dataSource: list,
        loading: loading.effects[`${NAMESPACE}/query`],
        pagination,
        location,
        dispatch,
        handleRefresh,
        onDeleteItem,
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
        // 关联人员点击操作
        onContractClick (item) {
            dispatch({
                type: `${NAMESPACE}/updateState`,
                payload: {
                    modalType: 'contract',
                    modalVisible: true,
                    contractModalItem: item,
                },
            })
        },
    }
    return (
        <Page inner>
            <Row gutter={24}>
                <Col style={{marginBottom: 16}} xl={{ span: 2 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div className="flex-vertical-center">
                            <Button type="ghost" style={{marginRight: 16}} onClick={onHandleCreateBtnClick}>新建</Button>
                            <Button type="ghost" onClick={sortHandler}>排序</Button>
                        </div>
                    </div>
                </Col>
                </Row>
            <List { ...listProps } />
            {
                modalVisible && ( modalType === 'create' || modalType === 'edit' ) && <CreateModal { ...modalProps } />
            }
            {
                modalVisible && modalType === 'contract' && <ContractModal { ...contractModalProps } />
            }
            {
                sortVisible && <Sort {...sortProps} />
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



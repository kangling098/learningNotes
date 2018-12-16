import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message, Modal, Form, Input, Card, Col, Select, Row, Button, Radio, Timeline, Icon } from 'antd'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import Filter from '@/components/Filters/SimpleFilter'
import { handleRefreshCreator, sortDataFormat} from 'utils'
import { auditStatusMap, auditResultMap, userTypeMap, logAuditResultMap  } from '../../util'
const { Item: FormItem } = Form
const { Group: RadioGroup }  = Radio
const { Description } = DescriptionList
const { Meta } = Card
const { Option } = Select
const { TextArea } = Input

const NAMESPACE = 'approveDetail'

const FormInner = (props) => {
    const formItemLayout = {
        labelCol:{ span: 2 },
        wrapperCol:{ span: 10 },
    }
    const {form, handleSubmit, current_step} = props
    return (
        <Form onSubmit={(e)=>{
            e.preventDefault()
            props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    handleSubmit(values)
                }
            })
        }}>
            {form.getFieldDecorator('id', {
                initialValue: props.id,
            })(<Input type="hidden" />)}
            
            <FormItem { ...formItemLayout } label="审核结果">
                {form.getFieldDecorator('result',{
                    rules: [{ required: true, message: '请选择审核结果！' }],
                    initialValue: 1,
                })(
                    <RadioGroup>
                        <Radio value={1}>通过</Radio>
                        <Radio value={-1}>拒绝</Radio>
                        {
                            current_step && current_step.is_allow_back == 1 && (
                                <Radio value={-2}>回退</Radio>
                            )
                        }
                        
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem { ...formItemLayout } label="审核备注">
                {form.getFieldDecorator('notice', {
                    rules: [{ required: true, message: '请填写审核备注！' }],
                })(<Input.TextArea placeholder="请输入" />)}
            </FormItem>
            <FormItem { ...formItemLayout } label="审核">
                <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
                </Button>
            </FormItem>
        </Form>
    )
}
const WrappedForm = Form.create()(FormInner)
const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        data, currentItem, 
    } = modelState
    // 列表属性
    return (
        <Page inner>
            <Card bordered={true} title="基本信息">
                <DescriptionList col={3}>
                    <Description term="审核类别">{data.workflow_name}</Description>
                    <Description term="发起人类型">
                        {
                            data.user_type !== undefined && (
                                <span>{userTypeMap[data.user_type]['text']}</span>
                            )
                        }
                    </Description>
                    <Description term="发起人">
                        {data.user_name}
                    </Description>
                    <Description term="审核状态">
                        {
                            data.audit_status !== undefined && (
                                <span style={{color:auditStatusMap[data.audit_status]['color']}}>{auditStatusMap[data.audit_status]['text']}</span>
                            )
                        }
                    </Description>
                    <Description term="审核结果">
                        {
                            data.audit_result !== undefined && (
                                <span style={{color:auditResultMap[data.audit_result]['color']}}>{auditResultMap[data.audit_result]['text']}</span>
                            )
                        }
                    </Description>
                    <Description term="审核人">{data.member_name}</Description>
                </DescriptionList>
            </Card>
            <Card bordered={true} title="流程" >
                <Timeline style={{paddingTop: 10}}>
                    {
                        data.step_list.map(item=>(
                            <Timeline.Item key={item.name}>
                                {item.name} <span style={{color: item.audit_result ? (item.audit_result == 1 ? 'green' : 'red') : 'blue'}}>{item.result}</span>
                                <p style={{marginTop: 5, marginBottom: 0}}>{item.audit_user_name}：{item.audit_note} <span stye={{color: 'gray'}}>{item.audit_time}</span></p>
                            </Timeline.Item>
                        ))
                    }
                </Timeline>
            </Card>
            {
                data.permission == 1 && (
                    <Card bordered={true} title="审核" >
                        <WrappedForm 
                            { ...data }
                            handleSubmit={(data) => {
                                dispatch({
                                    type: `${NAMESPACE}/approveSubmit`,
                                    payload: data,
                                }).then((data)=>{
                                    if(data.success){
                                        handleRefresh()
                                    }
                                })
                            }}
                        />
                    </Card>
                )
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



import React from 'react'
import { Card, Button, Form, Modal, Input } from 'antd'
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import UserInfo from '@/components/UserInfo'

const { Description } = DescriptionList
const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const Detail = ({
  dispatch,
  loading,
  feedback,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const { currentItem, handleVisible } = feedback

  const handleShow = () => {
    dispatch({
      type: 'feedback/getSuccess',
      payload: {
        handleVisible: true,
      },
    })
  }
  const handleOpt = {
    title: '标记已处理',
    visible: handleVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading.effects[`feedback/solve`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          feedback_id: currentItem.id,
        }
        dispatch({
          type: 'feedback/solve',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            dispatch({
              type: 'feedback/queryDetail',
              payload: {
                feedback_id: currentItem.id,
              }
            })
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'feedback/getSuccess',
        payload: {
          handleVisible: false,
        },
      })
    },
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3}>
          <Description term="解决方案">{currentItem.title}</Description>
          <Description term="会员ID"><UserInfo id={currentItem.user_id} /></Description>
          <Description term="是否处理">
            {
              currentItem.is_handle ? (
                <span style={{color: 'green'}}>已处理</span>
              ) : (
                <span style={{color: 'red'}}>未处理</span>
              )
            }
          </Description>
          <Description term="提交时间">{currentItem.create_time}</Description>
          <Description term="处理时间">{currentItem.handle_time}</Description>
          <Description term="处理人">{currentItem.handle_name || '-'}</Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop: 20}}>
          <Description term="反馈内容">
            {currentItem.content}
          </Description>
        </DescriptionList>
        {
          currentItem.handle_remark ? (
            <DescriptionList col={1} style={{marginTop: 20}}>
              <Description term="处理备注">{currentItem.handle_remark}</Description>
            </DescriptionList>
            ) : null
        }
        {
          currentItem.is_handle == 0 ? (
            <DescriptionList col={1} style={{marginTop: 20}}>
              <Description term="操作">
                <Button type="danger" onClick={handleShow}>标记为已处理</Button>
              </Description>
            </DescriptionList>
          ) : null
        }
      </Card>
      {
        handleVisible ? (
          <Modal {...handleOpt}>
            <Form layout="horizontal">
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remark', {
                    rules: [
                      {
                        required: true,
                        message: '备注必须填写',
                      },
                    ],
                  })(<TextArea rows={4} />)}
              </FormItem>
            </Form>
          </Modal>
        ) : null
      }
    </Page>
    )
}

export default connect(({ feedback, loading }) => ({ feedback, loading }))(Form.create()(Detail))

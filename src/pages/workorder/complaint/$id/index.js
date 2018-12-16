import React from 'react'
import { Card, Button, Form, Modal, Input } from 'antd'
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import { typeMap, statusMap } from '../util'
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
  complaint,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const { currentItem, handleVisible } = complaint

  const handleShow = () => {
    dispatch({
      type: 'complaint/getSuccess',
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
    confirmLoading: loading.effects[`complaint/solve`],
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.id,
        }
        dispatch({
          type: 'complaint/solve',
          payload: {
            ...data,
          },
        }).then(res => {
          if(res && res.success) {
            dispatch({
              type: 'complaint/queryDetail',
              payload: {
                id: currentItem.id,
              }
            })
          }
        })
      })
    },
    onCancel () {
      dispatch({
        type: 'complaint/getSuccess',
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
          <Description term="类别">{typeMap[currentItem.type]}</Description>
          <Description term="会员ID">
            <UserInfo id={currentItem.user_id} />
          </Description>
          <Description term="状态"><span style={{color: statusMap[currentItem.status || 2].color}}>{statusMap[currentItem.status || 2].text}</span></Description>
          <Description term="工单标题">
            <Link to={`/workorder/list/${currentItem.workorder_id}`}>{currentItem.workorder_title}</Link>
          </Description>
          <Description term="提交时间">{currentItem.create_time}</Description>
          {
            currentItem.status == 2 ? (
              <Description term="完成时间">{currentItem.handle_time} ({currentItem.handle_admin_name})</Description>
            ) : null
          }
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop: 20}}>
          <Description term="投诉内容">
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
          currentItem.status == 1 ? (
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

export default connect(({ complaint, loading }) => ({ complaint, loading }))(Form.create()(Detail))

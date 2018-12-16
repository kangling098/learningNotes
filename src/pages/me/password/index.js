import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
}

const Password = ({
  location, dispatch, me, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const { saving } = me

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      dispatch({
        type: 'me/changePassword',
        payload: {
          ...data,
        }
      })
    })
  }

  return (
    <Page inner>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} hasFeedback label="原密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '原密码必须填写',
              },
            ],
          })(
            <Input type="password" placeholder="原登录密码" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback label="新密码">
          {getFieldDecorator('new_password', {
            rules: [
              {
                required: true,
                message: '新密码必须填写',
              },
            ],
          })(
            <Input type="password" placeholder="新登录密码" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback label="确认新密码">
          {getFieldDecorator('new_password2', {
            rules: [
              {
                required: true,
                message: '新密码必须填写',
              },
            ],
          })(
            <Input type="password" placeholder="新登录密码" />
          )}
        </FormItem>
        <FormItem wrapperCol={{xs: {offset: 4}}}>
          <Button type="primary" onClick={handleOk} loading={saving}>保存</Button>
        </FormItem>
      </Form>
    </Page>
  )
}

export default connect(({ me, loading }) => ({ me, loading }))(Form.create()(Password))

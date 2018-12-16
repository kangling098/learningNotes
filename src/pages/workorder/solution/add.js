import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Input, Button, TreeSelect, Radio, Row, Col, } from 'antd'
import { routerRedux } from 'dva/router'
import MarkDown from '@/components/Editor/Markdown'
import { arrayToTreeData } from 'utils'

const { TextArea } = Input
const RadioGroup = Radio.Group

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
}

let markdown = ''

const Add = ({
  location, dispatch, solution, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const {
    saving, currentItem, workorderClass,
  } = solution

  const classParent = {
    treeData: arrayToTreeData(workorderClass),
    treeDefaultExpandAll: true,
    placeholder: "选择工单分类",
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.id,
        content: markdown,
      }
      dispatch({
        type: 'solution/create',
        payload: {
          ...data,
        },
      }).then(res => {
        if(res && res.success) {
          dispatch(routerRedux.push({
            pathname: '/workorder/solution'
          }))
        }
      })
    })
  }


  const handleChange = value => {
    markdown = value
  }

  return (
    <Page inner>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} hasFeedback label="工单分类">
          {getFieldDecorator('class_id', {
            initialValue: currentItem.class_id,
            rules: [
              {
                required: true,
                message: '工单分类必须选择',
              },
            ],
          })(
            <TreeSelect {...classParent} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback label="方案标题">
          {getFieldDecorator('title', {
            initialValue: currentItem.title,
            rules: [
              {
                required: true,
                message: '方案标题必须填写',
              },
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: currentItem.id ? currentItem.status : 1,
          })(
            <RadioGroup>
              <Radio value={1}>显示</Radio>
              <Radio value={0}>隐藏</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <Row gutter={24} style={{padding: 24, paddingLeft: 12}}>
          <Col xl={{ span: 4 }} md={{ span: 4 }} style={{textAlign: 'right', paddingRight: 0}}>
            <div className="ant-form-item-label"><label title="内容">内容</label></div>
          </Col>
          <Col xl={{ span: 18 }} md={{ span: 18 }} style={{paddingLeft: 0}}>
            <MarkDown handleChange={handleChange} initialValue={currentItem.content}  />
          </Col>
        </Row>
        <FormItem wrapperCol={{xs: {offset: 4}}}>
          <Button type="primary" onClick={handleOk} loading={saving}>保存</Button>
        </FormItem>
      </Form>
    </Page>
  )
}

export default connect(({ solution, loading }) => ({ solution, loading }))(Form.create()(Add))

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Select, Spin } from 'antd'
import { getFieldValue } from 'utils'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  onOk,
  currentItem,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.data.id,
      }
      data.keyword_list = getFieldValue(data.keyword, 'key')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const { keywordSource, onSearch, fetching } = modalProps

  const getDefaultKey = arr => {
    const defaultKey = []
    if(arr.length) {
      arr.map(item => {
        defaultKey.push({
          key: item,
          value: item,
        })
      })
    }
    return defaultKey
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="关键词" hasFeedback extra="关键词最多设置5个" {...formItemLayout}>
        {getFieldDecorator('keyword', {
            initialValue: getDefaultKey(currentItem.data.keyword),
            rules: [
              {
                required: true,
                message: '关键词必须填写',
              },
            ],
          })(
            <Select
              mode="multiple"
              labelInValue
              placeholder="设置关键词"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={onSearch}
            >
              {keywordSource.map(d => <Option key={d.keyword}>{d.keyword}</Option>)}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  onOk: PropTypes.func,
}

export default Form.create()(modal)

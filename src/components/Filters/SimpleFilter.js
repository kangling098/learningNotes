import React from 'react'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const Option = Select.Option
const FormItem = Form.Item
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Filter = ({
  filter,
  createHandle,
  createText,
  onFilterChange,
  options,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const defaultType = options[0].key
  const { search_type =  defaultType, keyword } = filter

  const typeSelector = getFieldDecorator('search_type', {
    initialValue: search_type,
  })(
    <Select style={{width: 100}}>
      {
        options.map(item => {
          return <Option value={item.key} key={item.key}>{item.value}</Option>
        })
      }
    </Select>
  );

  const onSearch = () => {
    let fields = getFieldsValue()
    if(!fields.keyword) {
      fields.search_type = undefined
      fields.keyword = undefined
    }
    onFilterChange(fields)
  }

  return (
    <Form>
      <Row gutter={24}>
        {
          createHandle ? (
            <Col {...ColProps} xl={{ span: 2 }} md={{ span: 2 }}>
              <FormItem {...formItemStyle}>
                <Button type="ghost" onClick={createHandle}>{createText || '新增'}</Button>
              </FormItem>
            </Col>
          ) : null
        }
        <Col {...ColProps} xl={{ span: 9 }} md={{ span: 14 }}>
          <FormItem {...formItemStyle}>
            {getFieldDecorator('keyword', {
              initialValue: keyword,
            })(
              <Search
                placeholder="关键词"
                addonBefore={typeSelector}
                enterButton="搜索"
                onSearch={onSearch}
              />
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

Filter.propTypes = {
  
}

export default Form.create()(Filter)

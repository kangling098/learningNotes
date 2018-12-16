import React from 'react'
import { Form, Button, Row, Col, Input, Select, DatePicker, Popconfirm } from 'antd'
import moment from 'moment'

const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const ColProps = {
  xs: 24,
  sm: 12,
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Filter = ({
  onFilterChange,
  filter,
  options,
  createHandle,
  showBatchStateModal,
  showBatchTypeModal,
  onDeleteItem,
  selectedRowKeys,
  datePlaceHolder,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const defaultType = options[0].key
  const initialCreateTime = []
  let { search_type =  defaultType, keyword, s_time, e_time } = filter
  const handleFields = (fields) => {
    const { time } = fields
    if (time && time.length) {
      fields.s_time = time[0].format('YYYY-MM-DD')
      fields.e_time = time[1].format('YYYY-MM-DD')
      delete fields.time
    }else {
      fields.s_time = undefined
      fields.e_time = undefined
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
    setFieldsValue({
      search_type: search_type,
    })
  }
  
  if(s_time) {
    initialCreateTime[0] = moment(s_time)
  }
  if(e_time) {
    initialCreateTime[1] = moment(e_time)
  }

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


  return (
    <Form layout="inline">
      <Row gutter={10} style={{marginBottom:'15px'}} type="flex" justify="space-between">
        <Col span={24}>
        <FormItem {...formItemStyle}>
          <Button className="margin-right" type="ghost" onClick={createHandle}>新增</Button>
          <Popconfirm title={`是否确认删除选中的文章？`} placement="left" onConfirm={(e)=>{
            onDeleteItem({id: selectedRowKeys.join(",")}, e)
          }}>
          <Button className="margin-right" type="ghost" disabled={selectedRowKeys.length > 0 ? false : true}>批量删除</Button>
                  </Popconfirm>
          
          <Button className="margin-right" type="ghost" disabled={selectedRowKeys.length > 0 ? false : true} onClick={(e)=>{
            showBatchTypeModal(e);
          }}> 批量修改分类</Button>
          <Button type="ghost" disabled={selectedRowKeys.length > 0 ? false : true} onClick={(e)=>{
              showBatchStateModal(e);
          }}>批量设置状态</Button>
        </FormItem>
        <FormItem {...formItemStyle}>
              {getFieldDecorator('keyword', {
                initialValue: keyword,
              })(
                <Input addonBefore={typeSelector} style={{width: '300px'}} placeholder="关键词" />
              )}
            </FormItem>
            <FormItem {...formItemStyle}>
              {getFieldDecorator('time', {
                initialValue: initialCreateTime,
              })(
                <RangePicker placeholder={datePlaceHolder ||  ['开始日期', '结束日期']} />
              )}
            </FormItem>
            <FormItem {...formItemStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div>
                  <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
                  <Button onClick={handleReset}>重置</Button>
                </div>
              </div>
            </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

Filter.propTypes = {
  
}

export default Form.create()(Filter)

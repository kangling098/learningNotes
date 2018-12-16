import React from 'react'
import { DatePicker, Radio } from 'antd'

const { RangePicker } = DatePicker

const dateFormat = 'YYYY-MM-DD'

export default class Interval extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 1,
      s_time: '',
      e_time: '',
    }
  }
  typeOnChange = e => {
    const type = e.target.value
    this.setState({
      type: type,
    }, () => {
      this.props.onChange(this.state)
    })
  }
  onChange = (date, dateString) => {
    if(dateString && dateString.length) {
      this.setState({
        type: 6,
        s_time: dateString[0],
        e_time: dateString[1],
      })
    }
  }
  onOk = value => {
    this.props.onChange(this.state)
  }
  render() {
    return (
      <div>
        <Radio.Group value={this.state.type} onChange={this.typeOnChange}>
          <Radio.Button value={1}>今天</Radio.Button>
          <Radio.Button value={2}>昨天</Radio.Button>
          <Radio.Button value={3}>7天内</Radio.Button>
          <Radio.Button value={4}>30天内</Radio.Button>
          <Radio.Button value={5}>本年度</Radio.Button>
        </Radio.Group>
        <span style={{marginLeft: 10, marginRight: 10,}}>自定义</span>
        <RangePicker
          format={dateFormat}
          placeholder={['开始时间', '结束时间']}
          onChange={this.onChange}
          onOk={this.onOk}
        />
      </div>
    )
  }
}

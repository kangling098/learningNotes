import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class Financechart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { timestamp, income, recharge, refund } = this.props.data
    const option = {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        left: 'center',
        bottom: '0',
        data:['营收','充值','退款']
      },
      grid: {
        top: 10,
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : timestamp
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'营收',
          type:'line',
          areaStyle: {},
          data: income
        },
        {
          name:'充值',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data: recharge
        },
        {
          name:'退款',
          type:'line',
          areaStyle: {},
          data: refund
        },
      ]
    }
    return (
      <ReactEcharts
        option={option}
        style={{ height: '350px', width: '100%' }}
        className="react_for_echarts"
        theme="macarons"
      />
    )
  }
}
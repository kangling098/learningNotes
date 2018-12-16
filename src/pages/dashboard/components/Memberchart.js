import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class Memberchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { timestamp, register, active, transfer  } = this.props.data
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
        data:['注册量','活跃数','转换量']
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
          data : timestamp,
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'注册量',
          type:'line',
          areaStyle: {},
          data: register,
        },
        {
          name:'活跃数',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data: active,
        },
        {
          name:'转换量',
          type:'line',
          areaStyle: {},
          data: transfer,
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
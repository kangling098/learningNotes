import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class Otherchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    const data = this.props.data
    const legend = [], series = []
    for(let item in data) {
      legend.push(item)
      series.push({
        value: data[item],
        name: item
      })
    }
    const that = this
    const option = {
      title : {
        text: that.props.title,
        subtext: that.props.subtext,
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //   bottom: 10,
      //   left: 'center',
      //   data: legend
      // },
      grid: {
        top: 10,
      },
      series : [
        {
          name: '总量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data: series,
          itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
        }
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
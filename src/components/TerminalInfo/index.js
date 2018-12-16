import React from 'react'
import { Modal, Spin } from 'antd'
import { config, request } from 'utils'
import Link from 'umi/link'
import styles from './index.less'

export default class TerminalInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      infoVisible: false,
      loading: true,
      terminalData: {
        "id": 0, //终端ID
        "status": 0, // 状态
        "system": "-", //操作系统
        "browser": "-",//浏览器
        "user_agent": "",
        "from_ip": "",//IP
        "info_hash": "",
        "screen": "",//分辨率
        "visit_count": 1,//访问总数
        "create_time": "", //首次访问时间
        "modified_time": "",//最后访问时间
        "address": "",//地址
        "user_count":0,//终端会员数
      },
    }
  }
  showUserInfo = () => {
    if(this.state.terminalData.id) {
      this.setState({
        infoVisible: true,
      })
      return false
    }
    const id = this.props.id
    const that= this
    request({
      url: `${config.APIV1}/terminal_detail`,
      data: {
        id,
      },
    }).then(res => {
      if(res && res.success) {
        const data = res.Data
        that.setState({
          loading: false,
          terminalData: {
            ...data,
          },
        })
      }
    })
    this.setState({
      infoVisible: true,
    })
  }
  hideUserInfo = () => {
    this.setState({
      infoVisible: false,
    })
  }
  render () {
    return (
      <div className={styles.main}>
        <span onClick={this.showUserInfo}>{this.props.children || this.props.id}</span>
        {
          this.state.infoVisible ? (
            <Modal
              title="终端信息"
              maskClosable={false}
              visible={this.state.infoVisible}
              onCancel={this.hideUserInfo}
              footer={null}
            >
              <Spin spinning={this.state.loading}>
                <div className={styles.moreInfo}><span>终端ID</span>{this.state.terminalData.id}</div>
                <div className={styles.moreInfo}><span>操作系统</span>{this.state.terminalData.system}</div>
                <div className={styles.moreInfo}><span>浏览器</span>{this.state.terminalData.browser}</div>
                <div className={styles.moreInfo}><span>分辨率</span>{this.state.terminalData.screen}</div>
                <div className={styles.moreInfo}><span>IP</span>{this.state.terminalData.from_ip}</div>
                <div className={styles.moreInfo}><span>地址</span>{this.state.terminalData.address}</div>
                <div className={styles.moreInfo}><span>访问总数</span>{this.state.terminalData.visit_count}</div>
                <div className={styles.moreInfo}><span>终端会员统计</span>共 {this.state.terminalData.user_count} 个</div>
                <div className={styles.moreInfo}><span>首次访问时间</span>{this.state.terminalData.create_time}</div>
                <div className={styles.moreInfo}><span>最后访问时间</span>{this.state.terminalData.modified_time}</div>
              </Spin>
            </Modal>
          ) : null
        }
      </div>
    )
  }
}


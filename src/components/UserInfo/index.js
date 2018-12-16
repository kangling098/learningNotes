import React from 'react'
import { Modal, Spin } from 'antd'
import { config, request } from 'utils'
import Link from 'umi/link'
import { typeMap, statusMap, lockMap, onlineMap } from '@/pages/user/util'
import styles from './index.less'

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoVisible: false,
      loading: true,
      userData: {
        id: '',
        nick_name: '',
        mobile: '',
        qq: '',
        stauts: 1,
        is_lock: 0,
        is_online: 0,
      }
    }
  }
  showUserInfo = () => {
    if(this.state.userData.id) {
      this.setState({
        infoVisible: true,
      })
      return false
    }
    const id = this.props.id
    const that= this
    request({
      url: `${config.APIV1}/user_detail`,
      data: {
        id,
      }
    }).then(res => {
      if(res && res.success) {
        const data = res.Data
        that.setState({
          loading: false,
          userData: {
            ...data,
          }
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
  render() {
    return (
      <div className={styles.main}>
        <span onClick={this.showUserInfo}>{this.props.children || this.props.id}</span>
        {
          this.state.infoVisible ? (
            <Modal
              title="会员信息"
              maskClosable={false}
              visible={this.state.infoVisible}
              onCancel={this.hideUserInfo}
              footer={null}
            >
              <Spin spinning={this.state.loading}>
                <div className={styles.moreInfo}><span>会员ID</span>
                  <Link to={`/user/detail/${this.state.userData.id}`}>{this.state.userData.id}</Link>
                </div>
                <div className={styles.moreInfo}><span>姓名</span>{this.state.userData.nick_name}</div>
                <div className={styles.moreInfo}><span>手机</span>{this.state.userData.mobile}</div>
                <div className={styles.moreInfo}><span>QQ</span>{this.state.userData.qq}</div>
                <div className={styles.moreInfo}><span>状态</span>
                  {
                    statusMap(this.state.userData.status)
                  }
                </div>
                <div className={styles.moreInfo}><span>是否锁定</span>
                  {
                    lockMap(this.state.userData.lock_status)
                  }
                </div>
                <div className={styles.moreInfo}><span>是否在线</span>
                  {
                    onlineMap(this.state.userData.online_status)
                  }
                </div>
              </Spin>
            </Modal>
          ) : null
        }
      </div>
    )
  }
}


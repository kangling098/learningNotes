import React from 'react'
import { connect } from 'dva'
import { Form, Card, Row, Col } from 'antd'
import { Page } from 'components'
import Link from 'umi/link'

import Interval from './components/Interval'
import Memberchart from './components/Memberchart'
import Financechart from './components/Financechart'
import Otherchart from './components/Otherchart'
import styles from './index.less'

const Dashboard = ({
  app, dispatch, dashboard,
}) => {

  const { mainData, userTotal, financeTotal, numTotal, keywordTotal, areaTotal, systemTotal } = dashboard

  const { user } = app

  const memberChange = obj => {
    dispatch({
      type: 'dashboard/userTotal',
      payload: {
        ...obj,
      }
    })
  }

  const financeChange = obj => {
    dispatch({
      type: 'dashboard/financeTotal',
      payload: {
        ...obj,
      }
    })
  }
  
  return (
    <Page>
      <Row gutter={24}>
        <Col span={8}>
          <Card
            title="个人信息"
            extra={<Link to="/">修改密码</Link>}
            headStyle={{paddingLeft: 15, paddingRight: 15,}}
            bodyStyle={{paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 5,}}
          >
            <p className={styles.infoList}><span>管理ID</span>{user.id}</p>
            <p className={styles.infoList}><span>角色</span>{user.role && user.role.length && user.role[0].name}</p>
            <p className={styles.infoList}><span>姓名</span>{user.username}</p>
            <p className={styles.infoList}><span>上次登录时间</span>{user.last_login_time}</p>
            <p className={styles.infoList}><span>上次登录地点</span>{user.last_login_area} {
              user.login_status ? (
                <em style={{color: 'green', fontStyle: "normal"}}>[正常]</em>
              ) : (
                <em style={{color: 'red', fontStyle: "normal"}}>[异常]</em>
              )
            }</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="通知公告"
            extra={<Link to="/">查看全部</Link>}
            headStyle={{paddingLeft: 15, paddingRight: 15,}}
            bodyStyle={{paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 5,}}
          >
            {
              mainData.notice && mainData.notice.map((item, index) => {
                return <p className={styles.infoList} key={item.publish_time + index}><span>{item.publish_time}</span><Link to="/">{item.title}</Link></p>
              })
            }
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="待处理事宜"
            extra={<Link to="/">查看全部</Link>}
            headStyle={{paddingLeft: 15, paddingRight: 15,}}
            bodyStyle={{paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 5,}}
          >
            <p className={styles.infoList}><span>2018-11-22 10:10:12</span><Link to="/">束带结发红色经典范进范进书法家收到货</Link></p>
            <p className={styles.infoList}><span>2018-11-22 10:10:12</span><Link to="/">束带结发红色经典范进范进书法家收到货</Link></p>
            <p className={styles.infoList}><span>2018-11-22 10:10:12</span><Link to="/">束带结发红色经典范进范进书法家收到货</Link></p>
            <p className={styles.infoList}><span>2018-11-22 10:10:12</span><Link to="/">束带结发红色经典范进范进书法家收到货</Link></p>
            <p className={styles.infoList}><span>2018-11-22 10:10:12</span><Link to="/">束带结发红色经典范进范进书法家收到货</Link></p>
          </Card>
        </Col>
      </Row>
      <Card bordered={false} title="会员统计" extra={<Interval onChange={memberChange} />} style={{marginTop: 24,}}>
        <Memberchart data={userTotal} />
      </Card>
      <Card bordered={false} title="财务统计" extra={<Interval onChange={financeChange} />} style={{marginTop: 24,}}>
        <Financechart data={financeTotal} />
      </Card>
      <Card bordered={false} title="其他" style={{marginTop: 24,}}>
        <Row gutter={24}>
          <Col span={12}>
            <Otherchart data={numTotal} title="工单数量统计" />
          </Col>
          <Col span={12}>
            <Otherchart data={keywordTotal} title="工单问题统计" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Otherchart data={areaTotal} title="访问统计" subtext="按地区" />
          </Col>
          <Col span={12}>
            <Otherchart data={systemTotal} title="访问统计" subtext="按系统" />
          </Col>
        </Row>
      </Card>
    </Page>
  )
}

Dashboard.propTypes = {
  
}

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Form.create()(Dashboard))

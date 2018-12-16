import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Divider, Button, Row, Col, Popconfirm } from 'antd'
import { Page } from 'components';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'

const NAMESPACE = 'logsSystemDetail';

const { Description } = DescriptionList;
const PageCom = (props) => {
    const {
         location, dispatch, modelState, loading,
    } = props

    const {detailData} = modelState;
    const userTypeMap = {
        1: "系统",
        2: "会员",
        3: "管理",
    }

    return (
        <Page>
            <Card bordered={false} title="系统异常日志">
            <DescriptionList title="基本信息" size="large" style={{ marginBottom: 16 }}>
                <Description term="类型">{detailData.type == 'client' ? '客户端异常' : '服务端异常'}</Description>
                <Description term="报告人">{userTypeMap[detailData.user_id]} [<UserInfo id={detailData.user_id} />]</Description>
                <Description term="创建时间">{detailData.create_time}</Description>
                <Description term="页面URL">{detailData.url || '-'}</Description>
                <Description term="来源页面">{detailData.referrer}</Description>
                <Description term="终端信息"><TerminalInfo id={detailData.terminal_id} /></Description>
            </DescriptionList>
            <DescriptionList col={1} size="large" style={{ marginBottom: 16 }}>
                <Description term="标题">{detailData.title}</Description>
            </DescriptionList>
            <DescriptionList col={1} size="large" style={{ marginBottom: 16 }}>
                <Description term="详细内容">{detailData.message}</Description>
            </DescriptionList>
            </Card>

            
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
}

export default connect(({ [NAMESPACE]:modelState, loading }) => ({ modelState, loading: loading.models[NAMESPACE] }))(PageCom)

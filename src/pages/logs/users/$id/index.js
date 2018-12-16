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

const NAMESPACE = 'logsUsersDetail';

const { Description } = DescriptionList;
const PageCom = (props) => {
    const {
         location, dispatch, modelState, loading,
    } = props

    const {detailData} = modelState;

    // 用于循环content数组的key作为Description的label值
    const getContent = (data) => {
        const arr = []
        for (let key in data) {
            arr.push(<Description key={key} term={key}>{data[key]}</Description>)
        }
        return arr;
    }

    return (
        <Page>
            <Card bordered={false} title="会员操作日志">
            <DescriptionList title="基本信息" size="large" style={{ marginBottom: 32 }}>
                <Description term="会员ID"><UserInfo id={detailData.id} /></Description>
                <Description term="操作对象">{detailData.object_name} <Link to={`/logs/admin/${detailData.object_id}`}>[{detailData.object_id}]</Link></Description>
                <Description term="操作时间">{detailData.modified_time}</Description>
                <Description term="标题">{detailData.title}</Description>
                <Description term="页面URL">{detailData.url || '-'}</Description>
                <Description term="终端信息"><TerminalInfo id={detailData.terminal_id} /></Description>
            </DescriptionList>

            {
                detailData.content && Object.keys(detailData.content).length > 0 ? (
                    <React.Fragment>
                    <Divider style={{ marginBottom: 32 }} />
                    <DescriptionList title="基本信息" size="large" style={{ marginBottom: 32 }}>
                        {getContent(detailData.content)}
                    </DescriptionList>
                    </React.Fragment>
                ) : ""
            }
            </Card>

            
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
}

export default connect(({ [NAMESPACE]:modelState, loading }) => ({ modelState, loading: loading.models[NAMESPACE] }))(PageCom)

import React from 'react'
import { Card, Badge, Table, Divider, Button, Modal } from 'antd';
import { routerRedux } from 'dva/router'
import { Page } from 'components';
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import PropTypes from 'prop-types'
import { connect } from 'dva'
const { Description } = DescriptionList

const Detail = ({ loading, dispatch, address }) => {

  const { currentItem } = address

  const columns = [
    {
      title: '联系人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '固定电话',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <Page>
      <Card bordered={false} title="地址信息详情">
        <DescriptionList>
          <Description term="会员ID">{currentItem.id}</Description>
          <Description term="地址HASH">{currentItem.hash}</Description>
          <Description term="状态">
            {
              currentItem.status ? (
                <span style={{color: 'green'}}>正常</span>
              ) : (
                <span style={{color: 'red'}}>隐藏</span>
              )
            }
          </Description>
          <Description term="联系人姓名">{currentItem.name}</Description>
          <Description term="手机号码">{currentItem.mobile}</Description>
          <Description term="固定电话">{currentItem.tel}</Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop:  20}}>
          <Description term="详细地址">{currentItem.address}</Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="变更历史" style={{marginTop: 24}}>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          dataSource={currentItem.address_history}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </Page>
  )
}

Detail.propTypes = {
  address: PropTypes.object,
}

export default connect(({ address, loading }) => ({ address, loading }))(Detail)

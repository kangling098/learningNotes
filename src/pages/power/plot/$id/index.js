import React from 'react'
import { Card } from 'antd';
import { Page } from 'components';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import PropTypes from 'prop-types'
import { connect } from 'dva'
const { Description } = DescriptionList
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

const Detail = ({ loading, dispatch, plot }) => {

  const { detailData } = plot

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={2}>
          <Description term="名称">{detailData.name}</Description>
          <Description term="创建者">{detailData.admin_name}</Description>
          <Description term="类型">
            {
              detailData.status ? (
                <span style={{color: 'green'}}>正常</span>
              ) : (
                <span style={{color: 'red'}}>禁用</span>
              )
            }
          </Description>
          <Description term="版本">{detailData.version}</Description>
          <Description term="描述">{detailData.remarks}</Description>
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop:  20}}>
            <CodeMirror
              value={detailData.content}
              options={{
                mode: 'javascript',
                json: true,
                theme: 'material',
                lineNumbers: true,
                readOnly: true,
              }}
            />
        </DescriptionList>
      </Card>
    </Page>
  )
}

Detail.propTypes = {
  plot: PropTypes.object,
}

export default connect(({ plot, loading }) => ({ plot, loading }))(Detail)

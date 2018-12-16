import React from 'react'
import { Row, Col } from 'antd'

export default class Divider extends React.Component {
  render() {
    return (
      <Row gutter={24}>
        <Col xl={{ span: 4 }} md={{ span: 4 }} style={{paddingRight: 0, marginTop: 12,marginBottom: 12, textAlign: 'right',}}>
          <h4 style={{fontWeight: 'Bold', color: '#000'}}>{this.props.children}</h4>
        </Col>
        <Col></Col>
      </Row>
    )
  }
}

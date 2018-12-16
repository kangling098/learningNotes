import React from 'react'
import { Form, Radio, Modal, Transfer, Tree } from 'antd'
import { config, request, getFieldValue } from 'utils'

const TreeNode = Tree.TreeNode

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

export default class Authorization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authType: 'plot',
      sourceData: [],
      targetKeys: [],
      resources: [],
      checkedKeys: [],
    }
  }
  componentDidMount() {
    this.getSourceData()
  }
  arrToTree = arr => {
    const results = []
    for(let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if(item.children) {
        results.push({
          key: item.id,
          title: item.name,
          children: this.arrToTree(item.children)
        })
      }else {
        results.push({
          key: item.id,
          title: item.name,
        })
      }
    }
    return results
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />
    })
  }
  getSourceData() {
    const that= this
    request({
      url: `${config.APIV1}/resource_all`,
    }).then(res => {
      if(res && res.success) {
        const data = res.Data
        const policys = data.policy.data.map(item => {
          return {
            key: item.id,
            title: item.name,
          }
        })
        const resources = that.arrToTree(data.resources)
        that.setState({
          sourceData: policys,
          resources: resources,
          targetKeys: getFieldValue(that.props.item.policy, 'id'),
          checkedKeys: getFieldValue(that.props.item.resources, 'id'),
        })
      }
    })
  }
  changeType(e) {
    this.setState({
      authType: e.target.value
    })
  }
  plotHandleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys })
  }
  onCheck = checkedKeys => {
    this.setState({ checkedKeys })
  }
  handleOk = () => {
    this.props.onOk({
      policy_id: this.state.targetKeys,
      resources_id: this.state.checkedKeys,
    })
  }
  render() {
    return (
      <Modal {...this.props} onOk={this.handleOk}>
        <Radio.Group onChange={(e) => this.changeType(e)} defaultValue="plot">
          <Radio.Button value="plot">策略授权</Radio.Button>
          <Radio.Button value="menu">资源授权</Radio.Button>
        </Radio.Group>
        {
          this.state.authType === 'plot' ? (
            <Transfer
              dataSource={this.state.sourceData}
              targetKeys={this.state.targetKeys}
              onChange={this.plotHandleChange}
              render={item => item.title}
              listStyle={{
                marginTop: 20,
              }}
            />
          ) : null
        }
        {
          this.state.authType === 'menu' ? (
            <Tree
              checkable
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
            >
              {this.renderTreeNodes(this.state.resources)}
            </Tree>
          ) : null
        }
      </Modal>
    )
  }
}


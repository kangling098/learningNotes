import React from 'react'
import { Form, Radio, Modal, Transfer, Tree } from 'antd'
import { config, request, getFieldValue } from 'utils'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

const TreeNode = Tree.TreeNode
export default class Authorization extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            authType: 'admin', //['admin','role']
            AdminData: [],
            AdminTargetKeys: [],
            roleData: [],
            roleTargetKeys: [],
        }
    }
    componentDidMount () {
        this.getAdminData()
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
    getAdminData () {
        const that= this
        request({
            url: `${config.APIV1}/admin_role_index`,
        }).then(res => {
            if(res && res.success) {
                const data = res.Data
                const AdminData = data.admin.map(item => {
                    return {
                        key: item.id,
                        title: item.name,
                    }
                })
                const roleData = data.admin.map(item => {
                    return {
                        key: item.id,
                        title: item.name,
                    }
                })
                const AdminTargetKeys = that.props.item.admin_id ? that.props.item.admin_id.split(',') : []
                const roleTargetKeys = that.props.item.role_id ? that.props.item.role_id.split(',') : []
                that.setState({
                    AdminData,
                    roleData,
                    AdminTargetKeys,
                    roleTargetKeys,
                })
            }
        })
    }
    changeType (e) {
        this.setState({
            authType: e.target.value
        })
    }
    adminPlotHandleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ AdminTargetKeys: nextTargetKeys })
    }
    rolePlotHandleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ roleTargetKeys: nextTargetKeys })
    }
    handleOk = () => {
        this.props.onOk({
            admin_id: this.state.AdminTargetKeys.join(','),
            role_id: this.state.roleTargetKeys.join(','),
            id: this.props.item.id,
        })
    }
    render () {
        return (
            <Modal {...this.props} onOk={this.handleOk}>
                <Radio.Group onChange={(e) => this.changeType(e)} defaultValue="plot">
                    <Radio.Button value="admin">管理员</Radio.Button>
                    <Radio.Button value="role">角色</Radio.Button>
                </Radio.Group>
                {
                    this.state.authType === 'admin' ? (
                        <Transfer
                        dataSource={this.state.AdminData}
                        targetKeys={this.state.AdminTargetKeys}
                        onChange={this.adminPlotHandleChange}
                        render={item => item.title}
                        listStyle={{
                            marginTop: 20,
                        }}
                        />
                    ) : null
                }
                {
                    this.state.authType === 'role' ? (
                        <Transfer
                            dataSource={this.state.roleData}
                            targetKeys={this.state.roleTargetKeys}
                            onChange={this.rolePlotHandleChange}
                            render={item => item.title}
                            listStyle={{
                                marginTop: 20,
                            }}
                        />
                    ) : null
                }
            </Modal>
        )
    }
}


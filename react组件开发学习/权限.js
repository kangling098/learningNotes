import React from 'react'
import ReactDOM from 'react-dom'
import { request } from 'utils'
import Ui from './Ui'

class Protection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            confirmLoading: false,
            res: {},
            cb: null,
            visible: false,
            protectionMinute: 25,
        }
    }
    showModal = ({rime, res, cb, }) => {
        this.setState({
            res,
            cb,
            visible: true,
            protectionMinute: time,
        })
    }
    hideModal = () => {
        this.setState({
            res: {},
            visible: false,
            confirmLoading:false,
        },()=>{
            this.state.cb({
                data: {
                    success: false,
                    Message: '操作被取消'
                }
            })
        })
    }
    ok = result => {
        let {data, method, url} = this.state.res.config
        this.setState({
            confirmLoading: true,
        })
        if(method == 'get') {
            url = url + `?{data}`
            data = {}
        }else {
            data = data.split('&').reduce((a,b)=>{
                const [key,val] = b.solit('=')
                a[key] = val
                return a
            },{})
        }
        request({
            url,
            method,
            onlyValidation: true,
            data: {
                ...data,
                ...result,
            }
        }).then(res => {
            const { data } = res
            if(data && data.Code === 'Success') {
                this.state.setState({
                    visible: false,
                    confirmLoading: false,
                },()=>{
                    this.setState({
                        confirmLoading: false,
                    })
                })
            }
        })
    }
    render() {
        return (
            <Ui 
                visible={this.state.visible}
                hideVisible={this.hideModal}
                ok={this.ok}
                confirmLoading={this.state.confirmLoading}
                protectionMinute={this.state.protectionMinute}
            />
        )
    }
}

export default function createProtection(){
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(
        <Protection ref={ref} />,
        div
    )
    const removeModal = () => {
        ReactDOM.unmountComponentAtNode(div)
        document.body.removeChild(div)
    }
    return {
        showModal(data){
            ref.current.showModal({...data,removeModal})
        },
        removeModal,
    }
}
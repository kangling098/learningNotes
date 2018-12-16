import React from 'react'
import { Table, Modal } from 'antd'

const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      render: text => <img alt="avatar" width={24} src={text} />,
    },{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
     {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }
  ]
const List = (props)=>{
    let {dataSource} = props;
    console.log(props)
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            dataSource={dataSource}
            bordered
            scroll={{ x: 1250 }}
            simple
            rowKey={val => val.key}
        />
    )
}
export default List;
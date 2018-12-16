import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Table, Form, Modal, Input } from 'antd'
import Link from 'umi/link'
import Filter from '@/components/Filters/MediumFilter'
import { handleRefreshCreator, listOnChangeCreator, filteredValueCreator } from 'utils'
import UserInfo from '@/components/UserInfo'
import TerminalInfo from '@/components/TerminalInfo'

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
}

const Loginlog = ({
  location, dispatch, loginlog, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const {
    list, isMotion, pagination, modalVisible, currentItem
  } = loginlog

  const { query } = location
  let userId = ''

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const online = currentItem => {
    dispatch({ type: 'loginlog/updateState', payload: { modalVisible: true, currentItem } })
  }

  const modalProps = {
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`loginlog/online`],
    title: `强制下线`,
    wrapClassName: 'vertical-center-modal',
    onOk () {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: currentItem.user_id,
        }
        dispatch({ type: 'loginlog/online', payload: { ...data, } })
      })
    },
    onCancel () {
      dispatch({ type: 'loginlog/updateState', payload: { modalVisible: false, } })
    },
  }

  const tableProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['loginlog/query'],
    location,
    isMotion,
    onChange: onListChange
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: query.order_key === 'id' ? query.order_type : '',
    },
    {
      title: '会员ID',
      dataIndex: 'user_id',
      key: 'user_id',
      render: text => <UserInfo id={text} />,
    },
    {
      title: '终端信息',
      dataIndex: 'terminal_id',
      key: 'terminal_id',
      render: text => <TerminalInfo id={text} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '在线中', value: 1 },
        { text: '已离线', value: 0 },
      ],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        if(text == 1) {
          return <span style={{color: 'green'}}>在线中</span>
        }
        return <span style={{color: 'gray'}}>已离线</span>
      }
    },
    {
      title: '登录时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '退出时间',
      dataIndex: 'loginout_time',
      key: 'loginout_time',
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => {
        if(record.status == 1) {
          return <a onClick={() => online(record)}>下线</a>
        }
        return '-'
      },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  const options = [
    { key: 'user_id', value: '会员ID' },
  ]
  const filterProps = {
    filter: {
      ...query,
    },
    options,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Filter {...filterProps} />
      </div>
      <Table
        {...tableProps}
        columns={columns}
        simple
        rowSelection={null}
        expandAll
        defaultExpandAllRows
        rowKey={record => record.id}
        components={{
          body: { wrapper: isMotion ? AnimateBody : CommonBody },
        }}
      />
      {
        modalVisible ? (
          <Modal {...modalProps}>
            <Form layout="horizontal">
              <FormItem label="备注" hasFeedback {...formItemLayout}>
                {getFieldDecorator('remarks', {
                  rules: [
                    {
                      required: true,
                      message: '备注必须填写',
                    },
                  ],
                })(<TextArea rows={4} />)}
              </FormItem>
            </Form>
          </Modal>
        ) : null
      }
    </Page>
  )
}

Loginlog.propTypes = {
  
}

export default connect(({ loginlog, loading }) => ({ loginlog, loading }))(Form.create()(Loginlog))

import React from 'react'
import { Card, Table, Button, Avatar, Form, Checkbox, Select, Input, Upload, Icon, Modal, Tag } from 'antd'
import ImageZoom from 'react-medium-image-zoom'
import Link from 'umi/link'
import DescriptionList from 'ant-design-pro/lib/DescriptionList'
import { Page } from 'components'
import { connect } from 'dva'
import UserInfo from '@/components/UserInfo'

import { statusMap } from '../../util'
import { normFile, config } from 'utils'
import KeyWordModal from './components/SetKeyWord'
import TypeModal from './components/SetType'

import styles from './index.less'

const { Description } = DescriptionList
const { Meta } = Card
const { Option } = Select
const { TextArea } = Input

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const Detail = ({
  dispatch,
  loading,
  workorderDetail,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  const { keywordModelVisible, keywordSource, fetching, classData, typeModelVisible, infoModelVisible, moreInfo, moreInfoTitle, currentItem, replying, fileList } = workorderDetail

  const columns = [
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '产品类别',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        const statusObj = statusMap[text]
        return <span style={{color: statusObj.color}}>{statusObj.text}</span>
      },
    },
    {
      title: '是否解决',
      dataIndex: 'is_solve',
      key: 'is_solve',
      width: '10%',
      render: text => {
        if(text == 0) {
          return <Tag color="#87d068">未解决</Tag>
        }
        return <Tag color="#f50">已解决</Tag>
      },
    },
    {
      title: '接单人',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },
    {
      title: '提交时间',
      dataIndex: 'order_time',
      key: 'order_time',
    },
    {
      title: '最后更新时间',
      dataIndex: 'reply_time',
      key: 'reply_time',
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => <Link to={`/workorder/list/${record.id}`}>查看</Link>,
    },
  ]

  const transitTitle = (item, index) => {
    return (
      <div className={styles.transitName}>
        <span>{item.admin_name} [{item.show_type == 1 ? '管理' : '会员'}]</span>
        {item.create_time}&nbsp;&nbsp;&nbsp;&nbsp;#{index + 1}
      </div>
    )
  }

  const checkOptions = [
    { label: '管理', value: '1', disabled: true },
    { label: '会员', value: '2' },
  ]

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 12 },
  }

  let timeout = null

  const keywordModalProps = {
    visible: keywordModelVisible,
    keywordSource,
    fetching,
    currentItem,
    maskClosable: false,
    confirmLoading: loading.effects[`workorderDetail/setKeyword`],
    title: "设置关键词",
    width: 600,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'workorderDetail/setKeyword',
        payload: {
          ...data,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'workorderDetail/hideKeywordModal',
      })
    },
    onSearch (keyword) {
      if(keyword) {
        if(timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        timeout = setTimeout(() => {
          dispatch({
            type: 'workorderDetail/setKeywordSource',
            payload: {
              keyword,
            },
          })
        }, 300)
      }
    },
  }

  const typeModalProps = {
    visible: typeModelVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`workorderDetail/setType`],
    classData,
    currentItem,
    title: "移交工单",
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'workorderDetail/setType',
        payload: {
          ...data,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'workorderDetail/hideTypeModal',
      })
    },
  }

  const showKeywordModal = () => {
    dispatch({
      type: 'workorderDetail/showKeywordModal',
    })
  }

  const showTypeModal = () => {
    dispatch({
      type: 'workorderDetail/showTypeModal',
    })
  }

  const infoModalProps = {
    title: moreInfoTitle,
    visible: infoModelVisible,
    onOk (data) {
      dispatch({
        type: 'workorderDetail/hideInfoModal',
      })
    },
    onCancel () {
      dispatch({
        type: 'workorderDetail/hideInfoModal',
      })
    },
  }

  const moreInfoMock = {
    1: {
      title: '客户终端信息',
      data: [
        {
          label: '操作系统',
          value: currentItem.data.system
        },
        {
          label: '浏览器',
          value: currentItem.data.browser
        },
        {
          label: '电脑分辨率',
          value: currentItem.data.screen
        },
        {
          label: '客户端IP',
          value: currentItem.data.from_ip
        },
        {
          label: '终端HASH',
          value: currentItem.data.info_hash
        }
      ],
    },
    2: {
      title: '联系客户信息',
      data: [
        {
          label: '联系人',
          value: currentItem.data.contact_name
        },
        {
          label: '电话',
          value: currentItem.data.contact_tel
        },
        {
          label: '邮箱',
          value: currentItem.data.contact_email
        },
        {
          label: 'QQ',
          value: currentItem.data.contact_qq
        }
      ],
    }
  }

  const showUserInfoModal = index => {
    const data = moreInfoMock[index]
    dispatch({
      type: 'workorderDetail/showInfoModal',
      payload: {
        moreInfo: data.data,
        moreInfoTitle: data.title,
      },
    })
  }

  const receiveOrder = () => {
    Modal.confirm({
      title: '是否接单?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'workorderDetail/receiveOrder',
            payload: {
              resolve,
            },
          })
        })
      },
    })
  }

  const complete = () => {
    Modal.confirm({
      title: '是否完成?',
      okType: 'danger',
      onOk () {
        return new Promise((resolve) => {
          dispatch({
            type: 'workorderDetail/setComplete',
            payload: {
              resolve,
              id: currentItem.data.id,
            },
          })
        })
      },
    })
  }

  const reply = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.data.id,
      }
      dispatch({
        type: 'workorderDetail/reply',
        payload: {
          ...data,
        },
      })
    })
  }

  const handleReply = value => {
    setFieldsValue({
      content: value,
    })
  }

  const statusObj = statusMap[currentItem.data.status] || {}

  const handleChange = info => {
    let fileList = info.fileList
    fileList = fileList.slice(-5)
    dispatch({
      type: 'workorderDetail/getSuccess',
      payload: {
        fileList: fileList,
      },
    })
  }

  return (
    <Page>
      <Card bordered={false} title="基本信息">
        <DescriptionList col={3}>
          <Description term="编号">{currentItem.data.number}</Description>
          <Description term="类别">{currentItem.data.class_name}</Description>
          <Description term="状态">
            <span style={{color: statusObj.color}}>{statusObj.text}</span>
            {
              currentItem.data.is_solve ? (
                <span className={styles.isSolveText} style={{color: '#f50'}}>已解决</span>
              ) : (
                <span className={styles.isSolveText} style={{color: '#87d068'}}>未解决</span>
              )
            }
          </Description>
          <Description term="会员ID"><UserInfo id={currentItem.data.user_id} /></Description>
          <Description term="提交时间">{currentItem.data.create_time}</Description>
          <Description term="最后更新时间">{currentItem.data.modified_time}</Description>
          <Description term="关键词">{currentItem.data.keyword && currentItem.data.keyword.join('、') || '-'}</Description>
          <Description term="客户终端信息"><span className={styles.moreInfoBtn} onClick={() => showUserInfoModal(1)}>查看</span></Description>
          <Description term="联系客户">{currentItem.data.contact_name} ({currentItem.data.contact_tel})<span className={styles.moreInfoBtn} onClick={() => showUserInfoModal(2)}> 更多</span></Description>
          {
            currentItem.data.status == 1 ? null : (
              <Description term="接单人">{currentItem.data.handler}</Description>
            )
          }
          {
            currentItem.data.status == 1 ? null : (
              <Description term="接单时间">{currentItem.data.order_time}</Description>
            )
          }
        </DescriptionList>
        <DescriptionList col={1} style={{marginTop: 20}}>
          <Description term="操作">
            {
              (currentItem.data.status != 2 || currentItem.data.status != 9) ? (
                <Button type="danger" onClick={receiveOrder}>接单</Button>
              ) : null
            }
            <Button type="primary" onClick={showTypeModal} disabled={currentItem.data.status == 1}>移交工单</Button>
            <Button type="primary" onClick={complete} disabled={currentItem.data.status == 1}>标记为已解决</Button>
            <Button type="primary" onClick={showKeywordModal} disabled={currentItem.data.status == 1}>设置关键词</Button>
          </Description>
        </DescriptionList>
      </Card>
      <Card bordered={false} title="历史工单" style={{marginTop: 24}}>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          dataSource={currentItem.history_list}
          columns={columns}
          rowKey={record => record.id}
        />
      </Card>
      <Card title="沟通记录" style={{marginTop: 24}}>
        {
          currentItem.reply_list && currentItem.reply_list.map( (item, index) => {
            return (
              <div className={styles.transit} key={item.id}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={transitTitle(item, index)}
                  description={item.content}
                />
                {
                  item.attachment_url.length ? (
                    <div className={styles.workorderImgs}>
                      {
                        item.attachment_url.map((item, index) => {
                          return <ImageZoom
                                  image={{
                                    src: item,
                                  }}
                                  zoomImage={{
                                    src: item,
                                  }}
                                  key={item + index}
                                />
                        })
                      }
                    </div>
                  ) : null
                }
                {
                  item.user_type == 1 ? (
                    <p className={styles.systemInfo}>系统：{item.privacy}</p>
                  ) : null
                }
              </div>
            )
          })
        }
      </Card>
      {
        currentItem.data.status == 1 ? null : (
          <Card title="工单回复" style={{marginTop: 24, paddingBottom: 100}}>
            <Form layout="horizontal">
              <FormItem label="快捷回复" {...formItemLayout}>
                {getFieldDecorator('quickreply')(
                  <Select onChange={handleReply}>
                    {
                      currentItem.reply_template_list ? (
                        currentItem.reply_template_list.map(item => {
                          return <Option value={item.content} key={item.content}>{item.content}</Option>
                        })
                      ) : null
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem label="内容正文" hasFeedback {...formItemLayout}>
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: '内容正文必须填写',
                    },
                  ],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem label="附件" {...formItemLayout} extra="仅限图片格式：jpg,jpeg,png,gif">
                {getFieldDecorator('attachment_ids', {
                  valuePropName: 'attachment_ids',
                  getValueFromEvent: normFile,
                })(
                  <Upload name="file" action={config.APIV1 + '/upload?type=image'} listType="text" accept=".jpg,.jpeg,.png,.gif" fileList={fileList} onChange={handleChange}>
                    <Button>
                      <Icon type="upload" /> 上传附件
                    </Button>
                  </Upload>
                )}
              </FormItem>
              <FormItem label="可见范围" {...formItemLayout}>
                {getFieldDecorator('show_type', {
                  initialValue: ['1'],
                })(
                  <CheckboxGroup options={checkOptions} />
                )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 2 }}>
                <Button type="primary" onClick={reply} loading={replying}>确定回复</Button>
              </FormItem>
            </Form>
          </Card>
        )
      }
      {keywordModelVisible && <KeyWordModal {...keywordModalProps} />}
      {typeModelVisible && <TypeModal {...typeModalProps} />}
      <Modal {...infoModalProps}>
        {moreInfo.map(d => <p key={d.value + d.label} className={styles.moreInfo}><span>{d.label}</span>{d.value}</p>)}
      </Modal>
    </Page>
    )
}

export default connect(({ workorderDetail, loading }) => ({ workorderDetail, loading }))(Form.create()(Detail))

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Upload, Button, Icon, Switch } from 'antd'
import { config, normFile } from 'utils'

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  item,
  onOk,
  fileList,
  fileList2,
  handleChange,
  handleChange2,
  webCloseChange,
  webClose,
  saving,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        section: 'base',
      }
      onOk(data)
    })
  }

  return (
    <Form>
      <FormItem label="网站名称" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteName', {
          initialValue: item.SiteName,
          rules: [
            {
              required: true,
              message: '网站名称必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="首页标题" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteTitle', {
          initialValue: item.SiteTitle,
          rules: [
            {
              required: true,
              message: '首页标题必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="关键词" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteKeyword', {
          initialValue: item.SiteKeyword,
          rules: [
            {
              required: true,
              message: '关键词必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="描述" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteDescription', {
          initialValue: item.SiteDescription,
          rules: [
            {
              required: true,
              message: '描述必须填写',
            },
          ],
        })(<TextArea rows={4} />)}
      </FormItem>
      <FormItem label="网站域名" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteUrl', {
          initialValue: item.SiteUrl,
          rules: [
            {
              required: true,
              message: '网站域名必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="首页LOGO" {...formItemLayout} extra="仅限图片格式：jpg,jpeg,png,gif">
        {getFieldDecorator('SiteLogo', {
          valuePropName: 'SiteLogo',
          getValueFromEvent: normFile,
        })(
          <Upload name="file" action={config.APIV1 + '/upload?type=image'} listType="picture" accept=".jpg,.jpeg,.png,.gif" fileList={fileList} onChange={handleChange}>
            <Button>
              <Icon type="upload" /> 上传LOGO
            </Button>
          </Upload>
        )}
      </FormItem>
      <FormItem label="会员中心LOGO" {...formItemLayout} extra="仅限图片格式：jpg,jpeg,png,gif">
        {getFieldDecorator('SiteUserCenterLogo', {
          valuePropName: 'SiteUserCenterLogo',
          getValueFromEvent: normFile,
        })(
          <Upload name="file" action={config.APIV1 + '/upload?type=image'} listType="picture" accept=".jpg,.jpeg,.png,.gif" fileList={fileList2} onChange={handleChange2}>
            <Button>
              <Icon type="upload" /> 上传LOGO
            </Button>
          </Upload>
        )}
      </FormItem>
      <FormItem label="是否关闭网站" {...formItemLayout}>
        {getFieldDecorator('SiteIsClose', {
          initialValue: item.SiteIsClose == 1,
          valuePropName: 'checked',
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" onChange={webCloseChange} />
        )}
      </FormItem>
      {
        webClose ? (
          <FormItem label="关闭原因" hasFeedback {...formItemLayout}>
            {getFieldDecorator('SiteCloseReason', {
              initialValue: item.SiteCloseReason,
              rules: [
                {
                  required: true,
                  message: '关闭原因必须填写',
                },
              ],
            })(<Input />)}
          </FormItem>
        ) : null
      }
      <FormItem label="备案信息" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteIcpInfo', {
          initialValue: item.SiteIcpInfo,
          rules: [
            {
              required: true,
              message: '备案信息必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="版权信息" hasFeedback {...formItemLayout}>
        {getFieldDecorator('SiteCopyright', {
          initialValue: item.SiteCopyright,
          rules: [
            {
              required: true,
              message: '版权信息必须填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="统计代码" {...formItemLayout}>
        {getFieldDecorator('SiteStatistics', {
          initialValue: item.SiteStatistics,
        })(<TextArea rows={4} />)}
      </FormItem>
      <FormItem wrapperCol={{xs: {offset: 4}}}>
        <Button type="primary" onClick={handleOk} loading={saving}>立即提交</Button>
      </FormItem>
    </Form>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

import { Tag } from 'antd'

export const typeMap = {
  1: '普通会员',
  2: '合作商'
}

export const statusMap = status => {
  if(status == 1) {
    return <Tag color="#87d068">正常</Tag>
  }
  return <Tag color="#f50">禁用</Tag>
}

export const lockMap = status => {
  if(status == 0) {
    return <Tag color="#87d068">未锁定</Tag>
  }
  return <Tag color="#f50">已锁定</Tag>
}

export const onlineMap = status => {
  if(status) {
    return <Tag color="#87d068">在线</Tag>
  }
  return <Tag color="#f50">未在线</Tag>
}

export const authMap = status => {
  if(status) {
    return <Tag color="#87d068">已实名</Tag>
  }
  return <Tag color="#f50">未实名</Tag>
}

export const lockTypeMap = {
  1: '管理员锁定',
  2: '密码错误次数过多',
  3: '密保错误次数过多',
  4: '密码找回锁定',
}

export const typeMap= {
  '1' : '普通发票',
  '2' : '专用发票',
}
export const issueTypeMap= {
  '1' : '个人',
  '2' : '企业',
}
export const natureTypeMap= {
  '1' : '电子',
  '2' : '纸质',
}
export const statusMap= {
  '-1' : {
      text: '已删除',
      color: 'gray',
  },
  '1' : {
      text: '待审核',
      color: 'blue',
  },
  '2' : {
      text: '审核中',
      color: 'blue',
  },
  '3' : {
    text: '申请成功',
    color: 'green',
  },
  '5' : {
    text: '申请失败',
    color: 'red',
  },
  '9' : {
    text: '已作废',
    color: 'red',
  },
}

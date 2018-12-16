export const rechargeTypes= { // 订单状态映射对象
    'alipay' : '支付宝',
    'weixin' : '微信支付',
    'remittance' : '线下汇款',
}
export const rechargeStatus= { // 订单状态映射对象
    '1' : {
        text: '未完成',
        color: 'gray',
    },
    '2' : {
        text: '充值成功',
        color: 'green',
    },
    '3' : {
        text: '失败或关闭',
        color: 'red',
    },
}

export const orderStatus= { // 订单状态映射对象
    '1' : {
        text: '待支付',
        color: 'gray'
    },
    '2' : {
        text: '已支付',
        color: 'green'
    },
    '3' : {
        text: '已关闭',
        color: 'red'
    },
}
export const orderType= { // 订单类型映射对象
    'product' : '产品订单',
    'service' : '服务订单',
}
export const orderChildType= { // 订单子类型映射对象
    'buy' : '新购',
    'renew' : '续签',
    'service_buy' : '服务购买',
}
export const refundStatus= { // 退款状态映射对象
    '0' : '无法退款',
    '1' : '可退款',
    '2' : '已退款',
}

export const invoiceStatus= { // 退款状态映射对象
    '0' : '无法开票',
    '1' : '可开票',
    '2' : '已开票',
}

export const typeMap = {
    user_soft: '软件',
    user_api: 'API',
    user_api_package: 'API套餐',
}

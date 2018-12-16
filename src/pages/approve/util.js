// 工作流状态
export const statusMap = {
	'-1': {
		value: '-1',
		text: '删除',
		color: 'red',
	},
	'0': {
		value: '0',
		text: '禁用',
		color: 'gray',
	},
	'1': {
		value: '1',
		text: '正常',
		color: 'green',
	},

}
// 审核结果
export const auditStatusMap = {
	'0': {
		value: '0',
		text: '待审核',
		color: 'grey',
	},
	'1': {
		value: '1',
		text: '审核中',
		color: 'orange',
	},
	'2': {
		value: '2',
		text: '已结束',
		color: 'green',
	},
}
// 审核状态
export const auditResultMap = {
	'0': {
		value: '0',
		text: '审核中',
		color: 'orange',
	},
	'1': {
		value: '1',
		text: '通过',
		color: 'green',
	},
	'2': {
		value: '2',
		text: '拒绝',
		color: 'red',
	},
	'3': {
		value: '3',
		text: '撤销',
		color: 'grey',
	},
}
// 日志审核结果
export const logAuditResultMap = {
	'-1': {
		value: '-1',
		text: '拒绝',
		color: 'red',
	},
	'1': {
		value: '1',
		text: '通过',
		color: 'green',
	},
	'-2': {
		value: '-2',
		text: '回退',
		color: 'grey',
	},
}

// 发起人类型
export const userTypeMap = {
	'1': {
		value: '1',
		text: '系统',
	},
	'2': {
		value: '2',
		text: '会员',
	},
	'3': {
		value: '3',
		text: '管理员',
	},
}
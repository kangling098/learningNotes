import axios from 'axios'
import qs from 'qs'
import { getItem, setItem, ZKEYS_TOKEN } from './index'
import { message } from 'antd'
import Protection from '@/components/Protection'

axios.defaults.baseURL = '/'
axios.defaults.timeout = 30000
axios.defaults.transformRequest = [function (data) {
	if(data && data.isFormData) {
		data = data.isFormData
	}else {
		data = qs.stringify(data)
	}
	return data
}]

const safety_ttl =  getItem('safety_ttl')

axios.interceptors.response.use(
	function (res) {
		if(res.data.Code == "JwtSafetyException") {
			return new Promise((resolve, reject) => {
				Protection.showModel(safety_ttl, res, data => {
					resolve(data)
				})
			})
		}else {
			return res
		}
		return res
	},
	function (err) {
		return Promise.reject(err)
	}
)

const fetch = (options) => {
	let {
		method = 'get',
		data,
		url,
	} = options
	switch(method.toLowerCase()) {
		case 'get':
			if(data) {
				return axios.get(`${url}?${qs.stringify(data)}`)
			}else {
				return axios.get(`${url}`)
			}
		case 'post':
      return axios.post(url, data)
    default:
    return axios.post(url, data)
	}
}

export default function request (options) {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + getItem(ZKEYS_TOKEN) || ''
	return fetch(options).then((response) => {
		const { data, headers } = response
		if(headers.refresh_token) {
			setItem(ZKEYS_TOKEN, headers.refresh_token)
		}
		if(data && data.Code === 'Success') {
			data.success = true
		}else {
			data.success = false
			message.error(data.Message || '操作失败')
		}
		if(options.onlyValidation) {
			return response
		}
		return {
			...data,
		}
	}).catch( err => {
		message.error('操作失败')
		return {
			success: false,
			Message: '操作失败',
		}
	})
};
/* eslint-disable */
/* global window */
import cloneDeep from 'lodash.clonedeep'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'

export classnames from 'classnames'
export config from './config'
export request from './request'
export { color } from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL (name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray (array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree (array, id = 'id', pid = 'pid', children = 'children') {
  let data = cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function arrayToTreeData (list) {
  return list.map( item => {
    const common = {
      ...item,
      title: item.name,
      value: item.id,
      key: item.id,
    }
    if(item.children) {
      common.children = arrayToTreeData(item.children)
    }
    return common
  })
}

export const ZKEYS_TOKEN = 'zkeys'

export function getItem (name) {
  return window.localStorage.getItem(`${name}`)
}

export function setItem (name, value) {
  window.localStorage.setItem(`${name}`, value)
}

export function removeItem (name) {
  window.localStorage.removeItem(`${name}`)
}
/**
 * 将映射对象statusMap传入,返回映射函数,映射函数接受映射的key,返回映射的值
 * @param   {Object}     array
 */
export const mapObjCreator = (obj) => { // 
  return status => obj[status]
}

export const filterObjCreator = (obj) => { // 将映射对象转换成过滤对象
  return Object.keys(obj).map(val=>({text:obj[val],value:val}))
}
export const mapAttr2ArrCreator = (obj) => { // 将映射对象转换成过滤对象
  return Object.keys(obj).map(val=>(obj[val]))
}

export const number2RMB = (text) => `¥${text}`

// 文件大小单位换算
export const fileSizeUnitFormat = (number) => {
		/*
			默认为B 
			大于1024 B =>KB 
			大于1024 KB => MB
			大于1024 MB => GB
		*/
		let result;
		if (number < 1024) {
			result = number + "B";
		}
		else if (number >= 1024 && number < 1024 * 1024) {
			result = parseFloat(number / 1024).toFixed(2) + "KB"
		}
		else if (number >= 1024 * 1024 && number < 1024 * 1024 * 1024) {
			result = parseFloat(number / (1024 * 1024)).toFixed(2) + "MB"
		}
		else if (number >= 1024 * 1024 * 1024 && number < 1024 * 1024 * 1024 * 1024) {
			result = parseFloat(number / (1024 * 1024 * 1024)).toFixed(2) + "GB"
		}

		return result;
}

export const handleRefreshCreator = (location,dispatch) => { // 刷新页面方法,一般用作翻页,重新筛选
  const {query,pathname} = location
  return function (newQuery) {
    dispatch(routerRedux.push({ // 通过routerRedux push state的方法,使得路由变化,对应路由变化监听器调用回调函数
        pathname,
        search: queryString.stringify({ // queryString.stringify将对象转换为字符串格式,默认以&分割
            ...query,
            ...newQuery,
        }),
    }))
  }
}

export const listOnChangeCreator = (handleRefresh) => {
  return function (page,filters,sorter) {
    // console.log('page',page)
    // console.log('filters',filters)
    // console.log('sorter',sorter)
    const refreshObj = {
        page: page.current,
        list_rows: page.pageSize,
    }
    if(sorter&&Object.keys(sorter)){
        refreshObj['order_key'] = sorter.columnKey
        refreshObj['order_type'] = sorter.order
    }
    if(filters){
        for(let key in filters){
            if(filters.hasOwnProperty(key)){
                refreshObj[key] = filters[key]
            }
        }
    }
    handleRefresh(refreshObj)
  }
}
// 用于列表下拉筛选框的默认值填充生成函数,由于query取出的值只有一个时是字符串,多个时是数组,而列表下拉筛选只接受数组,所以,需要转换
export const filteredValueCreator = (arrOrStr) => {
  if(arrOrStr === undefined) return []
  return Array.isArray(arrOrStr) ? arrOrStr : [arrOrStr]
}


// 获取文件上传后的ids
export const getIds = arr => {
  return arr.map(item => {
    return item.response && item.response.Data[0]
  })
}

// 获取文件上传后的 ids
export const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList && getIds(e.fileList)
}

// 获取数组某个字段的值集合
export const getFieldValue = (arr, field) => {
  return arr.map(item => {
    return item[field]
  })
}

// 随机字符串
export const getRandom = () => {
  return Math.random().toString(36).substr(2)
}

export const sortDataFormat = (arr, id = 'id', name = 'name', children = 'children') => {
  return arr.map(item => {
    return {
      ...item,
      key: item[id],
      title: item[name],
      children: item[children] ? sortDataFormat(item[children]) : []
    }
  })
}

export const getPathArray = (array, current, pid, id) => {
  let result = [String(current[id])]
  const getPath = (item) => {
    if (item && item[pid]) {
      if (item[pid] === -1) {
        result.unshift(String(item['bpid']))
      } else {
        result.unshift(String(item[pid]))
        getPath(queryArray(array, item[pid], id))
      }
    }
  }
  getPath(current)
  return result
}

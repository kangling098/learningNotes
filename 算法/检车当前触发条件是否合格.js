const validateTriggerCondition = (str, keysArr) => {
  console.log('>,>=,<,<=,==,!=,=~,!~'.split(','))
  const identify = ['+', '-', '*', "/", '%', '>', '>=', '<', '<=', '==', '!=', '=~', '!~', '&', '|', '~', '&&', '||' ]
  const oldContainesArr = str.match(/contains\(.*?\)/ig) || []
  const containesArr = oldContainesArr.map(val => {
    return val.substr(9, val.length - 1).split(',');
  })
  for (let i = 0; i < containesArr.length; i++) {
    if (containesArr[i].length !== 2) {
      return {
        result: false,
        message: `触发条件contains函数异常,两个参数必填`,
      }
    }

    const first = containesArr[i][0]
    if (!keysArr.includes(first)) {
      return {
        result: false,
        message: `触发条件contains函数异常,第一个参数必须为查询字段`,
      }
    }
    for (let j = 0; j < identify.length; j++) {
      if (first.indexOf(identify[j]) !== -1){
        return {
          result: false,
          message: `触发条件contains函数异常,第一个参数不允许出现${identify[j]}`,
        }
      }
    }
    
  }
  // 移除contains函数,移除字符串
  const newStr = str.replace(/contains\(.*?\) | '.*?' | ".*?"/ig, '')
  // 获取剩余变量名
  const otherIdentifyArr = newStr.match(/[a-z\u4E00-\u9FA5]+/ig)
  for (let i = 0; i < otherIdentifyArr.length; i++) {
    if (!keysArr.includes(otherIdentifyArr[i])) {
      return {
        result: false,
        message: `触发条件异常,${otherIdentifyArr[i]}不在查询字段中`
      }
    }
  }
  return {
    result: true,
  }
}

const resultObj = validateTriggerCondition(` pv+100>1000 || province == "深圳"`, ['city'])
console.log(resultObj)

//  js APi整理 
/* global wx:true */

const $VAppBridge = Vue.prototype.$VAppBridge
const $VToast = Vue.prototype.$VToast
const ua = navigator.userAgent

// =======url 相关=======
/**
 * @func getUrlParam
 * @desc 获取url参数(多个相同key转成数组 & 不带则为undefined)
 * @param {string} [key] - key值 返回key对应的Val值
 * @param {string} [url] - url 可选 没传就以window.location.href进行取值
 * @return 对象|具体key的值
 */
export function getUrlParam(key, url = window.location.href) {
  let o = {}
  let queryString = url.split('?')[1]
  if (queryString) {
    queryString.split('&').forEach(item => {
      let [k, val] = item.split('=')
      val = val ? decodeURIComponent(val) : undefined
      if (o[k]) {
        o[k] = [].concat(o[k], val)
      } else {
        o[k] = val
      }
    })
  }
  return key ? o[key] : o
}

/**
 * @func parseObjParamsToStr
 * @desc  解析对象成get字符串参数
 * @param {string} - Obj
 * @return {string} - get字符串 eg: a=1&b=2
 */
export function parseObjParamsToStr(paramsObj) {
  let result = ''
  Object.keys(paramsObj).forEach(item => {
    result += '&' + item + '=' + encodeURIComponent(paramsObj[item])
  })
  return result.substr(1)
}

/**
 * @func removeUrlParam
 * @desc  删除url上的某个key
 * @param {string} - delName 删除的key
 * @return {string} - 删除后的url
 */
export function removeUrlParam(delname = '') {
  // 用于去除url 的某个参数
  let currUrlObj = getUrlParam()
  if (delname) {
    delete currUrlObj[delname]
  }
  return `${window.location.origin}${window.location.pathname}?${parseObjParamsToStr(currUrlObj)}`
}

/**
 * @func openPageByType 需要验证一下
 * @desc  跟进协议，统一跳转（微信、app）
 * @param {string} - pageURL 跳转的url
 * @param {string} - options 跳转小程序的参数
 */
export function openPageByType(pageURL, options = {}) {
  if (typeof pageURL !== 'string') {
    throw new Error('input parameter of openPageByType function must be string.')
  }
  pageURL = decodeURIComponent(pageURL.replace(/^\s*|\s*$/g, ''))
  const urls = pageURL.split(':')
  if (!urls || urls.length < 2) {
    $VToast.show('openPageByType的跳转地址参数有误~')
    return false
  }
  switch (urls[0]) {
    case 'http': // https://vip.m.fenqile.com/XXXX
    case 'https':
      $VAppBridge.locationHref(pageURL)
      break
    case 'mini': // 例如  mini://pages/h5/index
      jumpToWXMini(pageURL, options)
      break
    case 'tabs': // 例如 tabs://pages/cardbag/index tab跳转
      jumpToWXMini(
        pageURL,
        Object.assign({}, options, {
          switch: true
        })
      )
      break
    case 'thirdmini': // 例如  thirdmini:原始ID:路径(app中的跳转小程序)
      // eg: app跳大地小程序 thirdmini:gh_5df750ca5aaf:pages/privilegeDetail/index?publishId=AD20190905144346964138
      $VAppBridge.invokeJsBridge('openWXMiniProgram', {
        userName: urls[1],
        path: urls.length > 2 && urls[2] ? urls[2] : '',
        miniProgramType: 0
      })
      break
    default:
      $VToast.show('跳转地址参数有误~')
  }
}

/**
 * 跳转到小程序页面
 * @param { String } url 小程序的页面
 * @param { Object } options 选项 params：拼接参数 switch：是否tabbar页面（兼容先前的写法，后续改用routeType参数），相当于routeType=switchTab
 * routeType:路由类型，包括navigateTo,navigateBack,switchTab,reLaunch,reLaunch等类型。
 *      jumpToWXMini('/pages/starDetail/index', {
          routeType: 'navigateBack',
          params: {
            activityId: getUrlParam('activityId')
          }
        })
 * */
export function jumpToWXMini(url, options = {}) {
  if (!url) {
    console.log('请输入小程序跳转url')
    return
  }
  let suffix
  if (options.params) {
    // 处理拼接参数
    suffix = '?'
    for (let key in options.params) {
      options.params[key] = encodeURIComponent(options.params[key])
      suffix += `${key}=${options.params[key]}&`
    }
    suffix = suffix.slice(0, -1)
  } else {
    suffix = ''
  }
  url = url + suffix
  let routeType = options.switch ? 'switchTab' : options.routeType || 'navigateTo'
  wx.miniProgram[routeType]({ url })
}

// =======浏览器相关=======
/**
 * 环境判断 微信
 * */
export const isWeiXin = (function() {
  let ua = ua.toLowerCase()
  return ~ua.indexOf('micromessenger')
})()

/**
 * 环境判断 ios
 * */
export const isIOS = (function() {
  let ua = navigator.userAgent
  let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  return isiOS
})()

/**
 * 环境判断 安卓
 * */
export const isAndroid = /(Android)/i.test(ua)

/**
 * 环境判断 微信小程序
 * */
export function isWxMiniProgram() {
  // 该api依赖于https://res.wx.qq.com/open/js/jweixin-1.3.2.js 及以上版本
  let ua = window.navigator.userAgent.toLowerCase()
  // 判断是否是微信环境
  return new Promise(resolve => {
    if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      let isWx = false
      wx &&
        wx.miniProgram &&
        wx.miniProgram.getEnv(res => {
          isWx = res.miniprogram
          resolve(isWx)
        })
    } else {
      // 非微信环境逻辑
      resolve(false)
    }
  })
}
// ======= 校验类 =======
/**
 * 手机号校验
 * */
export function isMobileNum(str = '') {
  return !!str.toString().match(/^1\d{10}$/)
}

/**
 * 邮箱校验
 * */
export function isValidEmail(value = '') {
  return /(\w+(?:[-+.]\w+)*)(@\w+([-.]\w+)*\.\w+([-.]\w+)*)/.test(value)
}

/**
 * 公共错误处理 todo
 * */
export function commonErrorHandler(data) {
  let status = data.status
  switch (status) {
    case '214':
      break
    default:
      break
  }
}
// ======= 缓存类 ======= todo
export const cookie = {
  // 不设置expires等于关闭浏览器失效
  set(name, value, expired) {
    if (expired === 'always') {
      expired = 99999
    }
    if (!isNaN(Number(expired))) {
      let date = new Date()
      date.setDate(Number(expired))
      document.cookie = `${name}=${value}; expires=${date.toGMTString()}`
    } else if (typeof expired === 'string') {
      document.cookie = `${name}=${value}; expires=${expired}`
    } else if (expired && expired.__proto__ === Date.prototype) {
      document.cookie = `${name}=${value}; expires=${expired.toGMTString()}`
    } else {
      document.cookie = `${name}=${value}`
    }
  },
  get(name) {
    return this.getAll()[name] || null
  },
  getAll() {
    let cookiesArr = document.cookie.split(';')
    let cookies = {}
    cookiesArr.map(item => {
      if (item) {
        let tmp = item.split('=')
        cookies[tmp[0].trim()] = decodeURIComponent(decodeURIComponent(tmp[1]))
      }
    })
    return cookies
  },
  remove(name) {
    this.set(name, '', 'Thu, 01 Jan 1970 00:00:00 GMT')
  }
}
// ======= 数据类 =======
/**
 * 数组去重
 * */
export function unique(arr = []) {
  let o = {}
  let newArr = []
  arr.forEach(item => {
    if (o[item] === undefined) {
      newArr.push(item)
      o[item] = 1
    }
  })
  return newArr
}

/**
 * 去除空格
 * */
export function trim(str = '') {
  str = str.toString()
  if (str.trim) return str.trim()
  return str.replace(/^\s*|\s*$/g, '')
}
/**
 * @func deepClone
 * @desc  深拷贝
 * @param {obj} - obj 拷贝对象
 * @param {obj} - 返回新对象
 */
export function deepClone(obj) {
  if (!JsType.isObject(obj)) {
    throw new Error('params is not object')
  }
  let newObj = JsType.isArray(obj) ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = JsType.isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}

/**
 * @func JsType
 * @desc  js类型判断
 * @param {obj} - 返回isString isObject isNumber isArray isUndefined isNull isSymbol
 * 使用eg JsType.isObject({})
 */
export const JsType = (function() {
  let type = {}
  let typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Null', 'Symbol']
  typeArr.forEach(item => {
    type[`is${item}`] = function(obj) {
      return Object.prototype.toString.call(obj) === `[object ${item}]`
    }
  })
  return type
})()

/**
 * @func shuffle
 * @desc  shuffle()  洗牌算法
 * @param {arr} - 随机打乱的数组
 */
export function shuffle(arr = []) {
  var len = arr.length
  for (var i = 0; i < len - 1; i++) {
    var idx = Math.floor(Math.random() * (len - i))
    var temp = arr[idx]
    arr[idx] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }
  return arr
}

// ==========视图类==========
/**
 * @func scrollTop
 * @desc  快速回到顶部
 */
export function scrollTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollTop)
    window.scrollTop(0, c - c / 8)
  }
}
/**
 * @func formateTime
 * @desc  时间格式化
 * @param {String|Number} - time 传入时间戳"毫秒"单位
 * @param {} - yyyy|MM|dd|HH|mm|ss|AMPM|week 支持以上几种
 * @return 格式化之后的字符串
 */
export function formateTime(time, format = 'MM-dd HH:mm:ss') {
  time = Number(time)
  if (isNaN(time)) {
    return false
  }
  let t = new Date(time)
  let tf = function(i) {
    return (i < 10 ? '0' : '') + i
  }
  let tfAMPM = function(i) {
    if (~format.indexOf('AMPM')) {
      i = i % 12
      i = i || 12
    }
    return (i < 10 ? '0' : '') + i
  }
  let amName = function(hour) {
    return hour >= 12 ? 'PM' : 'AM'
  }
  let getWeek = function(day) {
    let baseArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return baseArr[day]
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss|AMPM|week/g, function(a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tfAMPM(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
      case 'AMPM':
        return amName(t.getHours())
      case 'week':
        return getWeek(t.getDay())
    }
  })
}

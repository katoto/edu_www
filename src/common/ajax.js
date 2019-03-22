/**
 * 默认发生任何异常都返回一个空对象
 */
import axios from 'axios'
import {
    getCK,
    platform,
    src,
    commonErrorHandler,
    defaultLanguage,
    getURLParams
} from '~common/util'

function getCommonParams () {
    let urlParams = getURLParams() || null
    let channel = null
    let params = {
        platform,
        src
    }

    if (urlParams && urlParams.utm_source) {
        channel = urlParams.utm_medium ? `${urlParams.utm_source}_${urlParams.utm_medium}` : urlParams.utm_source
    }
    return channel ? {
        ...params,
        channel
    } : {
        ...params
    }
}

const options = {
    headers: {
        'Language': {
            'en': 'en',
            'zhCn': 'zh-cn',
            'zhTw': 'zh-ft'
        }[defaultLanguage]
        // 'Referer': 'https://www.iqiyi.com/'
    }
}

let _isProduction = false
let _isRelease = false
let _isDev = false
if (process && process.env && process.env.NODE_ENV === 'production') {
    // 线上
<<<<<<< HEAD
    options.baseURL = window.location.protocol + `//${window.location.host}/api`
=======
    options.baseURL = window.location.protocol + `//${window.location.hostname}/api`
>>>>>>> 0369abd1a5837a12cbf3ef56be1684d90043999e
    _isProduction = true
} else if (process && process.env && process.env.NODE_ENV === 'preRelease') {
    // 线上
    options.baseURL = window.location.protocol + `//${window.location.host}/api`
    _isProduction = true
    // // 线下167
    // options.baseURL = 'http://10.0.1.41:3333' // 线下测试web
    // _isRelease = true
} else {
    // 开发  环境
    // options.baseURL = 'http://47.96.234.59:7001/' // 线下测试web
<<<<<<< HEAD
    // options.baseURL = 'http://192.168.0.102:7001' // 线下测试web
    // options.baseURL = 'http://172.20.10.3:7001' // 线下测试web
    options.baseURL = 'http://www.katoto.cn/api' // 线下测试web
=======
    options.baseURL = 'http://192.168.43.61:7001' // 线下测试web
    // options.baseURL = 'http://172.20.10.3:7001' // 线下测试web
>>>>>>> 0369abd1a5837a12cbf3ef56be1684d90043999e
    // options.baseURL = 'http://192.168.50.47:7001' // 线下测试web
    _isDev = true
}

export const baseURL = options.baseURL
export const isProduction = _isProduction
export const isDev = _isDev
export const isRelease = _isRelease

const _axios = axios.create(options)

const ajax = function (url, config = {
    ignore: true
}) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {
                data: {}
            }
        }
        throw new Error(response.message)
    })
}
ajax.get = function (url, params, noMessage = false) {
    let config = {
        params: {
            ...getCommonParams(),
            ...params
        },
        ignore: true
    }
    return _axios.get(url, config)
        .then((response) => {
            if (response.status === 200) {
                if (response.data && response.data.status !== '100') {
                    !noMessage && commonErrorHandler(response.data)
                    return Promise.reject(response.data)
                }
                return response.data
            } else if (config.ignore) {
                return {
                    data: {}
                }
            }
            throw new Error(response.message)
        })
}

ajax.post = function (url, params, noMessage = false) {
    let data = {
        ...getCommonParams(),
        ...params
    }
    return _axios.post(url, data)
        .then((response) => {
            if (response.status === 200) {
                if (response.data && response.data.status !== '100') {
                    !noMessage && commonErrorHandler(response.data)
                    return Promise.reject(response.data)
                }
                return response.data
            }
            throw new Error(response.message)
        })
}

export default ajax

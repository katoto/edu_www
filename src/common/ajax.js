/**
 * 默认发生任何异常都返回一个空对象
 */
import axios from 'axios'
import { getCK, platform, src, commonErrorHandler, defaultLanguage } from '~common/util'

function getCommonParams () {
    let ck = getCK() || ''
    let params = {
        platform,
        src,
        lotid: 1
    }
    if (!ck || ck === 'null') {
        ck = ''
    }
    return { ...params, ck }
}

const options = {
    headers: {
        'Language': {
            'en': 'en',
            'zhCn': 'zh-cn',
            'zhTw': 'zh-ft'
        }[defaultLanguage]
    }
}

let websocketUrl = ''
const isHttp = window.location.protocol === 'http:'
if (process && process.env && process.env.NODE_ENV === 'production') {
    // 线上
    options.baseURL = window.location.protocol + '//api.coinslot.com'
    websocketUrl = `${isHttp ? 'ws' : 'wss'}://ws.coinslot.com/betblock`
} else if (process && process.env && process.env.NODE_ENV === 'preRelease') {
    // 线下167
    // options.baseURL = 'http://192.168.30.13:8000'// 张旭web
    // options.baseURL = 'http://10.0.0.171:8097'// 成哥web
    // options.baseURL = 'http://10.0.0.130:8000'// 建清web
    options.baseURL = 'http://10.0.1.41:3333'// 线下测试web
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://192.168.30.13:7999/betblock`// 张旭ws
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.0.171:8098/betblock`// 成哥ws
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.0.130:8080/betblock'`// 建清ws
    websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.1.41:4444/betblock`// 线下测试环境ws
} else {
    // 开发环境
    // options.baseURL = 'http://192.168.30.13:8000'// 张旭web
    // options.baseURL = 'http://10.0.0.171:8097'// 成哥web
    // options.baseURL = 'http://10.0.0.130:8000'// 建清web
    // options.baseURL = 'http://10.0.1.41:3333'// 线下测试web
    options.baseURL = 'http://10.0.0.171:7080'// 线下测试web

    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://192.168.30.13:7999/betblock`// 张旭ws
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.0.171:8098/betblock`// 成哥ws
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.0.130:8080/betblock'`// 建清ws
    // websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.1.41:4444/betblock`// 线下测试环境ws
    websocketUrl = `${isHttp ? 'ws' : 'wss'}://10.0.0.171:8098/betblock`// 线下测试环境ws
}

export const sockURL = websocketUrl

export const baseURL = options.baseURL

const _axios = axios.create(options)

const ajax = function (url, config = {ignore: true}) {
    return _axios.get(url, config).then((response) => {
        if (response.status === 200) {
            return response.data
        } else if (config.ignore) {
            return {data: {}}
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
                return {data: {}}
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

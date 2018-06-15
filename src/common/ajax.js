/**
 * 默认发生任何异常都返回一个空对象
 */
import axios from 'axios'
import { getCK, platform, src, commonErrorHandler } from '~common/util'

function getCommonParams () {
    let ck = getCK() || ''
    let params = {
        platform,
        src,
        lotid: 1
    }
    return { ...params, ck }
}

const options = {}

// todo
if (process.env.NODE_ENV === 'production') {
    if (window.location.protocol === 'http:') {
        options.baseURL = window.location.protocol + '//10.0.1.167:8095'
    } else {
        options.baseURL = window.location.protocol + '//www.coinslot.com/api'
    }
} else if (process.env.NODE_ENV === 'preRelease') {
    // 线下167
    options.baseURL = 'http://10.0.1.41:6899'
    // options.baseURL = 'http://crazybet.choopaoo.com:8090'
} else {
    // options.baseURL = 'https://www.coinslot.com/api'
    // options.baseURL = 'http://10.0.1.167:8095' // 8095
    // options.baseURL = 'http://10.0.1.41:3333' // 8095
    options.baseURL = 'http://10.0.0.130:8000' // 8095
}

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
ajax.get = function (url, params) {
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
                    commonErrorHandler(response.data)
                    return Promise.reject(response.data)
                }
                return response.data
            } else if (config.ignore) {
                return {data: {}}
            }
            throw new Error(response.message)
        })
}

ajax.post = function (url, params) {
    let data = {
        ...getCommonParams(),
        ...params
    }
    return _axios.post(url, data)
        .then((response) => {
            if (response.status === 200) {
                if (response.data && response.data.status !== '100') {
                    commonErrorHandler(response.data)
                    return Promise.reject(response.data)
                }
                return response.data
            }
            throw new Error(response.message)
        })
}

export default ajax

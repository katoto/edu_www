/**
 * 默认发生任何异常都返回一个空对象
 */
import axios from 'axios'

const options = {}

// todo
if (process.env.NODE_ENV === 'production') {
	if (window.location.protocol === 'http:') {
		options.baseURL = window.location.protocol + '//www.coinslot.com/api'
	} else {
		options.baseURL = window.location.protocol + '//www.coinslot.com/api'
	}
} else if (process.env.NODE_ENV === 'preRelease') {
	// 线下167
	options.baseURL = 'http://10.0.1.41:6899'
	// options.baseURL = 'http://crazybet.choopaoo.com:8090'
} else {
	// options.baseURL = 'https://www.coinslot.com/api'
    options.baseURL = 'http://10.0.1.167:8095';  // 8095
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
ajax.get = function (url, config = {ignore: true}) {
	return _axios.get(url, config).then((response) => {
		if (response.status === 200) {
			return response.data
		} else if (config.ignore) {
			return {data: {}}
		}
		throw new Error(response.message)
	})
}
ajax.post = function (url, param, config = {ignore: true}) {
	return _axios.post(url, param, config).then((response) => {
		if (response.status === 200) {
			return response.data
		} else if (config.ignore) {
			return {data: {}}
		}
		throw new Error(response.message)
	})
}
export default ajax

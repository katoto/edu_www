/**
 *  相关的工具函数
 */

import Cookies from 'js-cookie'

export const access_token = '3d81a4a18c5a943303bed1c467ec9047'
export const account_id = '2389175'

export const src = 'pc'
export const tipsTime = 3000

export function mapActions (acts, ns) {
    const aTypes = {}
    const actions = {}
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join('/')
        actions[aTypes[key]] = acts[key]
    })
    return {actions, aTypes}
}

export const platform = (function () {
    return ~navigator.userAgent.indexOf('iPhone') ? 'ios' : 'android'
})()

export function mapMutations (muts, ns) {
    const mTypes = {}
    const mutations = {}
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join('/')
        mutations[mTypes[key]] = muts[key]
    })
    return {mutations, mTypes}
}

export function wait (time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
    })
}

export const isWeiX = (function () {
	let ua = navigator.userAgent.toLowerCase()
	return ~ua.indexOf('micromessenger')
})()

const CK = 'admin_ck'

export function getCK () {
    return Cookies.get(CK)
}

export function setCK (ck) {
    return Cookies.set(CK, ck)
}

export function removeCK () {
    return Cookies.remove(CK)
}

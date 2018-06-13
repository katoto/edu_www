/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {src, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'

import {Message} from 'element-ui'

const state = {
    navFix: false
}

const mutationsInfo = mapMutations({
    setWithDrawList (state, data) {
        state.withdrawList = data
    },
    setNavFix (state, data) {
        state.navFix = data
    }
}, 'cs_account')

const actionsInfo = mapActions({
    // my bet 投注接口
    getOrderList ({commit, dispatch}, params) {
        return ajax.get('/order/list', params)
    },
    // my transactions 我的交易接口
    getAccountLog ({commit, dispatch}, params) {
        return ajax.get('/account/log', params)
    },

    // my withdraw/records 我的提款记录
    getWithdrawRecords ({commit, dispatch}, params) {
        return ajax.get('/account/withdraw/records', params)
    },

    async getWithdrawApply ({commit, dispatch}, msg = {}) {
        try {
            let InfoData = null
            Object.assign(msg, {
                ck: getCK(),
                src,
                platform
            })
            console.log(msg)
            if (msg) {
                InfoData = await ajax.post(`/account/withdraw/apply`, msg)
            } else {
                InfoData = await ajax.get(`/account/withdraw/apply`, msg)
            }
            return InfoData
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    }

}, 'cs_account')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

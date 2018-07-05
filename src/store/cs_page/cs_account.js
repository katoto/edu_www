/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {mapMutations, mapActions} from '~common/util'

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

    getWithdrawApply ({commit, dispatch}, params) {
        return ajax.post('/account/withdraw/apply', params, true)
    }

}, 'cs_account')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

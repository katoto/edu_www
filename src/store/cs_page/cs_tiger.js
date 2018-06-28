/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {mapMutations, mapActions, formateBalance, tipsTime} from '~common/util'
import {Message} from 'element-ui'

const state = {
    initTigerMsg: null // pc recently
}

const mutationsInfo = mapMutations({
    setjackPotMsg (state, data) {
        state.jackPotMsg = data
    },
    setInitTigerMsg (state, data) {
        state.initTigerMsg = data
    }

}, 'cs_tiger')

const actionsInfo = mapActions({
    /* 老虎机 */
    formateTiger ({state, commit, dispatch}, data) {
        if (data) {
            commit(mTypes.setInitTigerMsg, data)
        }
    },

    /* 添加中奖播报 */
    addRecentList ({state, commit, dispatch}, data) {
        if (data && state.initTigerMsg) {
            // 对象
            state.initTigerMsg.recentList.unshift(data)
        }
        let currTigerMsg = {
            ...state.initTigerMsg
        }
        commit(mTypes.setInitTigerMsg, currTigerMsg)
    },

    /* 投注下单  2001  */
    async placeOrder ({commit, dispatch}, transferOrderStr) {
        try {
            let InfoData = await ajax.post(`/place/order`, {
                codestr: transferOrderStr,
                cointype: 2001
            })
            return InfoData
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    }

}, 'cs_tiger')

export const mTypes = mutationsInfo.mTypes
export const mutationTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const actionTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import {mapMutations, mapActions, wait} from '~common/util'

const state = {
    recentList: [], // 最近中奖列表
    prizes_pool: null, // 奖池数
    last_prizes: null // 上次中奖

}

const mutationsInfo = mapMutations({
    last_prizes (state, data) {
        state.last_prizes = data
    },
    prizes_pool (state, data) {
        state.prizes_pool = data
    },
    recentList (state, data) {
        state.recentList = data
    },
    setjackPotMsg (state, data) {
        state.jackPotMsg = data
    }

}, 'cs_tiger')

const actionsInfo = mapActions({
    /* 老虎机 socket 推送 */
    formateTiger ({state, commit, dispatch}, data) {
        if (data) {
            if (data.prizes_pool !== undefined) {
                commit(mTypes.prizes_pool, data.prizes_pool)
            }
            if (data.last_prizes !== undefined) {
                commit(mTypes.last_prizes, data.last_prizes)
            }
            /* 中奖top 10 */
            if (data.top !== undefined) {
                commit(mTypes.recentList, data.top)
            }
        }
    },

    /* 添加中奖播报 动态插入 */
    async addRecentList ({state, commit, dispatch}, data) {
        if (data && state.recentList) {
            // 对象
            await wait(5000)
            if (state.recentList.length > 7) {
                commit(mTypes.recentList, state.recentList.slice(0, 7))
            }
            state.recentList.unshift(data)
        }
        commit(mTypes.recentList, state.recentList)
        setTimeout(() => {
            state.recentList.forEach((val, index) => {
                if (val.addNewRecord) {
                    val.addNewRecord = false
                }
            })
        }, 800)
    },

    /* 老虎机首页数据 */
    async slotsHome ({commit, dispatch}) {
        try {
            let InfoData = await ajax.get(`/slots/home`)
            if (InfoData && InfoData.data) {
                let data = InfoData.data
                if (data.prizes_pool !== undefined) {
                    commit(mTypes.prizes_pool, data.prizes_pool)
                }
                if (data.last_prizes !== undefined) {
                    commit(mTypes.last_prizes, data.last_prizes)
                }
            }
            return InfoData.data
        } catch (e) {
            this.$error(e.message)
        }
    },

    /* 老虎机 投注下单  */
    async startPlay ({commit, dispatch}, orderObj) {
        try {
            let InfoData = await ajax.post(`/slots/bingo`, {
                line: orderObj.dft_line,
                single_bet: orderObj.single_bet,
                cointype: orderObj.cointype
            })
            return InfoData.data
        } catch (e) {
            this.$error(e.message)
        }
    }

    /*   */
}, 'cs_tiger')

export const mTypes = mutationsInfo.mTypes
export const mutationTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const actionTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

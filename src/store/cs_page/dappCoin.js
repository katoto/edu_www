import ajax from '~common/ajax'
import {mapMutations, mapActions, tipsTime} from '~common/util'
import {Message} from 'element-ui'

const state = {
    navFix: false
}

const mutationsInfo = mapMutations({
    bet_limit (state, data) {
        state.bet_limit = data
    }
}, 'dappCoin')

const actionsInfo = mapActions({
    /* 首次奖池播报 */
    async prizeMessage ({commit, dispatch}, pageData) {
        try {
            return await ajax.get(`/home/prize_message`)
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },

    /* 历史轮次开奖记录 */
    async superCoinExpects ({commit, dispatch}, pageData) {
        try {
            return await ajax.get(`/luckycoin/expects`, pageData)
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },
    /* 用户投注订单记录 */
    async superCoinOrder ({commit, dispatch}, pageData) {
        try {
            return await ajax.get(`/luckycoin/user/orders`, pageData)
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    }
}, 'dappCoin')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

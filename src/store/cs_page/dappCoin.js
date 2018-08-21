import ajax from '~common/ajax'
import {mapMutations, mapActions, formateBalance, tipsTime} from '~common/util'
import {Message} from 'element-ui'
import {formateCoinType} from '../../common/util'

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
    }
}, 'dappCoin')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

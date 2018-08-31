// 活动相关
import ajax from '~common/ajax'
import { mapMutations, mapActions } from '~common/util'

const state = {
    firstCharge: {
        activity_status: '-1'
    },
    sockMsg: null,
    isShowBonus: false
}

const mutationsInfo = mapMutations({
    firstCharge (state, data) {
        state.firstCharge = data
    },
    sockMsg (state, data) {
        state.sockMsg = data
    }
}, 'cs_activity')

const actionsInfo = mapActions({
    /* 首充充值 */
    async getChargeState ({ state, commit, dispatch }) {
        try {
            let chargeData = await ajax.get('/activity/firstrecharge')
            if (chargeData.status === '100') {
                commit(mTypes.firstCharge, chargeData.data)
                return chargeData.data
            }
        } catch (e) {
            console.error('getChargeState error at cs_activity.js ')
        }
    },
    /* 机会领取 */
    async getChance ({ state, commit, dispatch }) {
        try {
            let chargeData = await ajax.get('/activity/firstrecharge_get')
            return chargeData
        } catch (e) {
            console.error('getChance error at cs_activity.js ')
        }
    },
    /* 弹窗记录 */
    async rechargealert ({ state, commit, dispatch }) {
        try {
            let chargeData = await ajax.get('/activity/rechargealert')
            return chargeData
        } catch (e) {
            console.error('rechargealert error at cs_activity.js ')
        }
    }
}, 'cs_activity')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

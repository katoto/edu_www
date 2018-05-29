/**
 * Created by xiezg on 2018/4/9.
 */

import ajax from '~common/ajax'
import { src, mapMutations, mapActions } from '~common/util'

const state = {
    withdrawList: null
}

const mutationsInfo = mapMutations({
    setWithDrawList (state, data) {
        state.withdrawList = data
    },

}, 'adminModule')

const actionsInfo = mapActions({
    /* ads adminCenter 列表接口 */
    async getAdsUserList ({commit, dispatch}, pageData) {
        // try {
        //     let InfoData = null
        //     if (pageData) {
        //         InfoData = await ajax.get(`/users/ads_user_list?pageno=${pageData.pageNumber}&rangeno=
        //         ${pageData.pageSize}&src=${src}&token=${access_token}&account_id=${account_id}`)
        //     } else {
        //         InfoData = await ajax.get(`/users/ads_user_list`)
        //     }
        //     return InfoData
        // } catch (e) {
        //     Message({
        //         message: e.message,
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        // }
    },



}, 'adminModule')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

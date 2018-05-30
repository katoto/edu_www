/**
 * Created by xiezg on 2018/5/29
 */

import ajax from '~common/ajax'
import { src, mapMutations, mapActions,platform} from '~common/util'

const state = {
    withdrawList: null
}

const mutationsInfo = mapMutations({
    setWithDrawList (state, data) {
        state.withdrawList = data
    },
}, 'cs1105')

const actionsInfo = mapActions({
    /* Draw Number 列表接口数据 */
    async getDrawNumList ({commit, dispatch}, pageData) {
        try {
            let InfoData = null;
            if (pageData) {
                InfoData = await ajax.get(`/expect/hisopencode?pageno=${pageData.pageNumber}&rangeno=
                ${pageData.pageSize}&src=${src}&platform=${platform}`)
            } else {
                InfoData = await ajax.get(`/expect/hisopencode`)
            }
	        console.log(InfoData);
	        console.log('InfoData');
	        return InfoData
        } catch (e) {
            Message({
                message: e.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
    },
}, 'cs1105')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

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
}, 'cs_1105');

const actionsInfo = mapActions({
	/* Draw Number 列表接口数据 */
	async getDrawNumList ({commit, dispatch}, pageData) {
		try {
			let InfoData = null;
			if (pageData) {
				InfoData = await ajax.get(`/expect/hisopencode?pageno=${pageData.pageNumber}&rangeno=${pageData.pageSize}&src=${src}&platform=${platform}`)
			} else {
				InfoData = await ajax.get(`/expect/hisopencode`)
			}
			if (InfoData.status === '100') {
				return InfoData.data
			} else {
				Message({
					message: InfoData.message,
					type: 'error',
					duration: tipsTime
				})
				return false
			}
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},

    //首页 Recent Wins 列表接口数据
    async getRecentWinsList({commit, dispatch}){
        // order_lotid
        try{
            let dataRecentWinsList = null;
            // if(order_lotid){
            //     dataRecentWinsList = await ajax.get( '/home/winnerlist?lotid=' + order_lotid + '&pagesize=20');
            // }else{
                dataRecentWinsList = await ajax.get( '/home/winnerlist?lotid=' + 1 + '&pagesize=20');
            // }
            if(dataRecentWinsList.status === '100'){
                return dataRecentWinsList.data.winnerlist;
            }else{
                Message({
                    message: dataRecentWinsList.message,
                    type: 'error',
                    duration: tipsTime
                })
            }
        }catch(e){
            Message({
                message: e.message,
                type: 'error',
                duration: tipsTime
            })
        }
    },

	/* 注册激活 */
	async mailActivate ({commit, dispatch}, pageData) {
		try {
			return await ajax.get(`/user/mail/activate?sign=${pageData}&src=${src}&platform=${platform}`)
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}

	},

}, 'cs_1105')

export const mTypes = mutationsInfo.mTypes
const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
const actions = actionsInfo.actions
export default {state, mutations, actions}

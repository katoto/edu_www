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
	/* my bet 投注接口 */
	async getOrderList ({commit, dispatch}, msg) {
		try {
			let InfoData = null;
			if (msg) {
				InfoData = await ajax.get(`/order/list?pageno=${msg.pageno}&pagesize=${msg.pagesize}&day=30&lotid=1&ck=${getCK()}&platform=${platform}&src=${src}`)
			} else {
				InfoData = await ajax.get(`/order/list?day=30&lotid=1&ck=${getCK()}&platform=${platform}&src=${src}`)
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
	/* my transactions 我的交易接口 */
	async getAccountLog ({commit, dispatch}, msg) {
		try {
			let InfoData = null;
			if (msg) {
				InfoData = await ajax.get(`/account/log?pageno=${msg.pageno}&pagesize=${msg.pagesize}&day=30&lotid=1&ck=${getCK()}&platform=${platform}&src=${src}`)
			} else {
				InfoData = await ajax.get(`/account/log?day=30&lotid=1&ck=${getCK()}&platform=${platform}&src=${src}`)
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

	/* my withdraw/records 我的提款记录  	<!-- rangeno 没有统一 app无法统一 -->  */
	async getWithdrawRecords ({commit, dispatch}, msg) {
		try {
			let InfoData = null;
			if (msg) {
				InfoData = await ajax.get(`/account/withdraw/records?pageno=${msg.pageno}&rangeno=${msg.pagesize}&ck=${getCK()}&platform=${platform}&src=${src}`)
			} else {
				InfoData = await ajax.get(`/account/withdraw/records?ck=${getCK()}&platform=${platform}&src=${src}`)
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

	async getWithdrawApply ({commit, dispatch}, msg = {} ) {
		try {
			let InfoData = null;
			Object.assign(msg,{
				ck: getCK(),
				src,
				platform
			});
			console.log(msg);
			if (msg) {
				InfoData = await ajax.post(`/account/withdraw/apply`,msg)
			} else {
				InfoData = await ajax.get(`/account/withdraw/apply`,msg)
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

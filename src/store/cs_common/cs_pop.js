import md5 from 'md5'
import {Message} from 'element-ui'
import ajax from '~common/ajax'
import {src, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'

const state = {
	pop: {
		showLoginPop: false,
		showRegPop: false,
		showVerifyEmail: false,
		showResetPwd: false,
		showVerifyEmailError: false,
		showRegSuccess: false,
		showRegFailure: false,
		showFaucet: false,
	}
}

const mutations = {
	showLoginPop (state) {
		state.pop.showLoginPop = true
	},
	hideLoginPop (state) {
		state.pop.showLoginPop = false
	},
	// 注册弹窗显示隐藏
	showRegPop (state) {
		state.pop.showRegPop = true
	},
	hideRegPop (state) {
		state.pop.showRegPop = false
	},
	// 验证弹窗显示隐藏
	showVerifyEmail (state) {
		state.pop.showVerifyEmail = true
	},
	hideVerifyEmail (state) {
		state.pop.hideVerifyEmail = false
	},
	// 重置密码弹窗显示隐藏
	showResetPwd (state) {
		state.pop.showResetPwd = true
	},
	hideResetPwd (state) {
		state.pop.showResetPwd = false
	},
	// 邮箱验证错误弹窗显示隐藏
	showVerifyEmailError (state) {
		state.pop.showVerifyEmailError = true
	},
	hideVerifyEmailError (state) {
		state.pop.showVerifyEmailError = false
	},
	// 注册成功弹窗显示隐藏
	showRegSuccess (state) {
		state.pop.showRegSuccess = true
	},
	hideRegSuccess (state) {
		state.pop.showRegSuccess = false
	},
	// 注册失败弹窗显示隐藏
	showRegFailure  (state) {
		state.pop.showRegFailure = true
	},
	hideRegFailure  (state) {
		state.pop.showRegFailure = false
	},
	showFaucet (state) {
		state.pop.showFaucet = true
	},
	hideFaucet (state) {
		state.pop.showFaucet = false
	}
}
const actions = {
	/* login 登陆 */
	async userLogin ({commit, dispatch}, pageData) {
		try {
			let InfoData;
			if(pageData){
				InfoData = await ajax.get(`/user/login?email=${pageData.email}&password=${  md5(md5( pageData.password ))}&src=${src}&platform=${platform}`)
			}
			console.log(InfoData);
			if (InfoData.status === '100') {
				return InfoData.data
			} else {
				Message({
					message: InfoData.message,
					type: 'error',
					duration: tipsTime
				});
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
}

const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}

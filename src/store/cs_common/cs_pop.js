import md5 from 'md5'
import {Message} from 'element-ui'
import ajax from '~common/ajax'
import {src, channel, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'

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
		showTransfer: false,

		emailBackTime: 60,
		verifyTime: null,
		regVerifyEmail: null,

		resetObj: {  // 重置密码
			email: null,
			sign: null,
			showReset: false,
		},
		faucetMsg: null,  // 邀请的msg
		inviterObj: null,  // 邀请接收

		// loginSucc: null,  // 登陆成功后的数据
		showFirstLogin:false,  // 邀请用
		loginSucc: {
			login_times:'1',
			invite_status:'0'
		},
	}
}

const mutations = {

	//  激活用的
	showFirstLogin(state, data){
		state.pop.showFirstLogin = data
	},
	//  登陆回来的数据
	setLoginSucc(state, msg){
		state.pop.loginSucc = msg
	},
	// 邀请用
	setInviterObj(state, msg){
		state.pop.inviterObj = msg
	},

	setResetObj(state, msg){
		state.pop.resetObj.email = msg.email;
		state.pop.resetObj.sign = msg.sign;
		state.pop.resetObj.showReset = msg.showReset
	},
	// 注册邮箱 记录
	setRegVerifyEmail(state, email){
		state.pop.regVerifyEmail = email;
	},
	// 邮箱倒计时
	emailBackTime(state, time){
		state.pop.emailBackTime = time
	},
	// 转账弹窗
	showTransfer (state) {
		state.pop.showTransfer = true
	},
	hideTransfer (state) {
		state.pop.showTransfer = false
	},

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
		state.pop.showVerifyEmail = false
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
	},
	faucetMsg (state, msg) {
		state.pop.faucetMsg = msg
	}

}
const actions = {
	/* login 登陆 */
	async userLogin ({commit, dispatch}, pageData) {
		try {
			let InfoData;
			if (pageData) {
				InfoData = await ajax.get(`/user/login?email=${pageData.email}&password=${md5(md5(pageData.password))}&src=${src}&platform=${platform}`)
			}
			console.log(InfoData);
			if (InfoData.status === '100') {
				commit('setLoginSucc', InfoData.data);
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
	/* reg 注册 => 邮箱验证 */
	async beforeReg ({commit, dispatch}, pageData) {
		try {
			let InfoData;
			if (pageData) {
				InfoData = await ajax.get(`/user/mail/validate?email=${pageData}&src=${src}&platform=${platform}`)
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
	/* reg 注册 */
	async reg ({commit, dispatch}, pageData) {
		try {
			let InfoData = null;
			console.log(pageData);
			if (pageData) {
				if (state.pop.inviterObj) {
					InfoData = await ajax.get(`/user/mail/reg?sign=${state.pop.inviterObj.sign}&inviter=${state.pop.inviterObj.inviter}&channel=${channel}&email=${pageData.email}&password=${md5(md5(pageData.password))}&src=${src}&platform=${platform}`)
				} else {
					InfoData = await ajax.get(`/user/mail/reg?channel=${channel}&email=${pageData.email}&password=${md5(md5(pageData.password))}&src=${src}&platform=${platform}`)
				}
			}
			return InfoData
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},
	/*  倒计时 */
	startBackTime ({state, commit, dispatch}, pageData) {
		// 新增一个  再次发生邮件的倒计时
		clearInterval(state.pop.verifyTime);
		commit('emailBackTime', 10);
		// $('#js_first_sendEmail').addClass('no');
		// $('.js_verifyEmail_backTime_parent').removeClass('hide').show().css('visibility', 'visible')
		// $('.js_verifyEmail_backTime').html(verifyTimeNow);
		state.pop.verifyTime = setInterval(function () {
			commit('emailBackTime', state.pop.emailBackTime - 1);
			if (state.pop.emailBackTime === 0) {
				clearInterval(state.pop.verifyTime);
			}
		}, 1000);

	},
	/* 发送邮件  reg: 注册, reset: 重置密码 */
	async sendEmail ({commit, dispatch}, pageData) {
		try {
			let InfoData = null;
			if (pageData) {
				console.log(pageData);
				console.log('发送邮件部分');
				if (pageData.mailType) {
					InfoData = await ajax.get(`/user/mail/send?email=${pageData.email}&mail_type=${pageData.mailType}&src=${src}&platform=${platform}`)
				}
			}
			return InfoData
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},

	/*  reset password  重置密码  */
	async resetPasswordFn ({commit, dispatch}, pageData) {
		try {
			let InfoData = null;
			if (pageData) {
				if (pageData.mailType) {
					InfoData = await ajax.get(`/user/reset/password?email=${pageData.email}&sign=${pageData.sign}&password=${md5(md5(pageData.password))}&src=${src}&platform=${platform}`)
				}
			}
			return InfoData
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},

	/* 邀请 faucet */
	async getFaucet ({commit, dispatch}) {
		try {
			let InfoData = await ajax.get(`/user/invite?ck=${getCK()}&src=${src}&platform=${platform}`)
			if (InfoData.status.toString() === '100') {
				commit('faucetMsg', InfoData.data)
			}
			return InfoData
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},

};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
}

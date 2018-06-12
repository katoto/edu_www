import ajax from '~common/ajax'
import {src, mapMutations, getCK, mapActions, platform, tipsTime} from '~common/util'
import {Message} from 'element-ui'

function combimeStore (store, newStore) {
    return {
        state: { ...store.state, ...newStore.state },
        mutations: { ...store.mutations, ...newStore.mutations },
        actions: { ...store.actions, ...newStore.actions },
        getters: { ...store.getters, ...newStore.getters }
    }
}

// 获取所有 cs_common 文件的 state getters mutations actions 注入到global
const csCommon = require.context('~store/cs_common', true, /\.js$/)
let common = { state: {}, mutations: {}, getters: {}, actions: {} }
csCommon.keys().forEach(function (commonPath) {
    const commonName = commonPath.replace(/(\.\/)|(\.js$)/g, '')
    common = combimeStore(common, csCommon(commonPath).default)
})

const state = {
    version: '0.0.1',
    isLog: false,
    userInfo: null,
    ...common.state
}

const mutations = {
    setUserInfo (state, msg) {
        state.userInfo = msg
    },
    setIsLog (state, msg) {
        state.isLog = msg
    },
    ...common.mutations
}
const actions = {
	/* user info */
	async getUserInfo ({state,commit, dispatch}) {
		try {
			let userMsg = null;
			userMsg = await ajax.get(`/user/info?ck=${getCK()}&platform=${platform}&src=${src}`);
			if( userMsg.status =='100' ){
				// 未激活，无钱包
				if( userMsg.data.accounts.length ===0 ){
					userMsg.data.accounts.push({
						address: "",
						balance: "0",
						cointype: "2001",
						fee: "0.003",
						freez: "0.0",
					});
				}
				// 邀请 活动
				// userMsg.data.tasks = [{
				// 	"tid": 1,
				// 	"maintype": 1,
				// 	"subtype": 2,
				// 	"taskstatus": "0"
				// }];
				let newTask = [];
				userMsg.data.tasks.forEach((val , index)=>{
					if (val.subtype == '2' && val.taskstatus == '0') {
						newTask.push(val)
					}
				});
				if( newTask.length > 0 ){
					commit('inviteTips' , true)
				}
				// 取回之前数据
				let newInviteObj = {
					invite_status: userMsg.data.invite_status , //
					invite_prize_chances:userMsg.data.invite_prize_chances ,
					tasks: newTask
				}
				if( state && state.pop.loginSucc && state.pop.loginSucc.login_times ){
					Object.assign( newInviteObj ,{
						login_times:state.pop.loginSucc.login_times
					})
				}
				commit('setLoginSucc', newInviteObj);

			}
			return userMsg
		} catch (e) {
			Message({
				message: e.message,
				type: 'error',
				duration: tipsTime
			})
		}
	},

	...common.actions
}

const getters = {
    ...common.getters
}

export default {
    state,
    mutations,
    actions,
    getters

}

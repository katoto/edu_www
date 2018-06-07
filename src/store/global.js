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
	async getUserInfo ({commit, dispatch}) {
		try {
			return await ajax.get(`/user/info?ck=${getCK()}&platform=${platform}&src=${src}`)
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

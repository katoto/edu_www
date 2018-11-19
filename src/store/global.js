import ajax, { sockURL } from '~common/ajax'
import { removeCK, isLog, getCK, selfNotify } from '~common/util'

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
    common = combimeStore(common, csCommon(commonPath).default)
})

const state = {
    version: '0.0.1',
    isLog: false,
    initHeadState: null, // 初始化头部状态，用于收起弹层
    showEmailErr: false,
    userInfo: null,
    autoRefreshAccount: false, // 自动切换有钱账号
    socket: {
        reconnect: 0,
        sock: null,
        interval: null
    },
    ip_status: 0, // 1 禁止 0 正常
    currBalance: {
        cointype: '1001'
    }, // 当前币种  2001 eth  1001 btc
    adList: {}, // 广告图配置
    ...common.state
}

const mutations = {
    setAdList (state, data) {
        state.adList = data
    },
    initHeadState (state, data) {
        state.initHeadState = data
    },
    setCurrBalance (state, data) {
        state.currBalance = data
    },
    showEmailErr (state, data) {
        state.showEmailErr = data
    },
    setIp_status (state, data) {
        state.ip_status = data
    },
    setUserInfo (state, msg) {
        state.userInfo = msg
    },
    setIsLog (state, msg) {
        state.isLog = msg
    },
    initSocket (state, { sock, interval }) {
        state.socket.sock = sock
        state.socket.interval = interval
    },
    setAotoRefresh (state, param) {
        state.autoRefreshAccount = param
    },
    ...common.mutations
}
const actions = {
    getAdListInfo () {
        return ajax.get('/activity/center')
    },
    getiqiyiInfo () {
        return ajax.get('/iqiyi')
    },
    getiqiyiTvMsg () {
        return ajax.get('/iqiyiTvMsg')
    },
    // 广告图
    async adList ({ state, commit, dispatch }) {
        try {
            let adMsg = await ajax.get(`/ad/list`)
            if (adMsg.status.toString() === '100') {
                /* btc add */
                if (adMsg.data) commit('setAdList', adMsg.data)
            }
            return adMsg
        } catch (e) {
            console.error('adList error')
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

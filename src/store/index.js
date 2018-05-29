import Vue from 'vue'
import Vuex from 'vuex'

import cs_1105Page from '~store/cs_1105Page/index'

Vue.use(Vuex)

const state = {
    version: '0.0.1',
    toast: {
        msg: '',
        visible: false
    },
    websocket: { // 数据推送相关的
        ondata: null,
        connect: null, // 代表当前连接
        data: null, // websocket 返回来的数据， 用到推送过来的数据的地方 watch一下就好了
        reconnect: 0 // socket 记录重连次数， 起到辅助作用， 比如websocket断开了连接， 重新请求接口， 避免推送丢失引发的问题
    },

}
const mutations = {
    initSocket (state, {connect}) {
        state.websocket.connect = connect
    },
	addConnectNum (state) {
		state.websocket.reconnect++
	},
    showToast (state, msg) {
        state.toast.msg = msg
        state.toast.visible = true
    },
    hideToast (state) {
        state.toast.msg = ''
        state.toast.visible = false
    },

}
const actions = {

}

export default () => new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
	    cs_1105Page
    }
})

// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
}

const mutations = {
}

const actions = {
    // 首页投注列表
    getHomeBet ({ commit }, params = {}) {
        return ajax.get('/home/orders/bet', params)
    },
    // 首页获奖列表
    getHomeDraw ({ commit }, params = {}) {
        return ajax.get('/home/orders/win', params)
    },
    // 首页流水列表
    getHomeWithdraw ({ commit }, params = {}) {
        return ajax.get('/home/orders/account', params)
    },
    // 首页玩法入口数据
    getHomeEntrance ({ commit }, params = {}) {
        return ajax.get('/home/games/entrance', params)
    }
}

export default { state, mutations, actions, namespaced: true }

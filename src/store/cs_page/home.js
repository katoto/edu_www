// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
}

const mutations = {
}

const actions = {
    // 首页获奖列表
    getHomeDraw ({ commit }, params = {}) {
        return ajax.get('/home/orders/win', params)
    }
}

export default { state, mutations, actions, namespaced: true }

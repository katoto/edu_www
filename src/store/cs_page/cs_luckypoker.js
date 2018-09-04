// 一元夺币 modules
import ajax from '~common/ajax'
import { formateCoinType } from '~common/util'

const state = {
    betList: []
}

const mutations = {
    setBetList (state, data) {
        state.betList = [...data]
    },
    addBetList (state, data) {
        state.betList = [...state.betList, ...data]
    }
}

const actions = {
    getHome ({ commit }, params = {}) {
        return ajax.get('/dice/home', params)
    },
    bet ({commit}, params = {}) {
        return ajax.post('/dice/bet', params)
    }
}

export default { state, mutations, actions, namespaced: true }

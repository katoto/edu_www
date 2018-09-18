// 一元夺币 modules
import ajax from '~common/ajax'
import { formateCoinType } from '~common/util'

const state = {
    betList: [],
    selfBetList: []
}

const mutations = {
    setBetList (state, data) {
        state.betList = [...data]
    },
    setSelfBetList (state, data) {
        state.selfBetList = [...data]
    },
    addBetList (state, data) {
        data.forEach(bet => {
            if (this.state.userInfo && this.state.userInfo.uid && this.state.userInfo.uid === bet.uid.toString()) {
                state.selfBetList = [bet, ...state.selfBetList]
            }
        })

        state.betList = [...data, ...state.betList]
    }
}

const actions = {
    getHome ({ commit }, params = {}) {
        return ajax.get('/dice/home', params)
    },
    bet ({commit}, params = {}) {
        return ajax.post('/dice/bet', params)
    },
    check ({commit}, params = {}) {
        return ajax.get('/dice/provably_fair', params)
    }
}

export default { state, mutations, actions, namespaced: true }

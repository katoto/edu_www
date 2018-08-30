// 一元夺币 modules
import ajax from '~common/ajax'
import { formateCoinType } from '~common/util'

const state = {
}

const mutations = {
    updateBet (state, newBet) {
        state.betsList.map((bet, index) => {
            if (bet.exceptId === newBet.exceptId) {
                state.betsList[index] = {
                    ...bet,
                    ...newBet
                }
            }
        })
        state.betsList = [...state.betsList]
        state.listener[newBet.exceptId] && (state.listener[newBet.exceptId])()
    }
}

const actions = {
    betNow ({ commit }, params = {}) {
        return ajax.get('/place/order', {
            lotid: '2',
            ...params
        }, true)
    }
}

export default { state, mutations, actions, namespaced: true }

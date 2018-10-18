// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
}

const mutations = {
}

const actions = {
    getDrawOrders ({ commit }, params) {
        return ajax.get('/expect/orders', {
            ...params
        })
    },
    getDrawDetail ({ commit }, params) {
        return ajax.get('/expect/draw/detail', {
            ...params
        })
    },
    getLuckyCoinDrawDetail ({ commit }, params) {
        return ajax.get('/draw/goods/detail', {
            ...params
        })
    }
}

export default { state, mutations, actions, namespaced: true }

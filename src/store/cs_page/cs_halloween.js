// 一元夺币 modules
import ajax from '~common/ajax'

const state = {
}

const mutations = {
}

const actions = {
    getGhosts ({commit}, params) {
        return ajax.get('/activity/halloween/lists', params)
    },
    beatGhost ({commit}, params) {
        return ajax.post('/activity/halloween/hit', params, true)
    }
}

export default { state, mutations, actions, namespaced: true }

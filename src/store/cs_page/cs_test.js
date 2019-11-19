import ajax from '~common/ajax'

const state = {}
const mutations = {}
const actions = {
  getMyBids({ commit }, params = {}) {
    return ajax.get('/get/personal/bids', params)
  }
}

export default { state, mutations, actions, namespaced: true }

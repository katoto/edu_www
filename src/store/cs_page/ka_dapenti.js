// ka_tuzhai modules
import ajax from '~common/ajax'

const state = {}

const mutations = {}

const actions = {
  // 图摘列表
  getdapentilist({ commit }, params = {}) {
    return ajax.get(`/diagram?pageno=${params.pageno}&pagesize=${params.pagesize}`)
  },
  // 图摘详情接口
  getdapentimsg({ commit }, id = '142898') {
    return ajax.get(`/diagrammsg?id=${id}`)
  }
}

export default { state, mutations, actions, namespaced: true }

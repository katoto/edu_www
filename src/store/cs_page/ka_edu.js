// ka_edu modules
import ajax from '~common/ajax'

const state = {}

const mutations = {}

const actions = {
  // 首页 班级列表
  getClassMsg({ commit }, params = {}) {
    return ajax.get(
      `/educlassmsg?pageno=${params.pageno}&pagesize=${params.pagesize}&className=${params.className}&xueke=${params.xueke}`
    )
  },
  // get msg zixun
  getzixun({ commit }, params = {}) {
    return ajax.get(`/eduZixun?pageno=${params.pageno}&pagesize=${params.pagesize}`)
  },
  // msg 详情接口
  getzixunmsg({ commit }, id = '201811/10825047') {
    return ajax.get(`/edumsg?id=${id}`)
  },
  getartdetail({ commit }, params = {}) {
    return ajax.get(`/artdetail?id=${params.id}`)
  }
}

export default { state, mutations, actions, namespaced: true }

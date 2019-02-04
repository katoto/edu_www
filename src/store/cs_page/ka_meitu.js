// ka_tuzhai modules
import ajax from '~common/ajax'

const state = {}

const mutations = {}

const actions = {
    // 美图列表
    getKutulist({ commit }, params = {}) {
        return ajax.get(`/kutulist?pageno=${params.pageno}&pagesize=${params.pagesize}`)
    },
    // 图摘详情接口
    getTuzhaimsg({ commit }, id = '/qing-nian-tu-zhai-0103-2/') {
        return ajax.get(`/tuzhaimsg?id=${id}`)
    }
}

export default { state, mutations, actions, namespaced: true }

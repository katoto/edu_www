const state = {
    language: 'en'
}

const mutations = {
    setLanguage (state, language) {
        state.language = language
    }
}
const actions = {
    changeToZhCN ({commit}) {
        commit('setLanguage', 'zhCn')
    },
    changeToZhTw ({commit}) {
        commit('setLanguage', 'zhTw')
    },
    changeToEn ({commit}) {
        commit('setLanguage', 'en')
    }
}

const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}

import { getURLParams, defaultLanguage } from '~/common/util'

let params = getURLParams()

const state = {
    language: defaultLanguage
}

const mutations = {
    setLanguage (state, language) {
        state.language = language
    },
    changeLanguage (state, language) {
        params = {
            ...params,
            language
        }
        window.location.search = Object.keys(params).map((key, index) => {
            return (
                index === 0
                    ? `?${key}=${params[key]}`
                    : `&${key}=${params[key]}`
            )
        }).join('')
        setTimeout(() => {
            window.location.reload()
        }, 300)
    }
}
const actions = {
    changeToZhCN ({commit}) {
        commit('changeLanguage', 'zhCn')
    },
    changeToZhTw ({commit}) {
        commit('changeLanguage', 'zhTw')
    },
    changeToEn ({commit}) {
        commit('changeLanguage', 'en')
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

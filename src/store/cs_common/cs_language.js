import { getURLParams, defaultLanguage, setLocalStorageLanguage } from '~/common/util'
let modules = {}

const csPageModules = require.context('~language/varPack', true, /\.js$/)
csPageModules.keys().forEach(function (modulesPath) {
    const modulesName = modulesPath.replace(/(\.\/)|(\.js$)/g, '')
    modules[modulesName] = csPageModules(modulesPath).default
})

let params = getURLParams()
const state = {
    language: defaultLanguage,
    langs: {
        ...modules
    }
}

const mutations = {
    setLanguage (state, language) {
        state.language = language
        setLocalStorageLanguage(language)
    },
    changeLanguage (state, language) {
        params = {
            ...params,
            language
        }
        setLocalStorageLanguage(language)
        window.location.search = Object.keys(params).map((key, index) => {
            return (
                index === 0
                    ? `?${key}=${params[key]}`
                    : `&${key}=${params[key]}`
            )
        }).join('')
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

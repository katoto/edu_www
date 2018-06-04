import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'

Vue.use(Vuex)
let modules = {}

const csPageModules = require.context('~store/cs_page', true, /\.js$/)

csPageModules.keys().forEach(function (modulesPath) {
    const modulesName = modulesPath.replace(/(\.\/)|(\.js$)/g, '')
    modules[modulesName] = csPageModules(modulesPath).default
})

export default () => new Vuex.Store({
    ...Global,
    modules: {
        ...modules
    }
})

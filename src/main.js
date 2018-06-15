import 'es6-promise/auto'
import Vue from 'vue'
import App from './pages/App.vue'
import storeFactory from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import vueTap from 'v-tap'
import $ from 'jquery'
import lanaguage from './plugins/language'

import vueClipboard from 'vue-clipboard2'

// 全局
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(ElementUI, { locale });

// 全局 end
//  按需加载  有点小问题
import { Button, Table, Pagination, TableColumn, Message, Select, Option, Tabs, TabPane } from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/lib-reset.css'
import '@/styles/element.css'
// 设置语言
locale.use(lang)

Vue.component(Button.name, Button)
Vue.component(Table.name, Table)
Vue.component(Pagination.name, Pagination)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Message.name, Message)
Vue.component(Option.name, Option)
Vue.component(Select.name, Select)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)

//  按需加载 end

// import '~/icons'
// Vue.use(ElementUI)
Vue.use(vueTap)

Vue.use(vueClipboard)
const store = storeFactory()
sync(store, router)

Vue.use(lanaguage, store)

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }

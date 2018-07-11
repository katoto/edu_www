import 'es6-promise/auto'
import Vue from 'vue'
import App from './pages/App.vue'
import storeFactory from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import lanaguage from './plugins/language'

// 全局
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(ElementUI, { locale });

// 全局 end
import '@/styles/lib-reset.css'
import '@/styles/element.css'

//  按需加载  有点小问题
import {Carousel, CarouselItem, Table, Pagination, TableColumn, Select, Option, Tabs, TabPane} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)
// 特定國際化
locale.i18n((key, value) => {
    return {
        'el.table.emptyText': _('No Data'),
        'el.pagination.goto': _('go to')
    }[key]
})

Vue.component(Table.name, Table)
Vue.component(Pagination.name, Pagination)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Option.name, Option)
Vue.component(Select.name, Select)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)

Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)

//  按需加载 end

// import '~/icons'
// Vue.use(ElementUI)

// import $ from 'jquery'
// import vueTap from 'v-tap'
// Vue.use(vueTap)

const store = storeFactory()
sync(store, router)

Vue.use(lanaguage, store)

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }

import 'es6-promise/auto'
import Vue from 'vue'
import App from './pages/App.vue'
import storeFactory from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import lanaguage from './plugins/language'
import message from './plugins/message'

// 全局 end
import '@/styles/element.css'
import '@/styles/animate.css'
//  按需加载
import { Input, Icon, Button, Carousel, CarouselItem, Table, Pagination, TableColumn, Select, Option, Tabs, TabPane, RadioButton, RadioGroup } from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)
// 特定國際化
locale.i18n((key, value) => {
    return {
        'el.table.emptyText': _('No Data'),
        'el.pagination.goto': _('go to'),
        'el.pagination.pagesize': ''
    }[key]
})

Vue.component(Table.name, Table)
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)
Vue.component(Input.name, Input)
Vue.component(Pagination.name, Pagination)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Option.name, Option)
Vue.component(Select.name, Select)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)

Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(RadioButton.name, RadioButton)
Vue.component(RadioGroup.name, RadioGroup)

//  按需加载 end

const store = storeFactory()
sync(store, router)

Vue.use(lanaguage, store)
Vue.use(message, store)

router.beforeEach((to, from, next) => {
    document.getElementById('canonicalLink').setAttribute('href', 'https://www.katoto.cn' + to.path)
    document.getElementById('canonicalMobileLink').setAttribute('href', 'https://www.katoto.cn' + to.path)
    if (to.path.indexOf('movie') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', 'katoto影院,katotoMV, 爱奇艺, 土豆, 腾讯, 优酷, 会员免费视频, VIP免费视频,免费VIP视频')
        document.title = 'katoto - 最新海量高清VIP视频_katoto网'
        document.getElementsByTagName('meta')['description'].setAttribute('content', 'katoto影院 - 海量高清VIP视频, MV免费看、看电影找katoto、看MV找katoto、刷资讯找katoto')
    } else if (to.path.indexOf('tvplay') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', 'katoto影院,katotoMV, 爱奇艺, 土豆, 腾讯, 优酷, 会员免费视频, VIP免费视频,免费VIP视频')
        document.title = 'katoto - 最新MV_音乐_katoto网'
        document.getElementsByTagName('meta')['description'].setAttribute('content', '2018最新的高清音乐MTV大全，海量的大陆、港台、日韩、欧美音乐MTV视频大全就在katoto_MV大全')
    }
    next()
})

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }

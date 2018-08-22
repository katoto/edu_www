import 'es6-promise/auto'
import Vue from 'vue'
import App from './pages/App.vue'
import storeFactory from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import lanaguage from './plugins/language'
import message from './plugins/message'
import vueClipboard from 'vue-clipboard2'
import { defaultLanguage } from '~common/util'
// 全局
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
// Vue.use(ElementUI, { locale });

// 全局 end
import '@/styles/element.css'
import '@/styles/animate.css'

//  按需加载  有点小问题
import {Carousel, CarouselItem, Table, Pagination, TableColumn, Select, Option, Tabs, TabPane, RadioButton, RadioGroup} from 'element-ui'

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

// import '~/icons'
// Vue.use(ElementUI)

// import $ from 'jquery'
// import vueTap from 'v-tap'
// Vue.use(vueTap)

const store = storeFactory()
sync(store, router)

Vue.use(lanaguage, store)
Vue.use(message, store)
Vue.use(vueClipboard)

router.beforeEach((to, from, next) => {
    document.getElementById('canonicalLink').setAttribute('href', 'https://www.coinsprize.com' + to.path)
    document.getElementById('canonicalMobileLink').setAttribute('href', 'https://www.coinsprize.com' + to.path)
    if (to.path.indexOf('lucky11') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', _('Lucky11, blockchain-based lottery, Ethereum lottery, bitcoin lottery, high frequency bitcoin play, token bet'))
        document.title = _('Lucky11-- A High Frequency Ether Game Supports Bitcoin and Ethereum Play-- Coinsprize')
        document.getElementsByTagName('meta')['description'].setAttribute('content', _('Lucky11 is a high frequency Ether game developed by Coinsprize. Players can win rewards from easy games on the platform. Since games are based on blockchain, the draw is open, transparent and checkable. Try your luck and experience exciting games now!'))
    } else if (to.path.indexOf('luckyslot') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', _('Slot, blockchain-based casino game, Ethereum casino game, bitcoin casino game, high frequency bitcoin play, token bet'))
        document.title = _('Slot-- A High Frequency Ether Game Supports Bitcoin and Ethereum Play-- Coinsprize')
        document.getElementsByTagName('meta')['description'].setAttribute('content', _('Slot is a blockchain-based high frequency casino game developed by Coinsprize. Players can win rewards from easy games on the platform. Since games are based on blockchain, the draw is open, transparent and checkable. Try your luck and experience exciting games now!'))
    } else if (to.path.indexOf('coin') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', _('LuckyCoin, blockchain-based bid game, Ethereum bid game, bitcoin bid game, token bet'))
        document.title = _('LuckyCoin-- A Blockchain-Based Bid Game Supports Bitcoin and Ethereum Play-- Coinsprize')
        document.getElementsByTagName('meta')['description'].setAttribute('content', _('LuckyCoin is a blockchain-based bid game developed by Coinsprize. Players can win rewards from easy games on the platform. Since games are based on blockchain, the draw is open, transparent and checkable. Try your luck and experience exciting games now!'))
    } else {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', _('Coinsprize, bitcoin game, Ethereum game, bitcoin lottery, bitcoin casino game, Ethereum lottery, Ethereum casino game, smart contract game, blockchain-based gaming, Ethereum gaming'))
        document.title = _('Coinsprize-- A Blockchain-Based Gaming Platform for Bitcoin and Ethereum Play')
        document.getElementsByTagName('meta')['description'].setAttribute('content', _('Coinsprize is a blockchain-based gaming platform with openness, transparency and checkable smart contracts. Players can get rewards from games. Bitcoin and Ethereum are supported by various games including high frequency Ether games, lotteries, poker games and bid games.'))
    }
    next()
})

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }

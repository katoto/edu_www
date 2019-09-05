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
        document.getElementsByTagName('meta')['description'].setAttribute('content', 'katoto影院 - 海量高清VIP视频,看电影找katoto、刷资讯找katoto')
    } else if (to.path.indexOf('tvplay') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', 'katoto影院,katotoMV, 爱奇艺, 土豆, 腾讯, 优酷, 会员免费视频, VIP免费视频,免费VIP视频')
        document.title = 'katoto - 最新电视剧——katoto网'
        document.getElementsByTagName('meta')['description'].setAttribute('content', 'katoto影院 - 海量高清VIP视频, 看电视剧找katoto、刷资讯找katoto')
    } else if (to.path.indexOf('htmlnav') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', 'katoto导航,前端网址导航、最新前端网址导航')
        document.title = 'katoto - 前端网址导航'
        document.getElementsByTagName('meta')['description'].setAttribute('content', 'katoto导航,前端网址导航,前端网址导航是由katoto前端提供的专为前端开发者服务的网址导航产品，前端网址导航整理了国内外非常优秀的前端开发网站，并提供更多相关行业的网站网址，意图给到前端开发者一个完善而又良好的网址导航，是前端行业人员值得收藏的前端导航')
    } else if (to.path.indexOf('pmnav') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', 'katoto导航,高级产品经理网址导航、最新产品经理网址导航')
        document.title = 'katoto - 产品经理网址导航'
        document.getElementsByTagName('meta')['description'].setAttribute('content', 'katoto导航,高级产品经理网址导航 收录产品、运营、交互设计、用户体验、行业资讯、数据分析、电子商务、产品运营必备工具、国外优秀网站等相关网站。')
    } else if (to.path.indexOf('tuzhai') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', '青年图摘 katoto图摘 小哲理 小温暖  囧图  暴走漫画  创意 新奇  糗事 搞笑gif  可爱卖萌 2B青年 邪恶 重口味 雷人 宅腐 猥琐 伤不起 潮流 恶搞 牛逼 蛋疼经痛 是不是 震惊了 碉堡了 凌乱了 吓尿了 不淡定了。')
        document.title = 'katoto图摘 - 每天十分钟，开心一整天'
        document.getElementsByTagName('meta')['description'].setAttribute('content', '青年图摘 katoto图摘 小哲理 小温暖  囧图  暴走漫画  创意 新奇  糗事 搞笑gif  可爱卖萌 2B青年 邪恶 重口味 雷人 宅腐 猥琐 伤不起 潮流 恶搞 牛逼 蛋疼经痛 是不是 震惊了 碉堡了 凌乱了 吓尿了 不淡定了。')
    } else if (to.path.indexOf('meitu') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', '美女图片大全_精选美女图片_katoto网')
        document.title = 'katoto美图 - 每天十张图，美丽一整天'
        document.getElementsByTagName('meta')['description'].setAttribute('content', '美女图片大全_精选美女图片_katoto网')
    } else if (to.path.indexOf('dapenti') > -1) {
        document.getElementsByTagName('meta')['keywords'].setAttribute('content', '图卦;katoto图卦;段子')
        document.title = 'katoto图卦 - 每天一图卦，美丽一整天'
        document.getElementsByTagName('meta')['description'].setAttribute('content', '图卦;katoto图卦;段子_katoto网')
    }
    next()
})

const app = new Vue(Object.assign({
    router,
    store
}, App))

app.$mount('#app')

export { app, router, store }

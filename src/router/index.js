import Vue from 'vue'
import Router from 'vue-router'

// 勿删
import language from '../plugins/language'

/* 品牌首页(这种写法就不是按需加载) */
// import Home from '~/pages/cs_home/home'
Vue.use(Router)

// index页
const index = () => import('~/pages/ka_home/index')
const play = () => import('~/pages/ka_home/play')

let routesArr = [
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/index',
        name: 'index',
        component: index
    },
    {
        path: '/play/:urlVal?',
        name: 'play',
        component: play
    },
    {
        path: '/*',
        name: _('Home'),
        component: index
    }
]

export default new Router({
    mode: 'history',
    routes: routesArr,
    scrollBehavior (to, from, savedPosition) { // vue-router的滚动行为，避免当前页面滚动到底部，跳转其他页面时也在底部
        return {
            x: 0,
            y: 0
        }
    }
})
if (location.search) {
    let queryObj = {}
    location.search.replace('?', '').split('&').forEach(item => {
        if (~item.indexOf('=')) {
            item = item.split('=')
            queryObj[item[0]] = item[1]
        }
    })
    if (queryObj.sign) {
        if (queryObj.inviter) {
            history.replaceState({}, '', `${location.origin}/?inviter=${queryObj.inviter}&sign=${queryObj.sign}`)
        }
        if (queryObj.from) {
            if (queryObj.from === 'resetPassword') {
                history.replaceState({}, '', `${location.origin}/?from=${queryObj.from}&sign=${queryObj.sign}&email=${queryObj.email}`)
            } else {
                history.replaceState({}, '', `${location.origin}${location.pathname}/?from=${queryObj.from}&sign=${queryObj.sign}`)
            }
        }
    }
}

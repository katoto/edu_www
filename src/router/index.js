import Vue from 'vue'
import Router from 'vue-router'

// 勿删
import language from '../plugins/language'

Vue.use(Router)

const help = () =>
    import('~/pages/cs_help/help')
const helpIndex = () =>
    import('~/pages/cs_help/helpIndex')
const helpView = () =>
    import('~/pages/cs_help/helpView')

const test = () =>
    import('~/pages/cs_1105/test')

/* 品牌首页 */
const Home = () =>
    import('~/pages/cs_home/home')
const home = () =>
    import('~/pages/cs_home/home')

const adHome = () =>
    import('~/pages/cs_home/ad-home')

const adHomeDetail = () =>
    import('~/pages/cs_home/ad-home-detail')

let routesArr = [{
    path: '/test',
    name: 'test',
    component: test
},
{
    path: '/help',
    component: help,
    children: [{
        path: 'helpView/:a/:b/:c',
        name: 'helpView',
        component: helpView
    }, {
        path: '',
        name: 'helpIndex',
        component: helpIndex
    }]
},
{
    path: '/home',
    name: 'home',
    component: home
},
{
    path: '/promotions',
    name: 'promotions',
    component: adHome
},
{
    path: '/adDetail',
    name: 'adDetail',
    component: adHomeDetail
},
{
    path: '/*',
    name: _('Home'),
    component: Home
}
]

//     linkActiveClass: 'on',
export default new Router({
    mode: 'history',
    routes: routesArr
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

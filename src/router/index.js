import Vue from 'vue'
import Router from 'vue-router'

// 勿删
import language from '../plugins/language'

/* 品牌首页(这种写法就不是按需加载) */
// import Home from '~/pages/cs_home/home'

Vue.use(Router)

// index 首页
const movie = () =>
    import('~/pages/ka_home/index')
const play = () =>
    import('~/pages/ka_home/play')
const moremovie = () =>
    import('~/pages/ka_movie/index')
const tvplay = () =>
    import('~/pages/ka_tvplay/index')
const tvMsg = () =>
    import('~/pages/ka_tvplay/tvMsg')

const htmlnav = () =>
    import('~/pages/ka_nav/htmlnav')
const pmnav = () =>
    import('~/pages/ka_nav/pmnav')

// 年级资讯详情
const eduIndex = () =>
    import('~/pages/ka_edu/classpage')

const edumsg = () =>
    import('~/pages/ka_edu/edumsg')
const artdetail = () =>
    import('~/pages/ka_edu/artdetail')
// 图摘页面列表
const tuzhai = () =>
    import('~/pages/ka_tuzhai/index')
// 图摘详情
const tuzhaiMsg = () =>
    import('~/pages/ka_tuzhai/tuzhaiMsg')

// 美图页面列表
const meitu = () =>
    import('~/pages/ka_meitu/index')
// 美图详情
const meitumsg = () =>
    import('~/pages/ka_meitu/meituMsg')

//
const test = () =>
    import('~/pages/test/index')

let routesArr = [{
    path: '/movie',
    name: 'movie',
    component: movie
},
{
    path: '/test',
    name: 'test',
    component: test
},
{
    path: '/moremovie',
    name: 'moremovie',
    component: moremovie
},
{
    path: '/htmlnav',
    name: 'htmlnav',
    component: htmlnav
},
{
    path: '/pmnav',
    name: 'pmnav',
    component: pmnav
},
{
    path: '/tvplay',
    name: 'tvplay',
    component: tvplay
},
{
    path: '/tvMsg/:tvid?',
    name: 'tvMsg',
    component: tvMsg
},
{
    path: '/eduIndex/:classNum?',
    name: 'eduIndex',
    component: eduIndex
},
{
    path: '/meitu',
    name: 'meitu',
    component: meitu
},
{
    path: '/meitumsg/:meituid?',
    name: 'meitumsg',
    component: meitumsg
},
{
    path: '/tuzhai',
    name: 'tuzhai',
    component: tuzhai
},
{
    path: '/tuzhaimsg/:tuzhaiid?',
    name: 'tuzhaimsg',
    component: tuzhaiMsg
},
{
    path: '/edumsg/:id?',
    name: 'edumsg',
    component: edumsg
},
{
    path: '/artdetail/:id?',
    name: 'artdetail',
    component: artdetail
},
{
    path: '/play/:urlVal?',
    name: 'play',
    component: play
},
{
    path: '/*',
    name: _('Home'),
    component: eduIndex
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

        }
    }
}

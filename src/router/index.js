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

/* cs_1105 */
/* cs_1105 首页 */
const lucky11 = () => import('~/pages/cs_1105/lucky')
const test = () => import('~/pages/cs_1105/test')
/* cs_1105 开奖页 */
const csDrawNum = () =>
    import('~/pages/cs_1105/drawNumber')

/* 协议 */
const csProtocolPolicy = () =>
    import('~/pages/cs_protocol/policy')
const csProtocolPolicyCn = () =>
    import('~/pages/cs_protocol/policy_cn')
const csProtocolPolicyTw = () =>
    import('~/pages/cs_protocol/policy_tw')

/* 个人中心 */
const account = () =>
    import('~/pages/cs_account/account')
const General = () =>
    import('~/pages/cs_account/General')
const Deposit = () =>
    import('~/pages/cs_account/Deposit')
const MyBets = () =>
    import('~/pages/cs_account/MyBets')
const MyTransactions = () =>
    import('~/pages/cs_account/MyTransactions')
const Withdraw = () =>
    import('~/pages/cs_account/Withdraw')

/* 验证页面 */
const check = () =>
    import('~/pages/cs_check/check')

/* 老虎机 */
const slot = () =>
    import('~/pages/cs_tiger/slotMachine')

/* 一元夺币 */
const luckycoin = () =>
    import('~/pages/cs_luckycoin/lucky-coin')

const luckcoinIndex = () =>
    import('~/pages/cs_luckycoin/index')

const luckcoinMoreBids = () =>
    import('~/pages/cs_luckycoin/more-bids')

const luckycoinDetailed = () =>
    import('~/pages/cs_luckycoin/detailed')

/* 品牌首页 */
const Home = () =>
    import('~/pages/cs_home/home')
const home = () =>
    import('~/pages/cs_home/home')
// 404  history
const page404 = () =>
    import('~/pages/404.vue')

// 充值送
const actFirstCharge = () => import('~/pages/cs_activity/cs_actFirstCharge')

let routesArr = [
    {
        path: '/test',
        name: 'test',
        component: test
    },
    {
        path: '/firstCharge',
        name: 'firstCharge',
        component: actFirstCharge
    },
    {
        path: '/help',
        component: help,
        children: [{
            path: 'helpView/:a/:b',
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
        path: '/check',
        name: 'check',
        component: check
    },
    {
        path: '/lucky11',
        name: 'lucky11',
        component: lucky11
    },
    {
        path: '/luckyslot',
        name: 'luckySlot',
        component: slot
    },
    {
        path: '/policy',
        name: _('policy'),
        component: csProtocolPolicy
    },
    {
        path: '/policy_zhCn',
        name: _('policy'),
        component: csProtocolPolicyCn
    },
    {
        path: '/policy_zhTw',
        name: _('policy'),
        component: csProtocolPolicyTw
    },
    {
        path: '/drawNumber',
        name: _('Draw Number'),
        component: csDrawNum
    },
    {
        path: '/luckycoin',
        component: luckycoin,
        children: [
            {
                path: 'drawHistory',
                meta: {
                    history: true
                },
                name: _('Draw History'),
                component: luckcoinMoreBids
            },
            {
                path: 'moreBids',
                name: _('More Available Bids'),
                component: luckcoinMoreBids
            },
            {
                path: 'detailed',
                name: _('detailed'),
                component: luckycoinDetailed
            },
            {
                path: '',
                name: _('Home'),
                component: luckcoinIndex
            }
        ]
    },
    {
        path: '/404',
        component: page404,
        hidden: true
    },
    {
        path: '/account',
        component: account,
        children: [
            {
                path: 'general',
                name: _('General'),
                component: General
            },
            {
                path: 'deposit',
                name: _('Deposit'),
                component: Deposit
            },
            {
                path: 'myBets',
                name: _('MyBets'),
                component: MyBets
            },
            {
                path: 'myTransactions',
                name: _('MyTransactions'),
                component: MyTransactions
            },
            {
                path: 'withdraw',
                name: _('Withdraw'),
                component: Withdraw
            },
            {
                path: '/',
                redirect: '/account/general'
            }
        ]
    },
    {
        path: '/*',
        // redirect: '/lucky11'
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
            // history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}/?inviter=${queryObj.inviter}&sign=${queryObj.sign}`)
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

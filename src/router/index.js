import Vue from 'vue'
import Router from 'vue-router'

// 勿删
import language from '../plugins/language'

Vue.use(Router)

/* cs_1105 */
/* cs_1105 首页 */
const lucky11 = () => import('~/pages/cs_1105/lucky')
/* cs_1105 开奖页 */
const csDrawNum = () => import('~/pages/cs_1105/drawNumber')

/* 协议 */
const csProtocolPolicy = () => import('~/pages/cs_protocol/policy')
const csProtocolTerms = () => import('~/pages/cs_protocol/terms')

/* 个人中心 */
const account = () => import('~/pages/cs_account/account')
const General = () => import('~/pages/cs_account/General')
const Deposit = () => import('~/pages/cs_account/Deposit')
const MyBets = () => import('~/pages/cs_account/MyBets')
const MyTransactions = () => import('~/pages/cs_account/MyTransactions')
const Withdraw = () => import('~/pages/cs_account/Withdraw')

/* 老虎机 */
const slotMachine = () => import('~/pages/cs_tiger/slotMachine')

/* 一元夺币 */
const oneToken = () => import('~/pages/cs_oneToken/oneToken')

// 404
const page404 = () => import('~/pages/404.vue')

export default new Router({
    mode: 'hash',
    linkActiveClass: 'on',
    routes: [
        {
            path: '/lucky11',
            name: 'lucky11',
            component: lucky11
        },
        {
            path: '/slotMachine',
            name: 'slotMachine',
            component: slotMachine
        },
        {
            path: '/oneToken',
            name: 'oneToken',
            component: oneToken
        },
        {
            path: '/terms',
            name: _('terms'),
            component: csProtocolTerms
        },
        {
            path: '/policy',
            name: _('policy'),
            component: csProtocolPolicy
        },
        {
            path: '/drawNumber',
            name: _('Draw Number'),
            component: csDrawNum
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
            redirect: '/lucky11'
        }
    ]
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
            history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/home/?inviter=${queryObj.inviter}&sign=${queryObj.sign}`)
        }
        if (queryObj.from) {
            if (queryObj.from === 'resetPassword') {
                history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/home/?from=${queryObj.from}&sign=${queryObj.sign}&email=${queryObj.email}`)
            } else {
                history.replaceState({}, '', `${location.href.split(location.pathname)[0]}${location.pathname}#/home/?from=${queryObj.from}&sign=${queryObj.sign}`)
            }
        }
    }
}

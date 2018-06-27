import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* cs_1105 */
/* cs_1105 首页 */
const lucky = () => import('~/pages/cs_1105/lucky')
/* cs_1105 开奖页 */
const cs_drawNum = () => import('~/pages/cs_1105/drawNumber')

/* 协议 */
const cs_protocol_policy = () => import('~/pages/cs_protocol/policy')
const cs_protocol_terms = () => import('~/pages/cs_protocol/terms')

/* 个人中心 */
const account = () => import('~/pages/cs_account/account')
const General = () => import('~/pages/cs_account/General')
const Deposit = () => import('~/pages/cs_account/Deposit')
const MyBets = () => import('~/pages/cs_account/MyBets')
const MyTransactions = () => import('~/pages/cs_account/MyTransactions')
const Withdraw = () => import('~/pages/cs_account/Withdraw')

/*老虎机*/
const tiger = () => import('~/pages/cs_tiger/tiger')

// 404
const page_404 = () => import('~/pages/404.vue')

export default new Router({
    mode: 'hash',
    linkActiveClass: 'on',
    routes: [
        {
            path: '/lucky',
            name: 'lucky',
            component: lucky
        },
        {
            path: '/tiger',
            name: 'tiger',
            component: tiger
        },
        {
            path: '/terms',
            name: 'terms',
            component: cs_protocol_terms
        },
        {
            path: '/policy',
            name: 'policy',
            component: cs_protocol_policy
        },
        {
            path: '/drawNumber',
            name: 'Draw Number',
            component: cs_drawNum
        },
        {
            path: '/404',
            component: page_404,
            hidden: true
        },
        {
            path: '/account',
            component: account,
            children: [
                {
                    path: 'general',
                    name: 'General',
                    component: General
                },
                {
                    path: 'deposit',
                    name: 'Deposit',
                    component: Deposit
                },
                {
                    path: 'myBets',
                    name: 'MyBets',
                    component: MyBets
                },
                {
                    path: 'myTransactions',
                    name: 'MyTransactions',
                    component: MyTransactions
                },
                {
                    path: 'withdraw',
                    name: 'Withdraw',
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
            redirect: '/lucky'
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

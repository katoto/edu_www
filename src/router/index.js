import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* cs_1105 */
const cs_drawNum = () => import('~/pages/cs_1105/drawNumber')
/* 首页 */
const index = () => import('~/pages/cs_1105/index')

/* 协议 */
const cs_protocol_policy = () => import('~/pages/cs_protocol/policy')
const cs_protocol_terms = () => import('~/pages/cs_protocol/terms')

/*个人中心*/
const account = () => import("~/pages/cs_account/account")
const General = () => import("~/pages/cs_account/General")
const Deposit = () => import("~/pages/cs_account/Deposit")
const MyBets = () => import("~/pages/cs_account/MyBets")
const MyTransactions = () => import("~/pages/cs_account/MyTransactions")
const Withdraw = () => import("~/pages/cs_account/Withdraw")

// 404
const page_404 = () => import ('~/pages/404.vue')

export default new Router({
	mode: "hash",
	linkActiveClass: 'on', 
    routes: [
        {
            path: "/terms",
            name: "terms",
            component: cs_protocol_terms
        },
        {
            path: "/policy",
            name: "policy",
            component: cs_protocol_policy
        },
        {
            path: "/drawNumber",
            name: "Draw Number",
            component: cs_drawNum
        },
        {
            path: "/404",
            component: page_404,
            hidden: true
        },
        {
            path: "/account",
            component: account,
            children: [
                {
                    path: "general",
                    name: "General",
                    component: General
                },
                {
                    path: "deposit",
                    name: "Deposit",
                    component: Deposit
                },
                {
                    path: "myBets",
                    name: "MyBets",
                    component: MyBets
                },
                {
                    path: "myTransactions",
                    name: "MyTransactions",
                    component: MyTransactions
                },
                {
                    path: "withdraw",
                    name: "Withdraw",
                    component: Withdraw
                },
                {
                    path: "/",
	                name: "General",
	                redirect: '/account/general'
                }
            ]
        },
        {
            path: "/*",
            name: "index",
            component: index
        }
    ]
});

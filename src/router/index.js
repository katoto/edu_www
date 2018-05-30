import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const cs05_terms = () => import('~/pages/cs05_Page/cs05_terms')

/* cs_1105 */
const cs_drawNum = () => import('~/pages/cs_1105/drawNumber')

/* 协议 */
const cs_protocol_policy = () => import('~/pages/cs_protocol/policy')
const cs_protocol_terms = () => import('~/pages/cs_protocol/terms')

// 404
const page_404 = () => import ('~/pages/404.vue')

export default new Router({
	mode: 'hash',
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
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
	]
})

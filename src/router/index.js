import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


const cs05_terms = () => import('~/pages/cs05_Page/cs05_terms')
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
			path: '/cs05_terms',
			name: 'cs05_terms',
			component: cs05_terms
		},
		{
			path: '/404',
			component: page_404,
			hidden: true
		},
	]
})

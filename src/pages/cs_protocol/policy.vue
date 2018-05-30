<template>
    <div>
        <p>fsfs{{ title }}fd</p>
        <Footer></Footer>
    </div>
</template>

<script>
	import Footer from '~/components/Footer.vue'
	export default {
		data(){
			return {
				title: '我是頭部'
			}
		},
		watch: {},
		methods: {},
		components:{
			Footer
		},
		computed: {},
		mounted(){

		}
	}
</script>
<style>
</style>

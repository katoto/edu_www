<template>
    <div>
        <Header></Header>
        <div id="main">
            <BreadCrumbs></BreadCrumbs>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
	import {mTypes, aTypes} from '~/store/cs_1105/index'

    import Header from '~/components/Header.vue'
	import Footer from '~/components/Footer.vue'
	import BreadCrumbs from '~/components/BreadCrumbs.vue'

	export default {
		data(){
			return {
				title: '',
				pageSize: 10,
			}
		},
		watch: {},
		methods: {},
		components:{
			Header,
			Footer,
			BreadCrumbs
		},
		computed: {},
		async mounted(){
			let drawData = await this.$store.dispatch(aTypes.getDrawNumList, {
				'pageNumber': 1,
				'pageSize': this.pageSize
			});

			console.log('========')
			console.log( drawData )
		}
	}
</script>
<style>
</style>

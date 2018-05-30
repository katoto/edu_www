<template>
    <div class="terms">
        <p class="red">这是协议</p>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				title: '我是頭部'
			}
		},
		watch: {},
		methods: {

        },
		computed: {
			routeData(){
			 	return  this.$store.state.route.name
			}
        },
		mounted(){

		}
	}
</script>
<style>
</style>

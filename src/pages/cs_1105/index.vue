<template>
    <div class="" v-model="scroll">
        <Header></Header>
        <HeaderNav></HeaderNav>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import HeaderNav from '~components/HeaderNav.vue'
    import Footer from '~components/Footer.vue'

    import {mTypes ,aTypes } from '~/store/cs_1105/index'

    export default {
        data(){
            return {
                scroll:''
            }
        },
        watch: {

        },
        methods: {
            fixNav() {
                this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
                if(this.scroll >= 90){
                	this.$store.commit(mTypes.setNavFix,true)
                }else{
	                this.$store.commit(mTypes.setNavFix,false)
                }
            }
        },

        components: {
            Footer,
            Header,
            HeaderNav,
        },
        mounted(){
            window.addEventListener('scroll',this.fixNav)
        },
        destroyed(){
            window.removeEventListener('scroll',this.fixNav)
        }
    }
</script>
<style lang="less">
    @import "../../styles/lib-mixins.less";
</style>

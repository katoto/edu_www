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
                if(this.scroll == 0){
                    this.$store.state.navFix = false;
                }else{
                    this.$store.state.navFix = true;
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
        }
    }
</script>
<style scoped lang="less">
</style>

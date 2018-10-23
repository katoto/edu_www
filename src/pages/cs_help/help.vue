<template>
    <div class="page-help">
        <Header></Header>
        <div class="main flex1" @click="initPop">
            <BreadCrumbs
                :data="[{ name: _('Home'), path: '/' }, { name: _('Help&nbsp;Center'), path: '/help' }]"></BreadCrumbs>
            <router-view :dataMenu="dataMenu"></router-view>
        </div>
        <Footer class="lucky11"></Footer>
    </div>
</template>

<script>
    import BreadCrumbs from '~/components/BreadCrumbs.vue'
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'

    export default {
        data () {
            return {
                dataMenu: [
                    {menu1: 'About Account', menu2: ['Email verification', 'Coin-Coin(CC)']},
                    {
                        menu1: 'About Wallet',
                        menu2: ['How to top up', 'How to withdraw', 'Withdrawal Conditions']
                    },
                    {menu1: 'About Games', menu2: ['Play Lucky11', 'Play LuckyCoin', 'Play LuckyPoker']},
                    {menu1: 'Others', menu2: ['Transparency checking', 'Contact us']}
                ]
            }
        },
        watch: {},
        methods: {
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            }
        },
        computed: {},
        components: {
            Header,
            BreadCrumbs,
            Footer
        },
        mounted () {
            document.documentElement.className = 'flexhtml'
        },
        destroyed () {
        },
        beforeDestroy () {
            document.documentElement.className = ''
        }
    }
</script>
<style scoped lang="less" type="text/less">
    .page-help {
        .main {
            position: relative;
            width: 92%;
            max-width: 1190px;
            margin: 0 auto;
        }
    }
</style>

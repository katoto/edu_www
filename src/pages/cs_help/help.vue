<template>
    <div class="page-help">
        <Header></Header>
        <div class="main flex1" @click="initPop">
            <BreadCrumbs
                :data="[{ name: _('Home'), path: '/' }, { name: _('Help Center'), path: '/help' }]"></BreadCrumbs>
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
                    {menu1: _('About Account'), menu2: [_('Email verification')]},
                    {
                        menu1: _('About Wallet'),
                        menu2: [_('How to top up'), _('How to withdraw'), _('Withdrawal Conditions')]
                    },
                    {menu1: _('About Games'), menu2: [_('Play Lucky11'), _('Play LuckyCoin')]},
                    {menu1: _('Others'), menu2: [_('Transparency checking'), _('Contact us')]}
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
            width: 1190px;
            margin: 0 auto;
        }
    }
</style>

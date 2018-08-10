<template>
    <div class="page-help">
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <router-view :dataMenu=dataMenu></router-view>
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
                    {menu1: '账户问题', menu2: [ '邮箱验证', '流水说明']},
                    {menu1: '钱包问题', menu2: [ '如何充值', '如何提现']},
                    {menu1: '玩法问题', menu2: [ 'Lucky11怎么玩', 'LuckyCoin怎么玩']},
                    {menu1: '其他重要', menu2: [ '查询透明性', '联系我们']}
                ]
            }
        },
        watch: {},
        methods: {

        },
        computed: {

        },
        components: {
            Header,
            BreadCrumbs,
            Footer
        },
        mounted () {
            document.documentElement.className = 'flexhtml'
        },
        destroyed () {},
        beforeDestroy () {
            document.documentElement.className = ''
        }
    }
</script>
<style scoped lang="less" type="text/less">
    .page-help{
        .main{
            position: relative;
            max-width: 1190px;
            margin: 0 auto;
            overflow: hidden;
        }
    }
</style>

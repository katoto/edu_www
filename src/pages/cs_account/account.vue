<template>
    <div class="account">
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <!--侧边栏-->
            <div class="slide-bar">
                <ul class="account_Tab">
                    <router-link :to=item.link tag="li" v-for="item in lists">
                        <a href="javascript:;">
                         {{item.msg}}
                        </a>
                    </router-link>
                </ul>
            </div>
            <!-- 主体内容 -->
            <div class="my-info">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '~components/Header.vue'
    import Footer from '~components/Footer.vue'
    import BreadCrumbs from '~/components/BreadCrumbs.vue'

    export default {
        data(){
            return {
                lists:[
                    {msg:'General',link:'/account/general'},
                    {msg:'My Bets',link:'/account/myBets'},
                    {msg:'My Transactions',link:'/account/myTransactions'},
                    {msg:'Deposit',link:'/account/deposit'},
                    {msg:'Withdraw',link:'/account/withdraw'},
                ]
            }
        },
        watch: {

        },
        methods: {

        },
        components: {
            Footer,
            Header,
            BreadCrumbs
        },
        mounted(){
        },
        destroyed(){
        }
    }
</script>
<style scoped lang="less">
    @import "../../styles/lib-mixins.less";
    .main{
        position: relative;
        width: 1190px;
        margin: 0 auto;
        overflow: hidden;
    }
    .slide-bar{
        float: left;
        width: 170px;
        padding:14px 0 10px 20px;
        border-radius: 6px;
        background: #fff;
        li{
            height:50px;
            line-height:50px;
        }
        .on{
            a{
                color: #263648;
                &::after{
                    display: none;
                }
            }
        }
    }
    .my-info{
        float: right;
        width:920px;
        padding:24px 30px 0 40px;
        background: #fff;
        border-radius:6px;
        font-size:20px;
        color: #263648;
    }
</style>

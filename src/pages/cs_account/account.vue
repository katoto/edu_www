<template>
    <div class="account">
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <!--侧边栏-->
            <div class="slide-bar">
                <ul class="account_Tab">
                    <router-link active-class="on" :to="item.link" tag="li" v-for="(item, index) in lists" :key="index">
                        <a href="javascript:;">
                            {{_(item.msg)}}
                        </a>
                    </router-link>
                </ul>
            </div>
            <!-- 主体内容 -->
            <div class="my-info">
                <router-view></router-view>
            </div>
        </div>
        <Footer class="lucky11"></Footer>
    </div>
</template>

<script>
import Vue from 'vue'
import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'

import vueClipboard from 'vue-clipboard2'
Vue.use(vueClipboard)

export default {
    data () {
        return {
            lists: [
                { msg: _('General'), link: '/account/general' },
                { msg: _('My Bets'), link: '/account/myBets' },
                { msg: _('My Transactions'), link: '/account/myTransactions' },
                { msg: _('Deposit'), link: '/account/deposit' },
                { msg: _('Withdraw'), link: '/account/withdraw' }
            ]
        }
    },
    watch: {},
    computed: {
        isLog () {
            return this.$store.state.isLog
        }
    },
    methods: {},
    components: {
        Footer,
        Header,
        BreadCrumbs
    },
    mounted () {},
    destroyed () {}
}
</script>
<style scoped lang="less" rel="stylesheet/less">
@import "../../styles/lib-mixins.less";

.main {
    position: relative;
    width: 1190px;
    margin: 0 auto;
    overflow: hidden;
}

.slide-bar {
    float: left;
    width: 170px;
    padding: 14px 0 10px 20px;
    border-radius: 6px;
    background: #fff;
    li {
        height: 50px;
        line-height: 50px;
    }
    .on {
        a {
            color: #263648;
            &::after {
                display: none;
            }
        }
    }
}

.my-info {
    float: right;
    width: 920px;
    padding: 24px 30px 0 40px;
    background: #fff;
    border-radius: 6px;
    font-size: 20px;
    color: #263648;
}
.head-box {
    background: linear-gradient(to right, #4b6584, #655aae, #545f94);
}
</style>

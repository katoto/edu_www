<template>
    <div class="account">
        <Header></Header>
        <div class="main">
            <BreadCrumbs></BreadCrumbs>
            <!--侧边栏-->
            <div class="slide-bar visible-lg">
                <ul class="account_Tab">
                    <router-link active-class="on" :to="item.link" tag="li" v-for="(item, index) in lists" :key="index">
                        <a href="javascript:;">
                            {{_(item.msg)}}
                        </a>
                    </router-link>
                </ul>
            </div>
            <!-- 主体内容 -->
            <div class="my-info visible-lg">
                <router-view></router-view>
            </div>
            <!--移动端-->
            <div class="pop-mask hidden-lg" @click="isShowH5SideBar = false" :class="{hide:!isShowH5SideBar}"></div>
            <div class="h5-slide-bar hidden-lg" :class="{show:isShowH5SideBar}">
               <p> {{currenMsg}}</p>
                <div class="btn" @click="isShowH5SideBar = !isShowH5SideBar">
                    <span></span><span></span><span></span>
                </div>
                <ul>
                    <router-link active-class="on" @click.native="currenMsg=item.msg,isShowH5SideBar = false"  :to="item.link" tag="li" v-for="(item, index) in lists" :key="index">
                        <a href="javascript:;">
                            {{_(item.msg)}}
                        </a>
                    </router-link>
                </ul>
            </div>
            <div class="h5-my-info hidden-lg">
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
            ],
            currenMsg: 'account',
            isShowH5SideBar: false
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
    @import "../../styles/lib-public.less";
    @import "../../styles/lib-mixins.less";
    .account{
        .main {
            position: relative;
            width: 94% !important;
            margin: 0 auto;
        }
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


    .pop-mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        z-index: 10;
    }
    .h5-slide-bar{
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        height: 95/2px;
        padding: 0 percentage(30/710);
        line-height: 95/2px;
        overflow: hidden;
        background: #ffffff;
        border-radius: 6px;
        color: #263648;
        font-size: 36/2px;
        >p{
            float: left;
        }
        .btn{
            float: right;
            position: relative;
            width:20px;
            height:20px;
            margin:27.5/2px auto;
            cursor: pointer;
            span{
                position: absolute;
                left:0;
                display: block;
                width:100%;
                height:2px;
                background: #000000;
                border-radius: 2px;
                top:7px;
                .transition();
                transform-origin: left center;
            }
            span:first-child{
                top:0;
            }
            span:last-child{
                top:15px;
            }
        }
        ul{
            display: none;
            clear: both;
            li{
                a{
                    display: block;
                    line-height: 90/2px;
                    font-size:36/2px;
                }
            }
        }
        &.show{
            z-index: 11;
            height: 95/2px+90/2*5px+5px;
            ul{
                display: block;
            }
        }
    }
    /deep/.h5-my-info{
        margin-top: 122/2px;
        background: #ffffff;
        border-radius: 6px;
        .nomsg{
            img{
                width: 107/2px;
                display: block;
                margin: 20px auto 10px;
            }
            p{
                line-height: 1.5;
                text-align: center;
                font-size: 12px;
                color: #778ca3;
            }
        }
        .btn-more{
            margin: 0 percentage(35/710);
            display: block;
            text-align: center;
            line-height: 45px;
            background: #eef1f9;
            border-radius: 6px;
            font-size: 18px;
            color: #778ca3;
        }
    }


    @media (max-width: @screen-phone) {

    }

/* xs超小屏幕（手机，大于 480） */

@media (min-width: @screen-phone) {

}

/* sm小屏幕（平板，大于等于 768px） */

@media (min-width: @screen-tablet) {

}

/* md中等屏幕（桌面显示器，大于等于 992px） */

@media (min-width: @screen-desktop) {

}

/* lg大屏幕（大桌面显示器，大于等于 1200px） */

@media (min-width: @screen-lg-desktop) {
    .account{
        .main {
            width: 1190px !important;
        }
    }
}



</style>

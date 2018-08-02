<template>
    <div class="page-luckycoin">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
        <!--show-->
        <div class="msg-winning" :class="{ show: otherWin.isShow }">
            Congratulation！ {{ otherWin.name }} <i>WIN {{ otherWin.num }} {{ otherWin.type }}</i>
        </div>
        <div class="self-winning" :class="{show:selfWin.isShow}">
            <div class="main">
                <div class="bounceIn animated">
                    <a href="javascript:;" class="close" @click="hideMyWin"></a>
                    <p class="p1">Congratulate! </p>
                    <p class="p2">you have just won No.187468</p>
                    <p class="p3">
                        +10<i>ETH</i>
                    </p>
                    <a href="javascript:;" class="btn-see">
                        See My Bids
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { mapState } from 'vuex'

export default {
    components: { Header, Footer },
    mounted () {
        this.$store.dispatch('subInLuckyCoin')
    },
    methods: {
        hideMyWin () {
            this.$store.commit('cs_luckycoin/hideMyWin')
        }
    },
    computed: {
        ...mapState('cs_luckycoin', {
            otherWin: state => state.otherWin,
            selfWin: state => state.selfWin
        })
    },
    beforeDestroy () {
        this.$store.dispatch('subOutLuckyCoin')
    }
}
</script>
<style lang="less" type="text/less">
.page-luckycoin{
    position: relative;

    /*banner按钮*/
    .el-carousel__button{
        width:8px;
        height:8px;
    }
    /*分页器*/
    .el-pagination {
        margin-top: 20px;
        text-align: center;
        button,
        li {
            border: 1px solid #412057;
            color: #a99acc;
            &:hover {
                background: #3e284b;
                color: #fff;
            }
        }
    }
    .el-pager .number.active {
        color: #fff !important;
        background-color: transparent;
    }

}
</style>
<style scoped lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    .msg-winning {
        position: fixed;
        left: 50%;
        bottom: 0;
        z-index:100;
        transform: translate(-50%, 100%);
        background: url("../../assets/img/oneToKen/bg-congratulate.jpg") no-repeat center;
        background-size: cover;
        text-align: center;
        color: #fff;
        font-weight: bold;
        overflow: hidden;
        width: 100%;
        max-width: 1190px;
        transition: all 0.2s;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        font-size: 26/2px;
        i {
            font-family: sans-eb;
            font-size: 34/2px;
        }
        &.show {
            transform: translate(-50%, 0);
        }
    }
    .self-winning{
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 9;
        .main{
            width: 544px;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 157px;
            transform: translateX(-50%);
            text-align: center;
            div{
                padding-top: 202px;
                background: url("../../assets/img/oneToKen/bg-win.png") no-repeat top;
                background-size: 544px 265px;
            }
        }
        .p1{
            line-height: 61px;
            color: #fff;
            font-weight: bold;
            font-size: 32px;
        }
        .p2{
            line-height: 58px;
            font-size: 20px;
            color: #fff;
        }
        .p3{
            height: 93px;
            line-height: 70px;
            color: #ffc000;
            text-align: center;
            font-family: sans-eb;
            font-weight: bold;
            font-size: 72px;
            i{
                font-size: 32px;
            }
        }
        .close{
            display: block;
            position: absolute;
            top: 58px;
            right: -14px;
            width: 41px;
            height: 41px;
            background: url("../../assets/img/oneToKen/btn-close.png") no-repeat center top;
            &:hover{
                transform: rotate(90deg);
            }
        }
        .btn-see{
            display: block;
            margin: 0 auto;
            width:260px;
            height:50px;
            overflow: hidden;
            line-height: 50px;
            background:#7b4de4;
            border-radius:6px;
            font-size: 24px;
            color: #fff;
            font-weight: bold;
            &:hover{
                background: #6237c3;
            }
        }
    }
    .page-luckycoin .footer {
        background-color: rgba(0, 0, 0, 0.4);
        .title {
            color: #FFF;
        }
        p {
            color: #887CA5;
        }
    }
    /*mobile 为主来写*/
    .page-luckycoin{
        background: #2a1236 url("../../assets/img/oneToKen/bg-page.png") no-repeat center top;
        background-size: cover;
        .footer{
            border-top:0;
        }
    }
    /deep/
    .oneToKen {
        .main {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            /*overflow: hidden;*/
            padding: 0 0 140/2px 0;
        }
        .btn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border-radius: 6px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background: #7b4de4;
            color: #fff;
            font-weight: bold;
            text-align: center;

            line-height: 50px;
            font-size: 20px;
            &.btn-pause{
                cursor: not-allowed;
                &:hover{
                    background: #7b4de4;
                }
            }
        }
        .for-full {
            margin: 0 -5px;
            overflow: hidden;
        }
        .banner {
            a,
            img {
                display: block;
                width: 100%;
                margin: 0 auto;
                max-width: 790px;
                border: none;
            }
            .el-carousel__arrow{
                display: none;
            }
        }
        .el-carousel__container{
            height:0;
            padding-top:percentage(270/790);
        }
        .token-process {
            position: absolute;
            overflow: hidden;
            width: 102px;
            height: 102px;
            top: 108/2px;
            right: 38/2px; //102->80  80/102=
            transform-origin: top right;
            transform: scale(82/102);
            &.token-bth {
                background: url("../../assets/img/oneToKen/icon-bth.png") no-repeat center;
            }
            &.token-eth {
                background: url("../../assets/img/oneToKen/icon-eth.png") no-repeat center;
            }
            svg {
                transform: rotate(-0.05deg);
            }
            circle {
                transition: all 2s;
            }
        }
        .history {
            width: 92%;
            margin: 0 auto;
            overflow: hidden;
        }
        /*投注*/
        .bg2-betting{
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            top: 0;
            left: 0;
            background: rgba(39, 17, 53, 0.7);
            border-radius: 6px;
            visibility: hidden;
            transition: all 0.2s;
        }
        /*icon*/
        .icon-box{
            position: absolute;
            top: 3px;
            right: 3px;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            line-height: 18px;
            border-radius: 2px;
            i{
                display: none;
                float: right;
                margin-left: 4px;
            }
            .icon-hot{
                padding: 0 4px;
                background: #f65555;
            }
            .icon-bet{
                padding: 0 8px;
                background: #7b4de4;
            }
        }
        .betting {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            top: 0;
            left: 0;
            border-radius: 6px;
            transform: translateY(100%);
            transition: all 0.2s;
            z-index: 10;
            .bet-close {
                display: block;
                position: absolute;
                right: 5px;
                top: 5px;
                background: url("../../assets/img/oneToKen/close-bet.png") no-repeat center;
                background-size: cover;
                width: 26px;
                height: 26px;
            }
            /*正常投注*/
            .bet-normal {
                padding: 0 percentage(14/290);
                color: #fff;
                .bet-t {
                    margin-top: 10px;
                    line-height:56px;
                    font-size: 22px;
                    font-weight: bold;
                    span{
                        font-size: 32px;
                    }
                }
                .bet-m1{
                    line-height: 16px;
                    font-size: 16px;
                }
                .bet-m2{
                    margin-top: 1px;
                    height: 12px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .bet-amount{
                    position: relative;
                    margin-top: 8px;
                    height: 38px;
                    line-height: 36px;
                    border-radius: 6px;
                    border: 1px solid #a99acc;
                    &::before{
                        content: '';
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        display: block;
                        width: 16px;
                        height: 16px;
                        background: url("../../assets/img/oneToKen/btc-input.png") no-repeat center;
                    }
                    input{
                        float: left;
                        display: block;
                        background: transparent;
                        border: none;
                        outline: none;
                        width: 129px;
                        height: 38px;
                        line-height: 36px;
                        text-indent: 38px;
                    }
                    div{
                        height: 100%;
                        overflow: hidden;
                        display: flex;
                        border-top-right-radius: 6px;
                        border-bottom-right-radius: 6px;
                        a{
                            flex: 1;
                            border-left: 1px solid #a99acc;
                            font-size: 16px;
                            color: #fff;
                            text-align: center;
                            background: #4b2688;
                        }
                        a:hover{
                            background: #412057;
                        }
                    }
                }
                .bet-btn {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                    background: #f67c22;
                    font-size: 16px;
                    line-height: 35px;
                }
            }
            /*投注成功*/
            .bet-success {
                padding-top: 10px;
                text-align: center;
                color: #fff;
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-success.png") no-repeat center;
                    background-size: cover;
                    width: 37px;
                    height: 37px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 30px;
                }
                .bet-m {
                    width: percentage(250/290);
                    margin: 0 auto;
                    text-align: left;
                    line-height: 16px;
                    font-size: 14px;
                }
                .btn-box {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 10px;
                    width: percentage(250/290);

                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    a {
                        display: block;
                        text-align: center;
                        color: #fff;
                        overflow: hidden;
                        width: percentage(120/250);
                        height: 34px;
                        line-height: 34px;
                        border-radius: 6px;
                        &:hover{
                            filter: brightness(1.3);
                        }
                    }
                    .bet-btnV {
                        border: 1px solid #fff;
                    }
                    .bet-btnB {
                        background: #f67c22;
                        font-weight: bold;
                    }
                }
            }
            /*投注失败*/
            .bet-fail {
                padding-top: 10px;
                text-align: center;
                color: #fff;
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-fail.png") no-repeat center;
                    background-size: cover;
                    width: 37px;
                    height: 37px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 30px;
                }
                .bet-m {
                    width: percentage(250/290);
                    margin: 0 auto;
                    text-align: left;
                    line-height: 16px;
                    font-size: 14px;
                }
                .btn-fail {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    color: #a42f61;
                    font-weight: bold;
                    background: #fff;
                    font-size: 16px;
                    line-height: 35px;
                }
            }
            /*余额不足*/
            .bet-balance {
                padding-top: 10px;
                text-align: center;
                color: #fff;
                .bet-icon {
                    overflow: hidden;
                    background: url("../../assets/img/oneToKen/bet-balance.png") no-repeat center;
                    background-size: cover;
                    width: 39px;
                    height: 37px;
                    margin: 0 auto 2/2px;
                }
                .bet-t {
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 30px;
                }
                .bet-m {
                    width: percentage(250/290);
                    margin: 0 auto;
                    text-align: left;
                    line-height: 16px;
                    font-size: 14px;
                }
                .btn-fail {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    color: #a42f61;
                    font-weight: bold;
                    background: #fff;
                    font-size: 16px;
                    line-height: 35px;
                }
            }
            .bet-normal,
            .bet-success,
            .bet-fail,
            .bet-balance {
                display: none;
            }
            &.normal {
                background: #5b2fa4;
                transform: translateY(0);
                .bet-normal {
                    display: block;
                }
            }
            &.success {
                background: #3fc06f;
                transform: translateY(0);
                .bet-success {
                    display: block;
                }
            }
            &.fail {
                background: #a42f61;
                transform: translateY(0);
                .bet-fail {
                    display: block;
                }
            }
            &.balance {
                background: #5b2fa4;
                transform: translateY(0);
                .bet-balance {
                    display: block;
                }
            }
        }
        .item-popular {
            position: relative;
            border-radius: 6px;
            background: linear-gradient(to right top, #4e1b70, #57204f);
            width: percentage(690/750);
            margin: 40/2px auto 0;
            padding: 24/2px 38/2px 24/2px;
            transition: all 0.2s;
            .title {
                color: #fff;
                font-weight: bold;
                .t1 {
                    line-height: 70/2px;
                    font-size: 58/2px;
                    i{
                        font-size:20px;
                    }
                }
                .t2 {
                    line-height: 52/2px;
                    font-size: 38/2px;
                }
            }
            .msg {
                color: #a99acc;
                font-size: 22/2px;
                line-height: 34/2px;
                margin-top: 74/2px;
                p {
                    overflow: hidden;
                }
                i {
                    font-size: 25/2px;
                }
            }
        }

        .item-common {
            position: relative;
            border-radius: 6px;
            width: percentage(690/750);
            margin: 0 auto;
            padding: 0 38/2px 38/2px;
            overflow: hidden;
            .token-process {
                transform: scale(75/102);
                top: 40/2px;
                right: 48/2px;
            }
            .title {
                color: #fff;
                padding-top: 50/2px;
                .t1 {
                    font-weight: bold;
                    font-size: 76/2px;
                    line-height: 80/2px;
                    i{
                        font-size:26px;
                    }
                }
                .t2 {
                    font-size: 33/2px;
                    line-height: 45/2px;
                }
            }
            .msg {
                color: #a99acc;
                margin: 30/2px 0 0;
                padding: 0;
                line-height: 42/2px;
                font-size:28/2px;
            }
            .btn {
                &.btn-waiting{
                }
            }
            &.bg1 {
                background: linear-gradient(#412057, #4c2552);
            }
            &.bg2 {
                background: linear-gradient(#412057, #3e2568);
            }
            &+.item-common {
                margin-top: 20px;
            }
        }

        .item-history {
            position: relative;
            background: #361845;
            border-radius: 6px;
            padding: 20/2px 24/2px 15/2px;
            .icon-mywin{
                position: absolute;
                top: 3px;
                right: 3px;
                font-size: 14px;
                font-weight: bold;
                color: #fff;
                line-height: 18px;
                border-radius: 2px;
                padding: 0 4px;
                background: #f65555;
            }
            .token-process {
                top: 20/2px;
                right: 24/2px;
                transform: scale(27/102);
            }
            .title {
                color: #fff;
                .t1 {
                    font-weight: bold;
                    height: 35/2px;
                    line-height: 35/2px;
                    font-size: 32/2px;
                    i{
                        font-size:12px;
                    }
                }
                .t2 {
                    padding-top: 5px;
                    line-height: 24/2px;
                    font-size: 16/2px;
                }
            }
            .msg {
                color: #a99acc;
                margin-top: 10px;
                line-height: 18/2px;
                font-size: 16/2px;
            }
            .result {
                position: relative;
                overflow: hidden;
                font-weight: bold;
                height: 24/2px;
                line-height: 24/2px;
                font-size: 18/2px;
                margin-top: 22/2px;
                &.expired {
                    color: #a99acc;
                    font-weight: normal;
                }
                &.waiting {
                    color: #fff;
                }
                &.win {
                    color: #fdc90c;
                    padding-left: 46/2px;
                    &::before {
                        content: "";
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 26/2px;
                        height: 24/2px;
                        overflow: hidden;
                        background: url("../../assets/img/oneToKen/icon-Winning.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
            &.item-history {
                margin-top: 10px;
            }
        }

        .item-tltle {
            position: relative;
            width: percentage(690/750);
            height:55px;
            overflow: hidden;
            margin:10px auto 0;
            color: #fff;
            height: 104/2px;
            margin-top: 30/2px;
            
            >div{
                display: flex;
                height: 100%;
                line-height: 110/2px;
                font-size: 12px;
            }
            .t1{
                line-height: 104/2px;
                font-size: 20px;
                font-weight: bold;
            }
            .msg{
                margin-left: 18px;
            }
            .btn-play{
                margin-left: 10px;
                text-decoration: underline;
                color: #fff;
            }
            .btn-more{
                color: #aa85ff;
            }
        }

        .recentBets {
            width: 92%;
            margin: 0 auto;
            .t1 {
                color: #fff;
                padding-top: 30/2px;
                line-height: 74/2px;
                font-size: 42/2px;
                font-weight: bold;
            }
            ul{
                border-top: 1px solid #412057;
            }
            li {
                position: relative;
                color: #fff;
                height: 58px;
                overflow: hidden;
                border-bottom: 1px solid #412057;
                .email {
                    width: 60%;
                    line-height: 50px;
                    font-size: 20px;
                    .text-overflow();
                }
                .amount {
                    margin-top: 10px;
                    width: 40%;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: right;
                    .text-overflow();
                }
                .time {
                    position: absolute;
                    right: 0;
                    bottom: 10px;
                    line-height: 18px;
                    font-size: 14px;
                    color: #a99acc;
                }
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    left: 162px;
                    top: 12px;
                }
                &.icon-eth {
                    &::before {
                        background: url("../../assets/img/oneToKen/eth-input.png");
                        background-size: cover;
                        width: 16px;
                        height: 16px;
                    }
                }
                &.icon-bth {
                    &::before {
                        background: url("../../assets/img/oneToKen/btc-input.png");
                        background-size: cover;
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }

        .icon-hot{
            .icon-hot{
                display: block;
            }
        }
        .icon-mybet{
            .icon-bet{
                display: block;
            }
        }
    }


    /deep/ .nomsg{
        padding: 10px 0;
        img{
            display: block;
            margin: 0 auto;
        }
        p{
            line-height:44px;
            text-align: center;
            font-size:12px;
            color: #a99acc;
        }
        a{
            color: #aa85ff;
            &:hover{
                color: #7e5bcf;
            }
        }
    }
    /* xs超小屏幕（手机，大于 480） */
    @media (min-width: @screen-phone) {

    }
    /* sm小屏幕（平板，大于等于 768px） */

    @media (min-width: @screen-tablet) {
        /deep/
        .oneToKen {
            .item-popular,
            .item-common,
            .recentBets,
            .history {
                width: 100%;
            }
            .btn {
                &:hover {
                    background: #6237c3;
                    color: #fff;
                }
            }
            .recentBets {
                .t1 {
                    padding-top: 0;
                }
            }
            .item-history {
                .msg,
                .result {
                    line-height: 18px;
                    font-size: 12px;
                }
                .result {
                    height: 18px;
                    &.win {
                        &::before {
                            top: 3px;
                        }
                    }
                }
            }
            .icon-mybet{
                &::after{
                    top:70px;
                    left: 120px;
                }
            }
        }

    }

    /* md中等屏幕（桌面显示器，大于等于 992px） */

    @media (min-width: @screen-desktop) {
        /deep/
        .oneToKen {
            /*投注*/
            .betting {
                /*.bet-close {*/
                    /*display: block;*/
                    /*position: absolute;*/
                    /*right: 0px;*/
                    /*top: 0px;*/
                    /*background: url("../../assets/img/oneToKen/close-bet.png") no-repeat center;*/
                    /*background-size: 12px;*/
                    /*padding: 10px;*/
                    /*width: 30px;*/
                    /*height: 30px;*/
                    /*&:hover {*/
                        /*transform: rotate(90deg);*/
                    /*}*/
                /*}*/
                /*.bet-normal {*/
                    /*.bet-t {*/
                        /*line-height: 20px;*/
                        /*font-size: 16px;*/
                    /*}*/
                    /*.bet-m {*/
                        /*font-size: 12px;*/
                        /*line-height: 17px;*/
                    /*}*/
                    /*.bet-amount {*/
                        /*margin: 15px auto 0;*/
                        /*a {*/
                            /*height: 22px;*/
                            /*line-height: 22px;*/
                            /*font-size: 12px;*/
                            /*&:hover{*/
                                /*background: #633fb6;*/
                            /*}*/
                        /*}*/
                    /*}*/
                    /*.bet-input {*/
                        /*height: 32px;*/
                        /*line-height: 32px;*/
                        /*a {*/
                            /*font-size: 12px;*/
                            /*&:hover {*/
                                /*background: #633fb6;*/
                            /*}*/
                        /*}*/
                        /*input {*/
                            /*height: 32px;*/
                            /*font-size: 14px;*/
                        /*}*/
                    /*}*/
                    /*.bet-btn {*/
                        /*height: 34px;*/
                        /*line-height: 34px;*/
                        /*margin: 10px 0 0 0;*/
                        /*&:hover,*/
                        /*&:active {*/
                            /*background: #dd6d1b;*/
                        /*}*/
                    /*}*/
                /*}*/
                /*.bet-success {*/
                    /*.bet-icon {*/
                        /*width: 37px;*/
                        /*height: 37px;*/
                        /*margin: 0 auto 4px;*/
                    /*}*/
                    /*.bet-t {*/
                        /*font-size: 14px;*/
                        /*line-height: 22px;*/
                    /*}*/
                    /*.bet-m {*/
                        /*line-height: 14px;*/
                        /*font-size: 12px;*/
                    /*}*/
                    /*.btn-box {*/
                        /*margin-top: 12px;*/
                        /*a {*/
                            /*height: 34px;*/
                            /*line-height: 34px;*/
                            /*border-radius: 6px;*/
                            /*font-size: 14px;*/
                        /*}*/
                        /*.bet-btnV {*/
                            /*border: 1px solid #9e8dc7;*/
                            /*&:hover {*/
                                /*background: #633fb6;*/
                            /*}*/
                        /*}*/
                        /*.bet-btnB {*/
                            /*background: #f67c22;*/
                            /*font-weight: bold;*/
                            /*&:hover {*/
                                /*background: #df6911;*/
                            /*}*/
                        /*}*/
                    /*}*/
                /*}*/
                /*.bet-fail {*/
                    /*.bet-icon {*/
                        /*width: 37px;*/
                        /*height: 37px;*/
                        /*margin: 0 auto;*/
                    /*}*/
                    /*.bet-t {*/
                        /*font-size: 14px;*/
                        /*line-height: 26px;*/
                    /*}*/
                    /*.bet-m {*/
                        /*margin-top: 5px;*/
                        /*line-height: 14px;*/
                        /*font-size: 12px;*/
                    /*}*/
                    /*.bet-fail {*/
                        /*height: 34px;*/
                        /*line-height: 34px;*/
                        /*font-size: 14px;*/
                        /*margin-top: 19px;*/
                        /*&:hover {*/
                            /*background: #a99acc;*/
                        /*}*/
                    /*}*/
                /*}*/
                /*.bet-balance {*/
                    /*.bet-icon {*/
                        /*width: 37px;*/
                        /*height: 37px;*/
                        /*margin: 0 auto;*/
                    /*}*/
                    /*.bet-t {*/
                        /*font-size: 14px;*/
                        /*line-height: 26px;*/
                    /*}*/
                    /*.bet-m {*/
                        /*margin-top: 5px;*/
                        /*line-height: 14px;*/
                        /*font-size: 12px;*/
                    /*}*/
                    /*.btn-box {*/
                        /*margin-top: 20px;*/
                        /*a {*/
                            /*height: 34px;*/
                            /*line-height: 32px;*/
                            /*border-radius: 6px;*/
                            /*font-size: 14px;*/
                        /*}*/
                        /*.bet-btnT {*/
                            /*border: 1px solid #9e8dc7;*/
                            /*&:hover {*/
                                /*background: #633fb6;*/
                            /*}*/
                        /*}*/
                        /*.bet-btnR {*/
                            /*background: #f67c22;*/
                            /*font-weight: bold;*/
                            /*&:hover {*/
                                /*background: #df6911;*/
                            /*}*/
                        /*}*/
                    /*}*/
                /*}*/
            }
        }
    }

    /* lg大屏幕（大桌面显示器，大于等于 1200px） */

    @media (min-width: @screen-lg-desktop) {
        .msg-winning {
            height: 70px;
            line-height: 70px;
            font-size: 26px; //padding-top:percentage(70/1190);
            i {
                font-size: 34px;
            }
        }
        /deep/
        .oneToKen {
            .main {
                padding: 32px 0 100px 0;
            }
            .for-full {
                margin: 0;
            }
            .item-popular {
                width: 100%;
                padding: 20px 30px 80px;
                margin: 0;
                .token-process {
                    top: 83px;
                    right: 40px;
                    transform: scale(1);
                }
                .title {
                    .t1 {
                        line-height: 44px;
                        font-size: 36px;
                        i{
                            font-size:36px;
                        }
                    }
                    .t2 {
                        line-height: 32px;
                        font-size: 24px;
                    }
                }
                .msg {
                    font-size: 16px;
                    line-height: 26px;
                    margin-top: 16px;
                    i {
                        font-size: 16px;
                    }
                }
            }
            .item-common {
                width: 100%;
                padding: 0 30px 48px;
                .token-process {
                    transform: scale(62/102);
                    top: 86px;
                    right: 22px;
                }
                .title {
                    padding: 23px 0 0;
                    .t1 {
                        font-size: 32px;
                        height: 28px;
                        line-height: 28px;
                        i {
                            font-size: 22px;
                        }
                    }
                    .t2 {
                        font-size: 14px;
                        line-height: 32px;
                    }
                }
                .msg {
                    margin: 5px 0 0 0;
                    line-height: 20px;
                    font-size:12px;
                    i{
                        font-size:14px;
                    }
                }
                .btn {
                    margin: 18px 0 0 0;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    &.btn-waiting{
                        text-indent:10px;
                    }
                }
                &+.item-common {
                    margin-top: 10px;
                }
            }
            .item-history {
                padding: 22px 40px 16px;
                .token-process {
                    top: 18px;
                    right: 40px;
                    transform: scale(46/102);
                }
                .title {
                    .t1 {
                        height: 24px;
                        line-height: 24px;
                        font-size: 28px;
                        i {
                            font-size: 18px;
                        }
                    }
                    .t2 {
                        line-height: 20px;
                        font-size: 12px;
                    }
                }
                .msg {
                    margin-top: 14px;
                    line-height: 16px;
                    font-size: 12px;
                }
                .result {
                    height: 24px;
                    line-height: 24px;
                    font-size: 14px;
                    margin-top: 14px;
                    &.waiting {}
                    &.win {
                        padding-left: 46px;
                        &::before {
                            width: 26px;
                            height: 24px;
                            background-size: cover;
                        }
                    }
                }
                &.item-history {
                    margin-top: 0px;
                }
            }
            .item-tltle {
                width: 100%;
                max-width: 1190px;
                height: 70px;
                margin-top: 5px;
                >div{
                    line-height: 72px;
                    font-size: 14px;
                }
                .t1{
                    line-height: 70px;
                    font-size: 20px;
                }
                .msg{
                    margin-left: 18px;
                }
                .btn-play{
                    margin-left: 10px;
                }
                a{
                    &:hover{
                        color: #6237c3;
                    }
                }
            }
            .recentBets{
                width: 270px;
            }
        }
    }

</style>




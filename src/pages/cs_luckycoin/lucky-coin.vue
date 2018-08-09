<template>
    <div class="page-luckycoin">
        <Header></Header>
        <router-view ref="child"></router-view>
        <Footer></Footer>
        <!--show-->
        <div class="msg-winning" :class="{ show: otherWin.isShow }">
            Congratulation！ {{ otherWin.name }} <i>WIN {{ otherWin.num }} {{ otherWin.type }}</i>
        </div>
        <!--:class="{show:selfWin.isShow}"-->
        <div class="self-winning hide">
            <div class="main2">
                <div class="bounceIn animated">
                    <a href="javascript:;" class="close" @click="hideMyWin"></a>
                    <p class="p1">Congratulate! </p>
                    <p class="p2">you have just won No.{{selfWin.exceptId}}</p>
                    <p class="p3">
                        +{{selfWin.num}}<i>{{selfWin.type}}</i>
                    </p>
                    <router-link :to="{path: '/luckycoin/drawHistory', query: { entry: 'myBids' }}" class="btn-see" @click.native="hideMyWinHandler">
                        <lang>See My Bids</lang>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Header from '~components/Header.vue'
import Footer from '~components/Footer.vue'
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {
            profitPopPromise: null
        }
    },
    components: { Header, Footer },
    mounted () {
        this.$store.dispatch('subInLuckyCoin')
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getLastProfit()
        })
    },
    methods: {
        ...mapActions('cs_luckycoin', ['hideMyWin', 'showMyWin', 'getLastProfitRecord', 'showProfitCallback']),
        getLastProfit () {
            this.getLastProfitRecord()
                .then(res => {
                    return {
                        data: {
                            goods: [{luckyNum: 1111111, goodsType: '2001', goodsValue: '10.8', exceptid: '10000'}, {luckyNum: 2222, goodsType: '2001', goodsValue: '5.8', exceptid: '1000'}]
                        }
                    }
                })
                .then(res => {
                    if (res.data.goods.length > 0) {
                        this.showProfitPop(res.data.goods, 0, res.data.goods.length)
                    }
                })
        },
        showProfitPop (goods, index, total) {
            let good = goods[index]
            this.showMyWin({
                goodsValue: good.goodsValue,
                goodsType: good.goodsType,
                exceptId: good.exceptid,
                callback: () => {
                    if (index < total - 1) {
                        this.showProfitPop(goods, index + 1, total)
                    }
                }
            })
        },
        hideMyWinHandler () {
            this.$refs.child && this.$refs.child.changeToMyBets && this.$refs.child.changeToMyBets()
            this.hideMyWin()
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
        margin: 20px 0 30px 0;
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
<style  lang="less" type="text/less">
    @import "../../styles/lib-mixins.less";
    @import "../../styles/lib-media.less";
    .page-luckycoin{
        display: flex;
        flex-direction: column;
        .more-bids-page{
            flex: 1;
        }
        .nomsg{
            margin: 30px auto;
            text-align: center;
            color: #766490;
            img{
                margin: 0 auto;
            }
            a{
                &:hover{
                    color: currentColor;
                    filter: brightness(1.3);
                }
            }

        }
    }

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
        .main2{
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
    .page-luckycoin{
        background: #2a1236 url("../../assets/img/luckyCoin/bg-page.jpg") no-repeat center top;
        background-size: 1920px;
        .lucky-index{
            padding: 36px 0 50px 0;
        }
        .title{
            height: 76px;
            padding-top: 5px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left,.right{
                height: 27px;
                display: flex;
                flex-direction: row;
                align-items: baseline;
            }
            .t1{
                margin-right: 20px;
                font-size: 20px;
                font-weight: bold;
            }
            .t2{
                margin-right: 10px;
                font-size: 14px;
            }
            .play,.check{
                font-size: 14px;
                color: #fff;
                text-decoration: underline;
            }
            .btn-more{
                color: #aa85ff;
                line-height: 30px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        .for-full{
            margin: 0 -5px;
            width: 92%;
            margin: 0 auto;
        }
        .main{
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }
        .banner{
            border-radius: 6px;
            overflow: hidden;
            a,img{
                display: block;
                width: 100%;
                max-width: 790px;
                margin: 0 auto;
            }
            .el-carousel__container{
                height:0;
                padding-top:percentage(270/790);
                border-radius: 6px;
                overflow: hidden;
            }
        }
        .match{
            display: block;
            position: relative;
            background: #412057;
            border-radius: 6px;
            overflow: hidden;
            /*icon 没做common和popular区分*/
            .icon-box{
                position: absolute;
                top: 3px;
                right: 1px;
                i{
                    display: none;
                    border-radius: 2px;
                    float: right;
                    margin-right: 3px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #fff;
                    line-height: 18px;
                }
                .icon-hot{
                    background: #f65555;
                    padding: 0 4px;
                }
                .icon-youbet{
                    background: #7b4de4;
                    padding: 0 10px;
                }
                &.hot{
                    .icon-hot{
                        display: block;
                    }
                }
                &.bet{
                    .icon-youbet{
                        display: block;
                    }
                }
            }
            .match-img{
                position: absolute;
                &.match-eth{
                    background: url("../../assets/img/luckyCoin/icon-eth.png") no-repeat center;
                }
                &.match-btc{
                    background: url("../../assets/img/luckyCoin/icon-btc.png") no-repeat center;
                }
            }
            .match-prize{
                font-weight: bold;
                color: #fff;
                .payfor{
                    display: none;
                }
            }
            .match-usd{
                color: #fff;
            }
            .match-issue,.match-process,.match-price{
                color: #a99acc;
            }
            .match-btn{
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                text-align: center;
                color: #fff;
                font-weight: bold;
                background: #7b4de4;
                &.waiting{
                    cursor: default;
                    background: rgba(123,77,228,0.2);
                    color: rgba(255,255,255,0.5);
                }
                &:not(.waiting):hover{
                    background: #6237c3;
                }
            }
            &:hover{
                filter: brightness(1.3);
            }
        }
        .bet-{
            transform: translateY(100%);
            transition: all 0.2s ease-in-out;
            &.show{
                transform: translateY(0);
            }
        }
        .bet-normal{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #5b2fa4;
            color: #fff;
            padding: 10px 13px 0;
            .bet-close{
                display: block;
                position: absolute;
                right: 5px;
                top: 5px;
                background: url("../../assets/img/luckyCoin/close-bet.png") no-repeat center;
                background-size: cover;
                width: 26px;
                height: 26px;
            }
            .bet-t{
                line-height: 52px;
                font-size: 32px;
                font-weight: bold;
                span,i{
                    font-size: 22px;
                }
            }
            .bet-m1{
                line-height: 18px;
                font-size: 16px;
            }
            .bet-m2{
                line-height: 13px;
                font-size: 12px;
            }
            .input-box{
                position: relative;
                height: 38px;
                margin: 6px 0 25px 0;
                overflow: hidden;
                line-height: 36px;
                border: 1px solid #a99acc;
                border-radius: 6px;
                font-size: 16px;
                display: flex;
                input{
                    width: percentage(130/260);
                    outline: none;
                    border: none;
                    background: transparent;
                    text-indent: 38px;
                }
                a{
                    flex: 1;
                    display: block;
                    width: percentage(43/260);
                    text-align: center;
                    border-left: 1px solid #a99acc;
                    color: #fff;
                    font-size: 16px;
                    background: #4b2688;
                    &:hover{
                        background: #412057;
                    }
                }
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    left: 11px;
                    top: 9px;
                    width: 16px;
                    height: 16px;
                }
                &.icon-eth{
                    &::before{
                        background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
                &.icon-btc{
                    &::before{
                        background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
            .btn-bet{
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                text-align: center;
                color: #fff;
                font-weight: bold;
                background: #f67c22;
                line-height: 35px;
                font-size: 16px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        .bet-success{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #3fc06f;
            color: #fff;
            padding: 11px percentage(20/290) 0;
            .bet-close{
                display: block;
                position: absolute;
                right: 5px;
                top: 5px;
                background: url("../../assets/img/luckyCoin/close-bet.png") no-repeat center;
                background-size: cover;
                width: 26px;
                height: 26px;
            }
            .bet-icon{
                width: 37px;
                height: 37px;
                background: url("../../assets/img/luckyCoin/bet-success.png") no-repeat center;
                background-size: cover;
                margin: 0 auto;
            }
            .bet-t{
                margin-top: 4px;
                line-height: 24px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            }
            .bet-m{
                max-height: 17*4px;
                overflow: hidden;
                line-height: 17px;
                font-size: 14px;
            }
            .btn-box{
                position: absolute;
                left: percentage(20/290);
                bottom: 10px;
                display: flex;
                justify-content: space-between;
                width: percentage(250/290);
                height: 34px;
                a{
                    display: block;
                    overflow: hidden;
                    width: 48%;
                    height: 34px;
                    text-align: center;
                    line-height: 34px;
                    border-radius: 6px;
                    font-size: 16px;
                    color: #fff;
                    font-weight: bold;

                }
                .bet-btnV{
                    border: 1px solid #fff;
                    &:hover{
                        border-color: #f67c22;
                        background: #f67c22;
                        color: #fff;
                    }
                }
                .bet-btnB{
                    background: #f67c22;
                    &:hover{
                        filter: brightness(1.3);
                    }
                }
            }
        }
        .bet-fail{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #a42f61;
            color: #fff;
            padding: 11px percentage(20/290) 0;
            .bet-close{
                display: block;
                position: absolute;
                right: 5px;
                top: 5px;
                background: url("../../assets/img/luckyCoin/close-bet.png") no-repeat center;
                background-size: cover;
                width: 26px;
                height: 26px;
            }
            .bet-icon{
                width: 37px;
                height: 37px;
                background: url("../../assets/img/luckyCoin/bet-fail.png") no-repeat center;
                background-size: cover;
                margin: 0 auto;
            }
            .bet-t{
                margin-top: 4px;
                line-height: 24px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            }
            .bet-m{
                max-height: 17*4px;
                overflow: hidden;
                line-height: 17px;
                font-size: 14px;
            }
            .btn-fail{
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                text-align: center;
                color: #a42f61;
                font-weight: bold;
                background: #ffffff;
                line-height: 35px;
                font-size: 16px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        .bet-balance{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #5b2fa4;
            color: #fff;
            padding: 11px percentage(20/290) 0;
            .bet-close{
                display: block;
                position: absolute;
                right: 5px;
                top: 5px;
                background: url("../../assets/img/luckyCoin/close-bet.png") no-repeat center;
                background-size: cover;
                width: 26px;
                height: 26px;
            }
            .bet-icon{
                width: 39px;
                height: 37px;
                background: url("../../assets/img/luckyCoin/bet-balance.png") no-repeat center;
                background-size: cover;
                margin: 0 auto;
            }
            .bet-t{
                margin-top: 4px;
                line-height: 24px;
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            }
            .bet-m{
                max-height: 17*4px;
                overflow: hidden;
                line-height: 17px;
                font-size: 14px;
            }
            .btn-balance{
                position: absolute;
                left: 0;
                bottom: 0;
                display: block;
                width: 100%;
                text-align: center;
                color: #fff;
                font-weight: bold;
                background: #f67c22;
                line-height: 35px;
                font-size: 16px;
                &:hover{
                    filter: brightness(1.3);
                }
            }
        }
        .match.match-popular{
            transform: translate3d(0,0,0);
            margin-top: 20px;
            padding: 26px 30px 74px;
            .match-img{
                width: 102px;
                height: 102px;
                right: 22px;
                bottom: 70px;
                svg{
                    //transform-origin: left top;
                    //transform: scale(102/102);
                }
                background-size: 73px;
            }
            .match-prize{
                line-height: 46px;
                font-size: 36px;
                .payfor{
                    display: inline-block;
                }
            }
            .match-usd{
                line-height: 34px;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 12px;
            }
            .match-issue,.match-process,.match-price{
                line-height: 26px;
                font-size: 16px;
            }
            .match-btn{
                line-height: 50px;
                font-size: 20px;
            }
            .bet-normal{
                padding: 10px 48px 0;
                .bet-t{
                    line-height: 52px;
                    margin-bottom: 10px;
                    span,i{
                        font-size: 22px;
                    }
                }
                .input-box{
                    height: 48px;
                    line-height: 48px;
                    font-size: 20px;
                    input{
                        text-indent: 50px;
                    }
                    &::before{
                        top: 15px;
                    }
                }
                .btn-bet{
                    line-height: 50px;
                    font-size: 20px;
                }
            }
            .bet-success{
                padding: 26px percentage(22/390) 0;
                .bet-t{
                    line-height: 34px;
                }
                .bet-m{
                    margin-top: 14px;
                }
                .btn-box{
                    left: percentage(22/390);
                    bottom: 17px;
                    width: percentage(346/390);
                    height: 44px;
                    a{
                        width: 48%;
                        height: 44px;
                        line-height: 44px;
                        font-size: 20px;
                    }
                }
            }
            .bet-fail{
                padding: 26px percentage(22/390) 0;
                .bet-t{
                    line-height: 34px;
                }
                .bet-m{
                    margin-top: 14px;
                }
                .btn-fail{
                    line-height: 50px;
                    font-size: 20px;
                }
            }
            .bet-balance{
                padding: 26px percentage(22/390) 0;
                .bet-t{
                    line-height: 34px;
                }
                .bet-m{
                    margin-top: 14px;
                }
                .btn-balance{
                    line-height: 50px;
                    font-size: 20px;
                }
            }

        }
        .match.match-common{
            padding: 15px 25px 50px;
            .match-img{
                width: 62px;
                height: 62px;
                right: 20px;
                bottom: 48px;
                svg{
                    transform-origin: left top;
                    transform: scale(62/102);
                }
                background-size: 42px;
            }
            .match-prize{
                line-height: 40px;
                font-size: 32px;
                i{
                    font-size: 22px;
                }
            }
            .match-usd{
                line-height: 22px;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .match-issue,.match-process,.match-price{
                line-height: 20px;
                font-size: 12px;
            }
            .match-btn{
                line-height: 35px;
                font-size: 16px;
            }
            &+.match-common{
                margin-top: 10px;
            }
        }
        .recent-bets{
            ul{
                clear: both;
                color: #fff;
                border-bottom: 1px solid #412057;
            }
            li{
                position: relative;
                height: 58px;
                border-top: 1px solid #412057;
                overflow: hidden;
            }
            .email{
                float: left;
                width: 60%;
                line-height: 50px;
                font-size: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .amount{
                position: relative;
                float: right;
                padding-right: 26px;
                margin-top: 12px;
                width: 40%;
                line-height: 16px;
                font-size: 14px;
                text-align: right;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 16px;
                    height: 16px;
                }
                &.icon-eth{
                    &::after{
                        background: url("../../assets/img/luckyCoin/icon-eth-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
                &.icon-btc{
                    &::after{
                        background: url("../../assets/img/luckyCoin/icon-btc-sm.png") no-repeat center;
                        background-size: cover;
                    }
                }
            }
            .time{
                position: absolute;
                right: 26px;
                bottom: 7px;
                line-height: 22px;
                font-size: 14px;
                color: #a99acc;
            }
        }
        .history{
            display: block;
            position: relative;
            background: url("../../assets/img/luckyCoin/bg-history.png") no-repeat right bottom, linear-gradient(to right,#7c6238,#4e3c27);
            padding: 14px percentage(26/290) 54px;
            color: #fff;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 10px;
            .history-prize{
                font-weight: bold;
                line-height: 32px;
                font-size: 28px;
                i{
                    font-size: 18px;
                }
            }
            .history-usd{
                margin-bottom: 4px;
                line-height: 18px;
                font-size: 14px;
            }
            .history-issue,.history-time,.isExpired{
                line-height: 20px;
                font-size: 12px;
            }
            .history-issue{
                a{
                    color: #fff;
                    &:hover{
                        color: #ffca28;
                    }
                }
            }
            .history-time{
                i{
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .isExpired{
                font-size: 16px;
                font-weight: bold;
            }
            .isExpired-msg{
                margin-top: 2px;
                line-height: 22px;
                font-size: 14px;
            }
            &::before {
                content: '';
                display: block;
                width: 48px;
                height: 64px;
                position: absolute;
                right: 27px;
                bottom: 50px;
            }
            &.icon-eth{
                &::before{
                    background: url("../../assets/img/luckyCoin/icon-eth-win.png") no-repeat center;
                    background-size: cover;
                }
            }
            &.icon-btc{
                &::before{
                    background: url("../../assets/img/luckyCoin/icon-btc-win.png") no-repeat center;
                    background-size: cover;
                }
            }
            .history-result{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 28px;
                line-height: 28px;
                text-indent:50px;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                background: #ffca28;
                font-size: 14px;
                font-weight: bold;
                color: #755c35;
                .text-overflow();
                &::before{
                    content: '';
                    display: block;
                    position: absolute;
                    top: 7px;
                    left: 27px;
                    width: 16px;
                    height: 14px;
                    overflow: hidden;
                    background: url("../../assets/img/luckyCoin/icon-champion.png") no-repeat center;
                    background-size: cover;
                }
            }
            &.win{
                .history-result{
                    background: #20bf6b;
                    color: #fff;
                    &::before{
                        background: url("../../assets/img/luckyCoin/icon-champion-win.png") no-repeat center;
                        background-size: cover;

                    }
                }
                &::after{
                    content: '';
                    display: block;
                    position: absolute;
                    right: 10px;
                    bottom: 2px;
                    width: 47px;
                    height: 46px;
                    background: url("../../assets/img/luckyCoin/icon-win.png") no-repeat center;
                    background-size: cover;
                }
            }
            &.expired{
                padding-bottom: 10px;
                background: #401f56;
                &::before{
                    display: none;
                }
            }
            &:hover{
                filter: brightness(1.3);
            }
        }
    }


    @media (max-width: @screen-phone) {
        .page-luckycoin{
            .title{
                height: 52px;
                padding-top: 15px;
                .left,.right{
                    height: 27px;
                }
                .t1{
                    margin-right: 10px;
                    font-size: 14px;
                }
                .t2{
                    margin-right: 10px;
                    font-size: 12px;
                }
                .play,.check{
                    font-size: 12px;
                }
                .btn-more{
                    line-height: 20px;
                }
            }
        }
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
        .page-luckycoin{
            .history{
                margin-bottom: 0;
            }
            .match.match-popular{
                margin-top: 0;
            }
            .recent-bets{
                margin-left: 30px;
            }
        }
    }
</style>




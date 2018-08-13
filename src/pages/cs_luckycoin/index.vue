<template>
    <div class="lucky-index">
        <div class="main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="banner">
                            <el-carousel :interval="3000" arrow="always">
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                                <el-carousel-item>
                                    <a href="javascript:;" rel="nofollow">
                                        <img src="../../assets/img/luckyCoin/banner.jpg" alt="">
                                    </a>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <bet-box :bet="betsList[0]" :is-popular="true" :class="[isShowNew? 'for-new':'']" id="popular-box"></bet-box>
                        <div class="pop-mask" :class="[isShowNew ? '' : 'hide']"></div>
                        <div class="pop-new" :class="[isShowNew ? '' : 'hide']">
                            <div class="step bounceIn animated step1" :class="[isShowStep1 ? '' : 'hide']">
                                <p>
                                    Here is the bonus: pick a lucky <br>
                                    user through the blockchain
                                </p>
                                <a href="javascript:;" class="btn-next" @click="isShowStep1 = false, isShowStep2 = true">Next</a>
                                <img src="../../assets/img/luckyCoin/line.png" alt="">
                            </div>
                            <div class="step bounceIn animated step2" :class="[isShowStep2 ? '' : 'hide']">
                                <p>
                                    Here is the remaining bet amount:  <br>
                                    you can draw a lot when you buy it..
                                </p>
                                <a href="javascript:;" class="btn-next" @click="isShowStep2 = false, isShowStep3 = true">Next</a>
                                <img src="../../assets/img/luckyCoin/line.png" alt="">
                            </div>
                            <div class="step bounceIn animated step3" :class="[isShowStep3 ? '' : 'hide']">
                                <img src="../../assets/img/luckyCoin/line.png" alt="">
                                <p>
                                    Click here to bet: the more bets,<br>
                                    the higher the probability of winning.
                                </p>
                                <a href="javascript:;" class="btn-next" @click="isShowNew = false">ok</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row">
                            <div class="col-xs-12 ">
                                <div class="title">
                                    <div class="left">
                                        <p class="t1">Bet For The Prize</p>
                                        <p class="t2 hidden-xs hidden-sm">All or nothing, small cost,  big profit</p>
                                        <a href="#app" class="play" @click="howToPlayHandler">
                                            How To Play ？
                                        </a>
                                    </div>
                                    <div class="right">
                                        <router-link :to="{path:'/luckycoin/moreBids'}" class="btn-more">
                                            <lang>More ></lang>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <bet-box :bet="betsList[1]"></bet-box>
                                <bet-box :bet="betsList[4]"></bet-box>
                            </div>
                            <div class="col-md-6 col-lg-4 hidden-xs hidden-sm">
                                <bet-box :bet="betsList[2]"></bet-box>
                                <bet-box :bet="betsList[5]"></bet-box>
                            </div>
                            <div class="col-lg-4 hidden-xs hidden-xs hidden-sm hidden-md">
                                <bet-box :bet="betsList[3]"></bet-box>
                                <bet-box :bet="betsList[6]"></bet-box>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="recent-bets">
                            <div class="title">
                                <div class="left">
                                    <p class="t1">Recent Bets</p>
                                </div>
                            </div>
                            <recent-bets :data="recentBetsList"></recent-bets>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 ">
                        <div class="title">
                            <div class="left">
                                <p class="t1">Draw History</p>
                                <p class="t2  hidden-xs hidden-sm">Fair Open，Draw in blockchain</p>
                                <router-link :to="{path:'/check'}" class="check">
                                    Check Transparency >
                                </router-link>
                            </div>
                            <div class="right">
                                <router-link :to="{path: '/luckycoin/drawHistory'}" class="btn-more">
                                    <lang>More >></lang>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[0]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[1]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[2]"></history-bet-box>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <history-bet-box :bet="drawHistoryList[3]"></history-bet-box>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapActions, mapState } from 'vuex'
    import betBox from './components/bet-box'
    import recentBets from './components/recent-bets'
    import historyBetBox from './components/history-bet-box'

    export default {
        data () {
            return {
                isShowNew: false,
                isShowStep1: true,
                isShowStep2: false,
                isShowStep3: false
            }
        },
        methods: {
            ...mapActions('cs_luckycoin', ['updateLuckyCoinPage', 'getBetsList']),
            ...mapActions(['subInLuckyCoin']),
            howToPlayHandler () {
                this.isShowNew = true
                this.isShowStep1 = true
                this.isShowStep2 = false
                this.isShowStep3 = false
            }
        },
        components: { betBox, recentBets, historyBetBox },
        computed: {
            ...mapState('cs_luckycoin', {
                betsList: state => state.betsList,
                drawHistoryList: state => state.drawHistoryList,
                recentBetsList: state => state.recentBetsList,
                otherWin: state => state.otherWin,
                selfWin: state => state.selfWin
            }),
            ...mapState({
                isLogin: state => !!state.isLog
            })
        },
        watch: {
            isLogin () {
                this.getBetsList()
            }
        },
        mounted () {
            if (!localStorage.getItem('firstLuckycoin')) {
                this.isShowNew = true
                localStorage.setItem('firstLuckycoin', true)
            }
            this.updateLuckyCoinPage()
        }
    }
</script>

<style scope lang="less" type="text/less">
    .page-luckycoin{
        .carousel__arrow{
            display: none;
        }
    }
    .for-new{
        position: relative;
        z-index: 11;
    }
    .pop-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 9;
    }
    .pop-new{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 12;
        text-align: center;
        font-size: 20px;
        color: #ffdd8e;
        .new-main{
            position: relative;
            width: 100%;
            max-width: 1190px;
            margin: 0 auto;
        }
        .btn-next{
            display: table;
            padding: 0 16px;
            min-width: 67px;
            margin: 6px auto 0;
            line-height: 28px;
            color: #fff;
            background: #20bf6b;
            border-radius: 6px;
            &:hover{
                filter:brightness(1.1);
            }
        }
        .step{
            position: relative;
            z-index: 12;
            animation: bounceIn 1s;
        }
        .step1{
            display: block;
            position: absolute;
            left: -170px;
            top: -75px;
            img{
                display: block;
                position: absolute;
                top: 86px;
                left: 50%;
            }
        }
        .step2{
            position: absolute;
            top: 60px;
            left: -86%;
            img{
                display: block;
                position: absolute;
                top: 52px;
                right: -32px;
                transform:scaleY(-1) rotateZ(-90deg);
            }
        }
        .step3{
            position: absolute;
            width: 100%;
            left: 50%;
            margin-left: -200px;
            bottom: -140px;
            img{
                display: block;
                margin: 0 auto 15px;
                transform: rotateZ(120deg) scaleX(-1);
            }
        }
    }
    /* lg大屏幕（大桌面显示器，大于等于 1200px） */

    @media (max-width: 1200px) {
        .pop-mask,.pop-new{
            display: none;
        }
    }
</style>
